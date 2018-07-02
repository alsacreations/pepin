/**!
 Tabs
 Manages tabs with content
 */

(function($) {

  $.tabs = function(el, options) {

    // Default settings values
    var defaults = {
      selectorLinks: '.tabs-menu-link',
      selectorList: '.tabs-menu',
      selectorListItems: 'li',
      selectorContent: '.tabs-content-item',
      classActive: 'is-active'
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
      plugin.switchContent(null);
      setAriaAttributes();
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set initial ARIA attributes on elements
    var setAriaAttributes = function() {
      $(plugin.settings.selectorList,$element).attr('role','tablist').find(plugin.settings.selectorListItems).attr('role','presentation');
      $(plugin.settings.selectorList,$element).find(plugin.settings.selectorLinks).attr({'role':'tab','tabindex':'-1'}).each(function(index,item) {
        var target = $(this).attr('href');
        // Establish relationships between tabs (links) and tabpanels
        if(target) {
          $(this).attr('id','tablink'+index).attr('aria-controls',target.replace('#',''));
          $(target).attr('aria-labelledby','tablink'+index).attr('tabindex','0').attr('role','tabpanel');
        }
        // If the link is marked active with the class, then tabindex 0
        if($(this).hasClass(plugin.settings.classActive)) {
          $(this).attr('tabindex','0');
          if(target) plugin.switchContent(target);
        }
      });
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      // Navigate with clicks
      $element.off('click.tabs', plugin.settings.selectorLinks).on('click.tabs', plugin.settings.selectorLinks, function(e) {
        plugin.switchClasses($(this));
        plugin.switchContent($(this).attr('href'));
        e.preventDefault();
      // Navigate with arrow keys
      }).off('keydown.tabs').on('keydown.tabs', function(e) {
        if(e.metaKey || e.altKey) return; // Do not react with modifier keys
        switch (e.keyCode) {
          case 37:
          case 38:
            plugin.prevTab();
            e.preventDefault();
            break;
          case 39:
          case 40:
            plugin.nextTab();
            e.preventDefault();
            break;
          default:
            break;
        }
      });
    };

    // Switch active classes for tabs (public method)
    plugin.switchClasses = function($el) {
      // Other elements
      $(plugin.settings.selectorLinks,$element).removeClass(plugin.settings.classActive).removeAttr('aria-selected').attr('tabindex','-1');
      // Current element
      $el.addClass(plugin.settings.classActive).attr({'aria-selected':'true','tabindex':'0'}).focus();
    };

    // Switch active classes for content panels (public method)
    plugin.switchContent = function(targetId) {
      var $target;
      // Other elements
      $(plugin.settings.selectorContent,$element).attr({'aria-hidden':'true'});
      // Target element
      if(targetId) {
        $target = $(targetId,$element);
      } else {
        $target = $(plugin.settings.selectorContent,$element).first();
      }
      $target.attr('tabindex','0').removeAttr('aria-hidden');
    };

    // Switch to next tab
    plugin.nextTab = function() {
      plugin.goTab(1);
    };

    // Switch to next tab
    plugin.prevTab = function() {
      plugin.goTab(-1);
    };

    // Switch to prev/next tab
    plugin.goTab = function(direction) {
      var $current = $(plugin.settings.selectorLinks,$element).filter('.'+plugin.settings.classActive);
      var $links = $(plugin.settings.selectorLinks,$element);
      var eq = $links.index($current)+direction;
      if(eq<0) return; // Prevent backward focus on last element
      var $next = $links.eq(eq);
      $next.trigger('click.tabs');
    };

    // Initialization
    plugin.init();

  };

  $.fn.tabs = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('tabs')) {
        var plugin = new $.tabs(this, options);
        $(this).data('tabs', plugin);
      }
    });

  };

  $(document).ready(function() {
    // Launch plugin on target element
    $('.js-tabs').tabs();
  });

})(jQuery);
