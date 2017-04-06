/**!
 Menu Off Canvas (for mobile < 979px)

 To open the main navigation (off canvas) from the left side and switch the main website content to the right side (off canvas).
 */

(function($) {

  $.offCanvas = function(el, options) {

    // Default settings values
    var defaults = {

      // Burger button to open/close the navigation
      selectorBurgerButton: '.js-burgermenu',

      // Apply to the burger button, when it's actove
      classButtonActive: 'is-active',

      // Apply to the menu, when it's opened
      classMenuActive: 'is-opened',

      // The off canvas menu you want to open. Ex: data-target=".navigation"
      target: '.navigation',

      // Apply to the website content, when the menu is opened
      classOffCanvasActive: 'is-active',

      // The part of the website content you want to switch to the right side (off canvas). Ex: data-selector-off-canvas=".js-content-off-canvas"
      selectorOffCanvas: '.js-content-off-canvas',

      // px, should match ($medium - 1px), for example, in KNACSS/sass/_config/_breakpoints.scss (scss)
      mobileMaxWidth: 990
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
      $element.off('click.burgermenu').on('click.burgermenu', plugin.toggleMenu);
      $(window).off('resize.burgermenu').on('resize.burgermenu', plugin.resetMenu);
    };

    // Plugin toggle Menu on/off (public method)
    plugin.toggleMenu = function() {
      if (window.matchMedia("(max-width: "+plugin.settings.mobileMaxWidth+"px)").matches) {
        $(plugin.settings.selectorBurgerButton).toggleClass(plugin.settings.classButtonActive);
        $(plugin.settings.target).toggleClass(plugin.settings.classMenuActive);
        $(plugin.settings.selectorOffCanvas).toggleClass(plugin.settings.classOffCanvasActive);
      }
    };

    // Disable off canvas when in desktop
    plugin.resetMenu = function() {
      if (!window.matchMedia("(max-width: "+plugin.settings.mobileMaxWidth+"px)").matches) {
        $(plugin.settings.selectorBurgerButton).removeClass(plugin.settings.classButtonActive);
        $(plugin.settings.target).removeClass(plugin.settings.classMenuActive);
        $(plugin.settings.selectorOffCanvas).removeClass(plugin.settings.classOffCanvasActive);
      }
    };

    // Initialization
    plugin.init();

  };

  $.fn.offCanvas = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('offCanvas')) {
        var plugin = new $.offCanvas(this, options);
        $(this).data('offCanvas', plugin);
      }
    });

  };

  $(document).ready(function() {

    // Launch plugin on target element
    $('.js-offcanvas').offCanvas();

    // Visual hack to avoid CSS3 animation on window resize
    /*
    var resizeTimer;
    $(window).on('resize.offcanvas', function(e) {
      if (window.matchMedia("(max-width: "+plugin.settings.mobileMaxWidth+"px").matches) {

        // Hide .js-accessible-navigation on mobile and during window resize
        $('.js-accessible-navigation').hide();

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

          // Show .js-accessible-navigation when resize is done
          $('.js-accessible-navigation').show();

        }, 50);
      }
    });
    */

  });


})(jQuery);
