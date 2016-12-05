/**!
 Plugin
 Plugin description

 @contributors:
 @date-created: 2016-02-05
 */

(function($) {

  $.pluginName = function(el, options) {

    // Default settings values
    var defaults = {
      parameter: '' // Parameter description
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
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      /* $('.sub-elements',$element).on('click', function(e) {
        e.preventDefault();
        plugin.doSomething();
      }); */
    };

    // Plugin do something (public method)
    plugin.doSomething = function() {
      /*
      Do something with $element ?
      and with plugin.settings.parameter ?
      */
    };

    // Destroy the plugin (public method)
    plugin.destroy = function() {
      /*
      Remove event handlers
      Reset styles or classes ?
      */
    };

    // Initialization
    plugin.init();

  };

  $.fn.pluginName = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('pluginName')) {
        var plugin = new $.pluginName(this, options);
        $(this).data('pluginName', plugin);
      }
    });

  };

  $('.js-plugin-elements').pluginName();

})(jQuery);
