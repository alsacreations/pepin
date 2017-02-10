/**!
 SmoothScroll
 Défilement doux vers une cible
 */

(function($) {

   $.smoothscroll = function(el, options) {

      var defaults = {
         target:null,
         speed:500
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
        $element.off('click.smoothscroll').on('click.smoothscroll', function(e) {
          e.preventDefault();
          var $target;
          if(plugin.settings.target) $target = $(plugin.settings.target);
          else if($(this).attr('href')) $target = $($(this).attr('href'));
          plugin.scrollTo($target);
        });
      };

      // Plugin do something
      plugin.scrollTo = function($target) {
         if($target.length<1) return;
         $('body,html').animate({scrollTop:$target.offset().top},plugin.settings.speed);
      };

      plugin.init();

   };

   $.fn.smoothscroll = function(options) {

       return this.each(function() {
           if (undefined === $(this).data('smoothscroll')) {
               var plugin = new $.smoothscroll(this, options);
               $(this).data('smoothscroll', plugin);
           }
       });

   };

   $('.js-smoothscroll').smoothscroll();

 })(jQuery);
