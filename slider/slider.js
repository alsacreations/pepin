/**!
 Sliders
 Manages sliders (carrousel)
 @depends hammerjs
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

  $.slider = function(el, options) {

    // Default settings values
    var defaults = {
      selectorLinks: '.slider-pagination-list-item',
      selectorWrapper: '.slider-wrapper',
      selectorItem: '.slider-item',
      selectorItemTitle: '.slider-item-title',
      selectorControlBtn: '.slider-control-btn',
      classControlBtnPlay: 'slider-control-btn-play',
      classControlBtnPause: 'slider-control-btn-pause',
      selectorControlPrev: '.slider-item-control-prev',
      selectorControlNext: '.slider-item-control-next',
      classActive: 'slider-item-active',
      classActiveLink: 'slider-pagination-list-link-active',
      autoTimer: 1500,
      autoPlay: false,
      loop: true,
      touchEnabled: true,
      touching: false,
      animating: false,
      touchDelta: 50,
      activeIndex: 0 // index of default panel displayed
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
      plugin.setActiveLink(plugin.settings.activeIndex, false);

      // ARIA roles and properties
      $element.attr('role', 'tablist');
      var $items = $(plugin.settings.selectorWrapper, $element).find(plugin.settings.selectorItem);
      var $links = $(plugin.settings.selectorLinks + ' a', $element);
      $items.attr({
        'role': 'tabpanel',
        'aria-hidden': 'true'
      }).children('a').attr({
        'tabindex': '-1'
      });
      var $activeItem = $items.eq(plugin.settings.activeIndex);
      $activeItem.attr({
        'aria-hidden': 'false'
      }).children('a').attr({
        'tabindex': '0'
      });
      $items.not($activeItem).addClass('slider-outside-right');

      // HammerJS
      if(typeof $.fn.hammer == 'function' && plugin.settings.touchEnabled) {

        // Initialize touch events
        $element.hammer().off('panright.slider').on('panright.slider', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX > plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.scrollPrev();
          }
        });
        $element.hammer().off('panleft.slider').on('panleft.slider', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX < -plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.scrollNext();
          }
        });
        $element.hammer().off('panend.slider').on('panend.slider', function(e) {
          plugin.settings.touching = false;
        });

        if(plugin.settings.autoPlay) plugin.autoplayStart();

      }

      // Set aria-controls attributes
      $links.each(function(i) {
        var id = $items.eq(i).attr('id');
        if (id === undefined) { // Generate random id if needed
          id = 'slider-r' + Math.floor(Math.random() * 1000000000);
          $items.eq(i).attr('id', id);
        }
        $(this).attr('aria-controls', id);
      });

      // Set aria-labelledby
      $items.each(function(i) {
        var $title = $(this).find(plugin.settings.selectorItemTitle);
        var id = $title.attr('id');
        if (id === undefined) { // Generate random id if needed
          id = 'slider-t' + Math.floor(Math.random() * 1000000000);
          $title.attr('id', id);
        }
        $(this).attr('aria-labelledby', id);
      });
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      // Click on nav
      $(plugin.settings.selectorControlPrev, $element).off('click.slider').on('click.slider', function(e) {
        plugin.autoplayStop();
        plugin.scrollPrev();
        e.preventDefault();
      });
      $(plugin.settings.selectorControlNext, $element).off('click.slider').on('click.slider', function(e) {
        plugin.autoplayStop();
        plugin.scrollNext();
        e.preventDefault();
      });
      // Click on item (pagination) links
      $(plugin.settings.selectorLinks, $element).off('click.slider').on('click.slider', function(e) {
        var index = $(this).index();
        plugin.scrollToSlide(index);
        plugin.setActiveLink(index, true);
        plugin.autoplayStop();
        e.preventDefault();
      }).off('keydown.slider').on('keydown.slider', function(e) {
        if (e.metaKey || e.altKey) return; // Do not react with modifier keys
        switch (e.keyCode) {
          case 37:
          case 38:
            plugin.scrollPrev(true);
            plugin.autoplayStop();
            e.preventDefault();
            break;
          case 39:
          case 40:
            plugin.scrollNext(true);
            plugin.autoplayStop();
            e.preventDefault();
            break;
          default:
            break;
        }
      });
      // Click on autoplay button (Lecture)
      $(plugin.settings.selectorControlBtn, $element).off('click.slider').on('click.slider', function() {
        // If already auto playing, stop the interval, else start !
        if (plugin.settings.autoPlay) {
          plugin.autoplayStop();
        } else {
          plugin.autoplayStart();
        }
      });
    };

    // Scroll to target content (public method)
    plugin.scrollToSlide = function(slideIndex) {
      if (plugin.settings.animating) return false;
      if (slideIndex > -1) {
        var $wrapper = $(plugin.settings.selectorWrapper, $element);
        var $items = $wrapper.find(plugin.settings.selectorItem);
        var $targetItem = $items.eq(slideIndex);
        if ($targetItem.length > 0) {
          $items.removeClass(plugin.settings.classActive).attr({
            'aria-hidden': 'true'
          }).children('a').attr({
            'tabindex': '-1'
          });
          $targetItem.addClass(plugin.settings.classActive).attr({
            'aria-hidden': 'false'
          }).children('a').attr({
            'tabindex': '0'
          });
          $targetItem.nextAll().removeClass('slider-inside slider-outside-left').addClass('slider-outside-right');
          $targetItem.prevAll().removeClass('slider-inside slider-outside-right').addClass('slider-outside-left');
          $targetItem.removeClass('slider-outside-right slider-outside-left').addClass('slider-inside');
        }
        plugin.settings.activeIndex = slideIndex;
        plugin.afterScroll();
      }
    };

    // Set active link (public method)
    plugin.setActiveLink = function(slideIndex, setFocus) {
      if (slideIndex > -1) {
        var $links = $(plugin.settings.selectorLinks + ' a', $element);
        var $link = $links.eq(slideIndex);
        $links.removeClass(plugin.settings.classActiveLink).attr({
          'aria-selected': 'false',
          'tabindex': '-1'
        });
        $link.addClass(plugin.settings.classActiveLink).attr({
          'aria-selected': 'true',
          'tabindex': '0'
        });
        if (setFocus) $link.focus();
      }
    };

    // Start auto play
    plugin.autoplayStart = function() {
      plugin.settings.interval = setInterval(function() {
        plugin.scrollNext(false);
      }, plugin.settings.autoTimer);
      plugin.settings.autoPlay = true;
      var $btn = $(plugin.settings.selectorControlBtn, $element);
      $btn.text($btn.data('txton')).removeClass(plugin.settings.classControlBtnPlay).addClass(plugin.settings.classControlBtnPause);
    };

    // Stop auto play
    plugin.autoplayStop = function() {
      clearInterval(plugin.settings.interval);
      plugin.settings.autoPlay = false;
      var $btn = $(plugin.settings.selectorControlBtn, $element);
      $btn.text($btn.data('txtoff')).removeClass(plugin.settings.classControlBtnPause).addClass(plugin.settings.classControlBtnPlay);
    };

    // Scroll to next item
    plugin.scrollNext = function(setFocus) {
      if (plugin.settings.animating) return false;
      // Go to start if needed with loop
      var $items = $(plugin.settings.selectorItem, $element);
      if (plugin.settings.activeIndex > $items.length-1 && !plugin.settings.loop) return;
      var goIndex = plugin.settings.activeIndex + 1;
      if (goIndex > $items.length-1) goIndex = 0;
      plugin.scrollToSlide(goIndex);
      plugin.setActiveLink(goIndex, setFocus);
    };

    // Scroll to previous item
    plugin.scrollPrev = function(setFocus) {
      if (plugin.settings.animating) return false;
      var goIndex = plugin.settings.activeIndex - 1;
      // Loop to end if needed
      if (goIndex < 0 && plugin.settings.loop) {
        var $items = $(plugin.settings.selectorItem, $element);
        goIndex = $items.length -1;
      }
      plugin.scrollToSlide(goIndex);
      plugin.setActiveLink(goIndex, setFocus);
    };

    // After scroll event (public method)
    plugin.afterScroll = function() {
      // Nothing to do by default
    };

    // Initialization
    plugin.init();

  };

  $.fn.slider = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('slider')) {
        var plugin = new $.slider(this, options);
        $(this).data('slider', plugin);
      }
    });

  };

  $(document).ready(function() {
    // Launch plugin on target element
    $('.js-slider').slider();
  });

})(jQuery);
