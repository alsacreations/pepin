/**!
 Plugin pepin copy
 Copie des valeurs/textes d'un élément à l'autre sur un événement programmé
 */

(function($) {

  $.copy = function(el, options) {

    // Default settings values
    var defaults = {
      copyEvent: 'click',
      copySourceMode: 'text',
      copyTarget: null,
      copyTargetMode: 'text'
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
      $element.off(plugin.settings.copyEvent+'.copy').on(plugin.settings.copyEvent+'.copy', plugin.copyValue);
    };

    // Met à jour la valeur
    plugin.copyValue = function(e) {
      var $target = $(plugin.settings.copyTarget);
      if($target.length>0) {
        var v = null;
        // Source
        if(plugin.settings.copySourceMode == 'text') v = $element.text();
        else if(plugin.settings.copySourceMode == 'value') v = $element.val();
        // Destination
        if(plugin.settings.copyTargetMode=='text') $target.text(v);
        else if(plugin.settings.copyTargetMode=='value') $target.val(v);
      }
    };

    // Initialization
    plugin.init();

  };

  $.fn.copy = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('copy')) {
        var plugin = new $.copy(this, options);
        $(this).data('copy', plugin);
      }
    });

  };

  $(document).ready(function() {
    $('.js-copy').copy();
  });

})(jQuery);
