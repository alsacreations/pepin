/**!
 Slideshows
 Manages slideshows (diaporamas)
 */

// jQuery plugin for Hammer.js
// https://github.com/hammerjs/jquery.hammer.js
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
}(function($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data("hammer")) {
      $el.data("hammer", new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
}));

(function($) {

  $.slideshow = function(el, options) {

    // Default settings values
    var defaults = {
      selectorWrapper: '.slideshow-wrapper',
      selectorItem: '.slideshow-item',
      selectorItemLink: '.slideshow-item-link',
      selectorControlPrev:'.slideshow-item-control-left',
      selectorControlNext:'.slideshow-item-control-right',
      selectorThumbnailsPrev:'.slideshow-thumbnails-control-left',
      selectorThumbnailsNext:'.slideshow-thumbnails-control-right',
      selectorThumbnailsLinks: '.slideshow-thumbnails-list-link',
      selectorPaginationLinks: '.slideshow-pagination-list-link',
      selectorThumbnailsList: '.slideshow-thumbnails-list',
      selectorThumbnailsItem: '.slideshow-thumbnails-list-item',
      selectorThumbnailsWrapper: '.slideshow-thumbnails-wrapper',
      // classActive: 'slideshow-item-active',
      classActiveLink: 'is-active',
      classActivePaginationLink: 'slideshow-pagination-list-link-active',
      touchEnabled: true,
      touching: false,
      touchDelta: 50,
      animating: false,
      loop: true,
      activeIndex: 0, // index of default panel displayed
      activeThumbnailsIndex: 0
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      registerEvents();

      // Update default styles and attributes
      var $items = $(plugin.settings.selectorItem, $element);
      var $links = $(plugin.settings.selectorThumbnailsLinks, $element);

      plugin.setActiveLink(plugin.settings.activeIndex);
      $(plugin.settings.selectorThumbnailsPrev).attr({'aria-hidden':'true','tabindex':'-1'});

      plugin.settings.wrapperMinHeight = 0;
      $items.each(function() {
        if($(this).outerHeight()>plugin.settings.wrapperMinHeight) {
          plugin.settings.wrapperMinHeight = $(this).outerHeight();
        }
      });
      $(plugin.settings.selectorWrapper, $element).css('min-height',plugin.settings.wrapperMinHeight+'px');
      $items.find('img').each(function() {
        $(this).on('load', function() {
          var oH = $(this).closest(plugin.settings.selectorItem).outerHeight();
          if(oH>plugin.settings.wrapperMinHeight) {
            plugin.settings.wrapperMinHeight = oH;
            $(plugin.settings.selectorWrapper, $element).css('min-height',plugin.settings.wrapperMinHeight+'px');
          }
        });
      });

      // ARIA roles and properties
      $element.attr('role', 'tablist');
      $items.attr({
        'role': 'tabpanel',
        'aria-hidden': 'true'
      }).find('a').attr('tabindex','-1');
      var $activeItem = $items.eq(plugin.settings.activeIndex);
      $activeItem.attr({
        'aria-hidden': 'false'
      });

      // Set aria-controls attributes
      $links.each(function(i) {
        var id = $items.eq(i).attr('id');
        if (id === undefined) { // Generate random id if needed
          id = 'slideshow-r' + Math.floor(Math.random() * 1000000000);
          $items.eq(i).attr('id', id);
        }
        $(this).attr('aria-controls', id);
      });

    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {

      // Click on control next
      $(plugin.settings.selectorControlNext, $element).off('click.slideshow').on('click.slideshow', function(e) {
        e.preventDefault();
        plugin.scrollNext();
      });

      // Click on control prev
      $(plugin.settings.selectorControlPrev, $element).off('click.slideshow').on('click.slideshow', function(e) {
        e.preventDefault();
        plugin.scrollPrev();
      });

      // Click on item (thumbnails) links
      $(plugin.settings.selectorThumbnailsLinks, $element).off('click.slideshow').on('click.slideshow', function(e) {
        var index = $(this).parent().index();
        plugin.scrollToSlide(index);
        plugin.setActiveLink(index);
        e.preventDefault();
      });

      // Click on item (pagination) links
      $(plugin.settings.selectorPaginationLinks, $element).off('click.slideshow').on('click.slideshow', function(e) {
        var index = $(this).parent().index();
        plugin.scrollToSlide(index);
        plugin.setActiveLink(index);
        e.preventDefault();
      });

      // Click on thumbnails controls
      $(plugin.settings.selectorThumbnailsPrev, $element).off('click.slideshow').on('click.slideshow', function(e) {
        e.preventDefault();
        plugin.scrollThumbnails(plugin.settings.activeThumbnailsIndex-1);
      });
      $(plugin.settings.selectorThumbnailsNext, $element).off('click.slideshow').on('click.slideshow', function(e) {
        e.preventDefault();
        plugin.scrollThumbnails(plugin.settings.activeThumbnailsIndex+1);
      });

      // Links #
      $(plugin.settings.selectorItemLink).off('click.slideshow').on('click.slideshow', function(e) {
        if($(this).attr('href')==='#') e.preventDefault();
      });

      // Use arrows
      $(plugin.settings.selectorThumbnailsLinks+','+plugin.settings.selectorPaginationLinks+','+plugin.settings.selectorControlPrev+','+plugin.settings.selectorControlNext, $element).off('keydown.slideshow').on('keydown.slideshow', function(e) {
        if (e.metaKey || e.altKey) return; // Do not react with modifier keys
        switch (e.keyCode) {
          case 37:
          case 38:
            plugin.scrollPrev();
            e.preventDefault();
            break;
          case 39:
          case 40:
            plugin.scrollNext();
            e.preventDefault();
            break;
          default:
            break;
        }
      });

      // HammerJS
      if(typeof $.fn.hammer == 'function' && plugin.settings.touchEnabled) {

        // Initialize touch events
        $element.hammer().off('panright.slideshow').on('panright.slideshow', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX > plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.scrollPrev();
          }
        });
        $element.hammer().off('panleft.slideshow').on('panleft.slideshow', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX < -plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.scrollNext();
          }
        });
        $element.hammer().off('panend.slideshow').on('panend.slideshow', function(e) {
          plugin.settings.touching = false;
        });

      }

    };

    // Scroll to target content (public method)
    plugin.scrollToSlide = function(slideIndex) {
      if (plugin.settings.animating) return false;
      if (slideIndex > -1) {
        plugin.settings.activeIndex = slideIndex;
        var $wrapper = $(plugin.settings.selectorWrapper, $element);
        var $items = $wrapper.find(plugin.settings.selectorItem);
        var $targetItem = $items.eq(slideIndex);
        if ($targetItem.length > 0) {
          $items.removeClass(plugin.settings.classActive).attr({
            'aria-hidden': 'true'
          }).find('a').attr('tabindex','-1');
          $targetItem.addClass(plugin.settings.classActive).attr({
            'aria-hidden': 'false'
          }).find('a').removeAttr('tabindex');
          // Transition effect with translateX
          // var scrollValue = 100*slideIndex;
          // if(scrollValue>-1) $wrapper.css('transform','translateX(-'+scrollValue+'%)');
        }
        plugin.afterScroll();
      }
    };

    // Set active link and thumbnail (public method)
    plugin.setActiveLink = function(slideIndex) {
      if (slideIndex > -1) {
        var $thumbnailsLinks = $(plugin.settings.selectorThumbnailsLinks, $element);
        var $paginationLinks = $(plugin.settings.selectorPaginationLinks, $element);
        var $thumbnailsLink = $thumbnailsLinks.eq(slideIndex);
        var $paginationLink = $paginationLinks.eq(slideIndex);
        $thumbnailsLinks.removeClass(plugin.settings.classActiveLink);
        $paginationLinks.removeClass(plugin.settings.classActivePaginationLink);
        $thumbnailsLinks.add($paginationLinks).attr({
          'aria-selected': 'false',
          'tabindex': '-1'
        });
        $thumbnailsLink.addClass(plugin.settings.classActiveLink);
        $paginationLink.addClass(plugin.settings.classActivePaginationLink);
        $thumbnailsLink.add($paginationLink).attr({
          'aria-selected': 'true',
          'tabindex': '0'
        });
      }
      // Scroll the thumbnails if needed
      plugin.scrollThumbnails(slideIndex);
    };

    // Scroll the thumbnails
    plugin.scrollThumbnails = function(itemIndex) {

      var $items = $(plugin.settings.selectorThumbnailsItem);

      // Min and max index
      if(itemIndex<0) itemIndex = 0;
      if(itemIndex>$items.length-1) itemIndex = $items.length;

      // Elements used
      var $target = $items.eq(itemIndex);
      var $container = $(plugin.settings.selectorThumbnailsList,$element);

      // Get the sum of items width to block scroll if there is too much white space
      var totalItemsWidth = 0;
      $items.each(function() {
        totalItemsWidth+=$(this).outerWidth();
      });

      // If all conditions met, do scroll
      if($target.length>0 && $container.length>0) {
        var scrollValue = $target.position().left;
        var maxScroll = totalItemsWidth-$(plugin.settings.selectorThumbnailsWrapper,$element).outerWidth();

        // Hide/show controls
        if(scrollValue >= maxScroll) {
          scrollValue = maxScroll;
          $(plugin.settings.selectorThumbnailsNext).attr({'aria-hidden':'true','tabindex':'-1'});
        } else {
          $(plugin.settings.selectorThumbnailsNext).attr({'aria-hidden':'false','tabindex':'0'});
        }
        if(scrollValue>0) {
          $(plugin.settings.selectorThumbnailsPrev).attr({'aria-hidden':'false','tabindex':'0'});
        } else {
          $(plugin.settings.selectorThumbnailsPrev).attr({'aria-hidden':'true','tabindex':'-1'});
        }

        $container.css('transform','translateX(-'+scrollValue+'px)');
        plugin.settings.activeThumbnailsIndex = itemIndex;
      }
    };

    // Scroll to next content
    plugin.scrollNext = function() {
      if (plugin.settings.animating) return false;
      var goIndex = plugin.settings.activeIndex + 1;
      // Go to start if needed (with loop)
      var $items = $(plugin.settings.selectorItem, $element);
      if (goIndex >= $items.length && plugin.settings.loop) {
        goIndex = 0;
      }
      plugin.scrollToSlide(goIndex);
      plugin.setActiveLink(goIndex);
    };

    // Scroll to previous content
    plugin.scrollPrev = function() {
      if (plugin.settings.animating) return false;
      var goIndex = plugin.settings.activeIndex - 1;
      if(goIndex < 0 && plugin.settings.loop) {
        // If loop is enabled, go to last item
        var $items = $(plugin.settings.selectorItem, $element);
        goIndex = $items.length-1;
      } else if (goIndex < 0) {
        // Go to start if needed
        goIndex = 0;
      }
      plugin.scrollToSlide(goIndex);
      plugin.setActiveLink(goIndex);
    };

    // After scroll event (public method)
    plugin.afterScroll = function() {
      // Nothing to do by default
    };

    // Initialization
    plugin.init();

  };

  $.fn.slideshow = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('slideshow')) {
        var plugin = new $.slideshow(this, options);
        $(this).data('slideshow', plugin);
      }
    });

  };

  $(document).ready(function() {
    // Launch plugin on target element
    $('.js-slideshow').slideshow();
  });

})(jQuery);
