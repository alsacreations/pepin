/**!
 Toggle-tablecells
 Affichage/masquage d'informations complémentaires dans les cellules des tableaux
 */

(function($) {

  $.toggleTablecells = function(el, options) {

    var defaults = {};

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

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      // Info
      $('.js-tr-toggle.js-toggle-info', $element).off('click.togglecells').on('click.togglecells', plugin.toggleInfo);
      // Plus
      $('.js-tr-toggle.js-toggle-plus', $element).off('click.togglecells').on('click.togglecells', plugin.togglePlus);
      // View All
      $('.js-view-all',$element).off('click.togglecells').on('click.togglecells', plugin.viewAll);
      // Close row
      $('.js-to-close',$element).off('click.togglecells').on('click.togglecells', plugin.closeRow);
    };

    // Plugin private functions
    plugin.closeRow = function(e) {
      var $container = $(this).closest('tr');
      $container.removeClass('is-opened').addClass('is-closed');
      $container.prev('tr').find('.js-tr-toggle').removeClass('is-active');
    };

    plugin.toggleInfo = function(e) {
      var $target = $(this).closest('tr').nextUntil('.table-eval-parent').filter('.table-info').first();
      if ($target.hasClass('is-closed')) {
        $(this).addClass('is-active');
        $target.removeClass('is-closed').addClass('is-opened');
      } else {
        $(this).removeClass('is-active');
        $target.addClass('is-closed').removeClass('is-opened');
      }
    };

    plugin.togglePlus = function(e) {
      var $target = $(this).closest('tr').nextUntil('.table-eval-parent').not('.table-info');
      if ($target.hasClass('is-closed')) {
        $(this).children('i').removeClass('icon-plus-circle').addClass('icon-minus-circle');
        $target.removeClass('is-closed').addClass('is-opened');
      } else {
        $(this).children('i').removeClass('icon-minus-circle').addClass('icon-plus-circle');
        $target.addClass('is-closed').removeClass('is-opened');
      }
    };

    plugin.viewAll = function(e) {
      if($(this).is(':checked')) {
        $('tr.table-eval-next.is-closed',$element).removeClass('is-closed').addClass('is-opened');
      } else {
        $('tr.table-eval-next.is-opened',$element).removeClass('is-opened').addClass('is-closed');
      }
    };
    plugin.init();

  };

  $.fn.toggleTablecells = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('toggleTablecells')) {
        var plugin = new $.toggleTablecells(this, options);
        $(this).data('toggleTablecells', plugin);
      }
    });

  };

  $('.js-toggle-tablecells').toggleTablecells();

})(jQuery);
