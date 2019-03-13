/**!
 Plugin modal
 */

(function($) {

  $.modal = function(el, options) {

    // Default settings values
    var defaults = {
      modalUrl: undefined,
      useHistory: true,
      open: false,
      focusableElements: "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
      classOverlay: 'modal-overlay',
      classModal: 'modal',
      selectorPage: '#container'
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
      if(plugin.settings.open) $element.trigger('click.modal');
      $element.attr('aria-haspopup','dialog');
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      for (var dat in element.dataset) plugin.settings[dat] = element.dataset[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      $element.on('click.modal', plugin.openModal);
      // Close on click
      $('body').on('click.modal', '.modal-overlay, .modal .closemodal', plugin.close);
      // Escape to close
      $('body').on('keyup.modal', function(e) {
        if(e.keyCode == 27) // ESC
          plugin.close();
      });
      // History API
      $(window).on('popstate.modal', function(e) {
        if(plugin.settings.useHistory && e.state===undefined && plugin.settings.open) plugin.close();
      });
    };

    // Open overlay
    plugin.openOverlay = function() {
      $('body').addClass('no-scroll').append('<div class="'+plugin.settings.classOverlay+'"></div>');
    };

    // Open modal
    plugin.openModal = function(e) {
      if(e!==undefined) e.preventDefault();
      plugin.settings.focused = $(':focus');
      $(plugin.settings.selectorPage).attr('aria-hidden','true');
      $('.modal, .modal-overlay').remove(); // Closes remaining other modals
      plugin.openOverlay();
      var $modal = $('<dialog class="'+plugin.settings.classModal+'" open aria-modal="true"><div role="document" class="container"><button type="button" class="closemodal">Fermer</button></div></dialog>');
      if(plugin.settings.modalUrl) {
        // Load contents with AJAX
        $.get(plugin.settings.modalUrl, null, function(html) {
          $modal.find('.container:first').append(html);
          $modal.appendTo($('body'));
          // Set the focus to the first keyboard focusable item
          $('.modal').find(plugin.settings.focusableElements).filter(':visible').first().focus();
          // Tabulations
          $('body').on('keydown.modal', '.modal', plugin.trapTab);
        });
      }
      // History API to close modal when history back
      if(plugin.settings.useHistory) {
        history.pushState({ modal: 'opened' }, '', '');
      }
      plugin.settings.open = true;
    };

    // Close modal
    plugin.close = function(e) {
      $('.modal, .modal-overlay').remove();
      $('body').removeClass('no-scroll');
      $(plugin.settings.selectorPage).attr('aria-hidden', 'false');
      plugin.settings.open = false;
      if(plugin.settings.focused) {
        plugin.settings.focused.focus();
      }
      if(e!==undefined) e.preventDefault();
    };

    // Tab loop inside the modal (can't work with embedded iframes)
    plugin.trapTab = function(e) {
      if(event.keyCode !== 9) return; // Only Tab (maybe shift+Tab)
      var focusableItems = $('.modal').find(plugin.settings.focusableElements).filter(':visible');
      var focusedItem = $('.modal :focus');
      var focusedItemIndex = focusableItems.index(focusedItem);
      if(focusedItemIndex == 0 && e.shiftKey) {
        focusableItems.last().focus();
        e.preventDefault();
      }
      else if((focusedItemIndex == focusableItems.length-1) && !e.shiftKey) {
        focusableItems.first().focus();
        e.preventDefault();
      }
    };

    // Destroy the plugin (public method)
    plugin.destroy = function() {
      plugin.close();
      $element.off('click.modal');
      $('body').off('click.modal', '.modal-overlay, .modal .closemodal');
      $('body').off('keyup.modal');
      $('body').off('keydown.modal', '.modal');
    };

    // Initialization
    plugin.init();

  };

  $.fn.modal = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('modal')) {
        var plugin = new $.modal(this, options);
        $(this).data('modal', plugin);
      }
    });

  };

  $(document).ready(function() {
    $('.js-modal').modal();
  });

})(jQuery);
