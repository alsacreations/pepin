/**!
 Anchors
 Manages anchor links
 */

(function($) {

  $.anchor = function(el, options) {

    // Default settings values
    var defaults = {
      selectorLinks: '.anchor-link',
      classActive: 'is-active',
      scrollSpeed: 300
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
      $(plugin.settings.selectorLinks,$element).on('click.anchor', function() {
        plugin.switchClasses($(this));
        plugin.scrollToContent($(this).attr('href'));
      });
    };

    // Switch active classes (public method)
    plugin.switchClasses = function($el) {
      $(plugin.settings.selectorLinks,$element).removeClass(plugin.settings.classActive);
      $el.addClass(plugin.settings.classActive);
    };

    // Scroll to target content (public method)
    plugin.scrollToContent = function(targetId) {
      if(targetId) {
        var $target = $(targetId);
        if($target.length>0) {
          var top = $target.offset().top;
          $('body, html').animate({scrollTop:top},plugin.settings.scrollSpeed,plugin.afterScroll);
        }
      }
    };

    // After scroll event (public method)
    plugin.afterScroll = function() {
      // Nothing to do by default
    };

    // Initialization
    plugin.init();

  };

  $.fn.anchor = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('anchor')) {
        var plugin = new $.anchor(this, options);
        $(this).data('anchor', plugin);
      }
    });

  };

  $(document).ready(function() {
    // Launch plugin on target element
    $('.js-anchor').anchor();
  });

})(jQuery);
