/**!
 Selection
 Ajout de classes visuelles sur des éléments sélectionnés
 */

(function($) {

  $.selection = function(el, options) {

    var defaults = {
      classSelected: 'is-selected',
      toggler: ':checkbox'
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
      // prevent when checkbox already checked at load
      $(plugin.settings.toggler, $element).each(function(e){
        if( $(this).is(':checked') ) {
          $element.addClass(plugin.settings.classSelected).attr('aria-selected','true');
        }
      });
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      $element.off('click.selection', plugin.settings.toggler).on('click.selection', plugin.settings.toggler, function(e) {
        $element.toggleClass(plugin.settings.classSelected, $(this).is(':checked'));
        $element.attr('aria-selected', $(this).is(':checked').toString());
      });
    };

    plugin.init();

  };

  $.fn.selection = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('selection')) {
        var plugin = new $.selection(this, options);
        $(this).data('selection', plugin);
      }
    });

  };

  $(document).ready(function() {
    $('.js-selection').selection();
  });

})(jQuery);
