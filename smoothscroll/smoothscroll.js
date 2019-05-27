/**!
 SmoothScroll
 Défilement doux vers une cible
 */

(function ($) {

  $.smoothscroll = function (el, options) {

    var defaults = {
      target: null,
      speed: 500,
      classActive: 'is-active',
      scrollVisibilityThreshold: false, // px
      visible: false,
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function () {
      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      registerEvents();
      if (window.matchMedia('(prefers-reduced-motion)').matches) plugin.settings.speed = 0; // a11y
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function () {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function () {
      $element.off('click.smoothscroll').on('click.smoothscroll', plugin.doScroll);
      if (plugin.settings.scrollVisibilityThreshold > 0) $(window).on('scroll', plugin.switchVisibility);
      // With jQuery debounce (better)
      // https://raw.githubusercontent.com/cowboy/jquery-throttle-debounce/master/jquery.ba-throttle-debounce.min.js
      /*if(plugin.settings.scrollVisibilityThreshold>0) $(window).on('scroll', jQuery.debounce(100, function () {
        plugin.switchVisibility();
      }));*/
    };

    // Plugin test if scroll
    plugin.doScroll = function (e) {
      e.preventDefault();
      var $target;
      if (plugin.settings.target) $target = $(plugin.settings.target);
      else if ($(this).attr('href')) $target = $($(this).attr('href'));
      plugin.scrollTo($target);
      $('.js-smoothscroll').removeClass(plugin.settings.classActive);
      $(this).add($target).addClass(plugin.settings.classActive);
    };

    // Plugin do scroll
    plugin.scrollTo = function ($target) {
      if (!$target || $target.length < 1) return;
      $target.attr('tabindex', '-1'); // a11y
      $('body,html').animate({
        scrollTop: $target.offset().top
      }, plugin.settings.speed, plugin.afterScroll);
      $target.focus().removeAttr('tabindex'); // a11y
    };

    // Element visibility (button/link)
    plugin.switchVisibility = function () {
      var st = $(window).scrollTop();
      if (st > plugin.settings.scrollVisibilityThreshold && !plugin.settings.visible) {
        plugin.settings.visible = true;
        $element.removeClass('js-hidden');
      } else if (plugin.settings.visible) {
        plugin.settings.visible = false;
        $element.addClass('js-hidden');
      }
    }

    // After scroll event (public method)
    plugin.afterScroll = function () {
      // Nothing to do by default
    };

    plugin.init();

  };

  $.fn.smoothscroll = function (options) {

    return this.each(function () {
      if (undefined === $(this).data('smoothscroll')) {
        var plugin = new $.smoothscroll(this, options);
        $(this).data('smoothscroll', plugin);
      }
    });

  };

  $(document).ready(function () {
    $('.js-smoothscroll').smoothscroll();
  });

})(jQuery);
