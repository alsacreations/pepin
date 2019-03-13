/**!
 Filter directory
 Directory autocomplete for members list or other stuff
 */

(function($) {

  // Update :contains() pseudo-selector for case-insensitive behaviour
  $.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

  $.filterDirectory = function(el, options) {

    // Default settings values
    var defaults = {
      nbMaxItemsAtStart: 3,
      selectorForm: '.annuaire-form',
      selectorItems: '.annuaire-item',
      selectorAutoComplete: '.searchform-autocomplete',
      selectorInput: '.searchform-input',
      selectorAlphaFilters: '.annuaire-sort-alpha-list a',
      selectorAlphaContents: '.annuaire-list, .annuaire-subtitle',
      selectorSubtitles: '.annuaire-subtitle',
      selectorToHideWithFilters: '.annuaire-nb-members',
      selectorSuggest: '.annuaire-name a',
      selectorSubmit: '.searchform-submit'
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      plugin.settings.autocomplete = $(plugin.settings.selectorAutoComplete,$element);
      registerEvents();
      plugin.resetAutoComplete();
      plugin.hideManyItems();
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Set event handlers on HTML elements (private method)
    var registerEvents = function() {
      $(plugin.settings.selectorInput,$element)
        .on('keyup.directoryComplete', plugin.autoComplete);
      plugin.settings.autocomplete.on('click.directory','a',plugin.autoFill);
      $(plugin.settings.selectorAlphaFilters,$element).on('click.directory', plugin.alphaGo);
      $(plugin.settings.selectorForm).on('click.directory',plugin.settings.selectorSubmit, plugin.submit);
      $element.on('click.directory','.js-moreitems', plugin.showMoreItems);
    };

    // Unfilter results
    plugin.unfilterResults = function() {
      $(plugin.settings.selectorItems,$element).show();
      $(plugin.settings.selectorSubtitles,$element).show();
      $(plugin.settings.selectorAlphaContents,$element).show();
      $('.js-moreitems',$element).hide();
    };

    // Filter results as you type
    plugin.filterResults = function() {
      $(plugin.settings.selectorToHideWithFilters,$element).hide();
      var $items = $(plugin.settings.selectorItems,$element);
      var v = $(plugin.settings.selectorInput,$element).val();
      plugin.unfilterResults();
      if(v.length>0) {
        $items.filter(':not(:contains('+v+'))').hide();
        plugin.toggleSubtitles();
      } else {
        $items.show();
      }
    };

    // Go to selected letter
    plugin.alphaGo = function(e) {
      e.preventDefault();
      $(plugin.settings.selectorToHideWithFilters,$element).hide();
      $(plugin.settings.selectorInput,$element).val('');
      $(plugin.settings.selectorAlphaFilters,$element).removeClass('is-active');
      $(this).addClass('is-active');
      var letter = $(e.target).text().toString().toLowerCase();
      plugin.resetAutoComplete();
      plugin.unfilterResults();
      if(letter.length==1) {
        var $target = $(plugin.settings.selectorAlphaContents,$element).filter('[data-letter='+letter+']');
        $(plugin.settings.selectorAlphaContents,$element).not($target).hide();
        $target.show();
      }
    };

    // Autofill input field when click on autocomplete suggestions
    plugin.autoFill = function(e) {
      var txt = $(this).text();
      plugin.resetAutoComplete();
      $(plugin.settings.selectorInput,$element).val(txt);
      plugin.filterResults();
      e.preventDefault();
    };

    // Autocomplete
    plugin.autoComplete = function(e) {
      e.preventDefault();
      var v = $(this).val();
      var html_list = '';
      if(e.keyCode==27) { // ESC
        plugin.resetAutoComplete();
        $(plugin.settings.selectorAlphaFilters,$element).removeClass('is-active');
        $(this).val('');
        plugin.unfilterResults();
      } else if(v.length<2) {
        plugin.resetAutoComplete();
      } else {
        // Search values
        $(plugin.settings.selectorSuggest,$element).filter(':contains('+v+')').each(function() {
          html_list += '<li class="searchform-autocomplete-item"><a href="#">'+$(this).text()+'</a></li>';
        });
        if(html_list) {
          plugin.settings.autocomplete.html('<ul class="searchform-autocomplete-list unstyled">'+html_list+'</ul>').show();
        }
      }
      // <li class="searchform-autocomplete-item team"><i class="icon-twitter"></i> Otten - <em>Nom de l'équipe</em>
    };

    // Show/hide subtitles
    plugin.toggleSubtitles = function() {
      // Elimine les sous-titres lettres de blocs d'items vides
      var $subtitles = $(plugin.settings.selectorSubtitles,$element);
      $subtitles.each(function() {
        if($(this).next('.annuaire-list').find('.annuaire-item:visible').length<1) {
          $(this).hide();
        }
      });
    };

    // Hides items if more than nbMaxItemsAtStart
    plugin.hideManyItems = function () {
      if(plugin.settings.nbMaxItemsAtStart>0) {
        var $items = $(plugin.settings.selectorItems,$element).slice(plugin.settings.nbMaxItemsAtStart);
        $items.hide();
        plugin.toggleSubtitles();
        var txt_more = $element.data('more');
        if(!txt_more) txt_more = 'Plus...';
        $('.annuaire-list:last',$element).append('<p><a class="btn-primary js-moreitems" href="#">'+txt_more+'</a></p>');
      }
    };

    // Show items that were set to hidden with hideManyItems
    plugin.showMoreItems = function(e) {
      $('.js-moreitems',$element).remove();
      plugin.unfilterResults();
      e.preventDefault();
    };

    // Submit button
    plugin.submit = function(e) {
      e.preventDefault();
      plugin.filterResults();
      plugin.resetAutoComplete();
    };

    // Reset autocomplete
    plugin.resetAutoComplete = function () {
      plugin.settings.autocomplete.empty().hide();
    };

    // Initialization
    plugin.init();

  };

  $.fn.filterDirectory = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('filterDirectory')) {
        var plugin = new $.filterDirectory(this, options);
        $(this).data('filterDirectory', plugin);
      }
    });

  };

  $(document).ready(function() {
    $('.js-filter-directory').filterDirectory();
  });

})(jQuery);
