/**!
 Typosize
 Agrandissement de la taille des polices selon classe CSS
 */

(function($) {

   $.typosize = function(el, options) {

      var defaults = {
         classEnabled:'typosize-big',
         target:'body'
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
         for(var dat in data) plugin.settings[dat] = data[dat];
      };

      // Event Handlers on HTML components inside the plugin
      var registerEvents = function() {
        $element.on('click.typosize').on('click.typosize', function(e) {
          e.preventDefault();
          plugin.toggleTypoSize();
        });
      };

      // Plugin do something
      plugin.toggleTypoSize = function() {
         $(plugin.settings.target).toggleClass(plugin.settings.classEnabled);
      };

      plugin.init();

   };

   $.fn.typosize = function(options) {

       return this.each(function() {
           if (undefined === $(this).data('typosize')) {
               var plugin = new $.typosize(this, options);
               $(this).data('typosize', plugin);
           }
       });

   };

   $('.js-typosize').typosize();

 })(jQuery);
