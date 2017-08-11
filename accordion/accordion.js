/**!
 Accordions
 Manages accordions with content
 */

(function($) {

  $.accordion = function(el, options) {

    // Default settings values
    var defaults = {
      selectorHeader: '.js-accordion-header',
      selectorPanel: '.js-accordion-panel',
      selectorIcon: '.icon-arrow',
      classIconActive: 'to-bottom',
      classHidden: 'visually-hidden',
      autoScroll: true,
      scrollSpeed: 300,
      mobileMaxWidth: 768 // px
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
      setAriaAttributes();
      plugin.switchPanels();
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      // Hide/show with clicks
      $element.off('click.accordion', plugin.settings.selectorHeader).on('click.accordion', plugin.settings.selectorHeader, function(e) {
        plugin.switchPanels($(this));
        e.preventDefault();
      }).off('keydown.accordion', plugin.settings.selectorHeader).on('keydown.accordion', plugin.settings.selectorHeader, function(e) {
        switch(e.keyCode) {
          case 13:
          case 32:
            plugin.switchPanels($(this));
            e.preventDefault();
            break;
          case 37: // prev
          case 38:
            $(this).prevAll(plugin.settings.selectorHeader).first().focus();
            break;
          case 39: // next
          case 40:
            $(this).nextAll(plugin.settings.selectorHeader).first().focus();
            break;
          default:
            break;
        }
      });
    };

    // Set initial ARIA attributes on elements
    var setAriaAttributes = function() {
      $element.attr('role','tablist'); // Main accordion container is a tablist
      $(plugin.settings.selectorHeader,$element)
        .attr({'role':'tab','tabindex':'0'}) // Children headers are focusable tabs
        .each(function() {
          // For each pair of header/panel, set controls/labelledby attributes if there are id's
          var $panel = $(this).next(plugin.settings.selectorPanel);
          var id = $panel.attr('id');
          if($panel.length>0 && id) {
            $(this).attr('aria-controls',id);
            $panel.attr('role','tabpanel').attr('aria-labelledby',$(this).attr('id'));
          }
        });
    };

    // Switch active classes and ARIA attributes for content panels (public method)
    plugin.switchPanels = function($header) {
      var $headers;
      if($header) {
        plugin.switchPanel($header,$header.attr('aria-expanded')!=='true',true);
        if($element.attr('aria-multiselectable')!=='true') {
          $headers = $(plugin.settings.selectorHeader,$element);
          plugin.switchPanel($headers.not($header),false,true);
        }
      } else {
        // Default view : all closed except first
        $headers = $(plugin.settings.selectorHeader,$element);
        plugin.switchPanel($headers,false,false);
        plugin.switchPanel($headers.first(),true,false);
      }
    };

    // Switch active classes and ARIA attributes for ONE panel
    plugin.switchPanel = function($header, state, scrollToElement) {
      // state : true = expanded, false = closed
      $panel = $header.next(plugin.settings.selectorPanel);
      if(state) {
        $header
          .attr({'aria-expanded':'true','aria-selected':'true'})
          .find(plugin.settings.selectorIcon).addClass(plugin.settings.classIconActive);
        $panel
          .attr({'aria-hidden':'false'}).removeClass(plugin.settings.classHidden);
      } else { // Hidden
        $header
          .removeAttr('aria-expanded')
          .removeAttr('aria-selected')
          .find(plugin.settings.selectorIcon).removeClass(plugin.settings.classIconActive);
        $panel
          .attr({'aria-hidden':'true'}).addClass(plugin.settings.classHidden);
      }
      if(state && plugin.settings.autoScroll && scrollToElement) {
        setTimeout(function() {
          plugin.scrollToContent($header);
        },100);
      }
    };

    // Scroll to header (mobile state)
    plugin.scrollToContent = function($target) {
      if(plugin.settings.mobileMaxWidth>0 && window.matchMedia('(max-width:'+plugin.settings.mobileMaxWidth+'px)').matches && $target.length>0) {
        var top = $target.offset().top;
        $('body, html').animate({scrollTop:top},plugin.settings.scrollSpeed);
      }
    };

    // Initialization
    plugin.init();

  };

  $.fn.accordion = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('accordion')) {
        var plugin = new $.accordion(this, options);
        $(this).data('accordion', plugin);
      }
    });

  };

  $(document).ready(function() {
    // Launch plugin on target element
    $('.js-accordion').accordion();
  });

})(jQuery);
