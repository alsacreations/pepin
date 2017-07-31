/**!
 Plugin toggle trigger
 Triggers hide/show on target elements (or do whatever with classes) from a source element
 */

(function($) {

  $.toggleTrigger = function(el, options) {

    // Default settings values
    var defaults = {
      active:false,
      target:undefined,
      targetInvert:undefined,
      classToggle:'js-hidden',
      classActive:'is-active',
      selectorContainer:undefined, // could be '.js-toggle-container'
      selectorTarget:'.js-toggle-target',
      selectorTargetInvert:undefined,
      selectorToggleInvert:undefined,
      useChecked:false // if true, $element needs to be checked (input radio/checkbox) to activate the target
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
      if(plugin.settings.useChecked) plugin.settings.active = $element.is(':checked');
      else plugin.settings.active = $element.hasClass(plugin.settings.classActive);
      if(!plugin.settings.target) {
        if(plugin.settings.selectorContainer) {
          // When using a container
          var $c = $element.closest(plugin.settings.selectorContainer);
          plugin.settings.target = $c.find(plugin.settings.selectorTarget);
          if(plugin.settings.selectorTargetInvert) plugin.settings.targetInvert = $c.find(plugin.settings.selectorTargetInvert);
        } else {
          // Not within a container, search the whole DOM
          plugin.settings.target = $(plugin.settings.selectorTarget);
          if(plugin.settings.selectorTargetInvert) plugin.settings.targetInvert = $(plugin.settings.selectorTargetInvert);
          if(plugin.settings.selectorToggleInvert) plugin.settings.toggleInvert = $(plugin.settings.selectorToggleInvert);
        }
      }
      if(plugin.settings.target && !plugin.settings.active) {
        plugin.settings.target.addClass(plugin.settings.classToggle);
      }
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      $element.on('click.toggletrigger', plugin.toggleTarget);
      $element.on('toggle-trigger-off', plugin.toggleOff);
    };

    // Toggle the state on the target element (public method)
    plugin.toggleTarget = function() {
      if(plugin.settings.useChecked) plugin.settings.active = $element.is(':checked');
      else plugin.settings.active = plugin.settings.target.hasClass(plugin.settings.classToggle);
      // Toggle the active class on the element itself
      $element.toggleClass(plugin.settings.classActive,plugin.settings.active);
      // Toggle the defined class on the target
      if(plugin.settings.target) {
        plugin.settings.target.toggleClass(plugin.settings.classToggle,!plugin.settings.active);
      }
      if(plugin.settings.targetInvert) {
        plugin.settings.targetInvert.toggleClass(plugin.settings.classToggle,plugin.settings.active);
      }
      if(plugin.settings.toggleInvert && plugin.settings.active) {
        plugin.settings.toggleInvert.not($element).trigger('toggle-trigger-off');
      }
      // If needed : toggle internal icon state
      // $('.icon-plus, .icon-minus',$element).toggleClass('icon-plus icon-minus');
      var textLabel = $('span.visually-hidden',$element);
      if(plugin.settings.active) textLabel.text(textLabel.data('togglemsg-on'));
      else textLabel.text(textLabel.data('togglemsg-off'));
    };

    // Toggle the state off the inverted target (public method)
    plugin.toggleOff = function() {
      plugin.settings.target.addClass(plugin.settings.classToggle);
    };

    // Initialization
    plugin.init();

  };

  $.fn.toggleTrigger = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('toggleTrigger')) {
        var plugin = new $.toggleTrigger(this, options);
        $(this).data('toggleTrigger', plugin);
      }
    });

  };

  $('.js-toggle-trigger').toggleTrigger();

})(jQuery);
