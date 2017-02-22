/**!
 Plugin filter data
 Filter elements displayed on the current page with data- attribut values
 */

(function($) {

  $.filterData = function(el, options) {

    // Default settings values
    var defaults = {
      selectorCount: '.js-filter-count',
      selectorItemsToFilter: '.js-filter-item',
      filterDataAttribute: 'filterYear',
      classHidden: 'js-hidden'
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
      plugin.doFilter(); // Force filter data if value is changed before event registration
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      $element.on('change.filterData', plugin.doFilter);
    };

    // Do the filter on items
    plugin.doFilter = function() {
      var filterVal = $element.val(); // Value to filter with
      var $items = $(plugin.settings.selectorItemsToFilter); // Items to filter with data- attr
      var count = 0; // Total counter of items not filtered out (= displayed items)
      $items.each(function() {
        // If the data attribute of the items matches the value OR there is no value
        // ...the item is displayed
        if(!filterVal || $(this).data(plugin.settings.filterDataAttribute)==filterVal) {
          $(this).removeClass(plugin.settings.classHidden).removeAttr('aria-hidden');
          count++;
        } else { // If the data does not match, the item is hidden
          $(this).addClass(plugin.settings.classHidden).attr('aria-hidden','true');
        }
      });
      // Update the counter
      $(plugin.settings.selectorCount).text(count);
    };

    // Initialization
    plugin.init();

  };

  $.fn.filterData = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('filterData')) {
        var plugin = new $.filterData(this, options);
        $(this).data('filterData', plugin);
      }
    });

  };

  $('.js-filter-data').filterData();

})(jQuery);
