/**!
 Typosize
 Agrandissement de la taille des polices selon classe CSS
 */

(function($) {

  $.typosize = function(el, options) {

    var defaults = {
      classActive: 'typosize-big',
      target: 'body'
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
      $element.off('click.typosize').on('click.typosize', function(e) {
        e.preventDefault();
        plugin.toggleTypoSize();
      });
    };

    // Plugin do something
    plugin.toggleTypoSize = function() {
      var $target = $(plugin.settings.target);
      if($target.hasClass(plugin.settings.classActive)) {
        $target.removeClass(plugin.settings.classActive);
        // Reset initial state
        $element.attr('aria-label',$element.data('initial-label'));
        $element.text($element.data('initial-content'));
      } else {
        // Save initial state
        $element.data('initial-label',$element.attr('aria-label'));
        $element.data('initial-content',$element.text());
        // Apply new state
        $target.addClass(plugin.settings.classActive);
        $element.attr('aria-label',$element.data('alt-label'));
        $element.text($element.data('alt-content'));
      }
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

  $(document).ready(function() {
    $('.js-typosize').typosize();
  });

})(jQuery);
