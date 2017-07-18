/**!
 BackToTop
 Retour en haut de page
 */

(function($) {

  $.backToTop = function( element, options ) {

    /*
     * Define plugin variables
     */

    var default_options = {
      speed  : 500
    };

    // Store
    backToTop = this;

    // Initialize parameters array ( used to merge options & custom options )
    backToTop.settings = {};

    /*
     * Plugin init function
     */

    var init = function() {

      // Merge default options with user choices
      backToTop.settings = $.extend( {}, default_options, options );

      // Get data elements value
      updateSettingsFromHTMLData();

      // Register plugin events
      registerEvents();

    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {

      var data = $(element).data();
      for (var dat in data) {
        backToTop.settings[dat] = data[dat];
      }

    };

/*-------------------------------------------------------------*\
                        Plugin methods
\*-------------------------------------------------------------*/

    var registerEvents = function() {

      // Do scroll on element click
      $(element).on('click.backtotop', backToTop.doScroll );

    };

    backToTop.doScroll = function(e) {
      e.preventDefault();
      $('html,body').animate({ scrollTop: 0 }, backToTop.settings.speed);
    };

    // Init plugin
    init();

  };

/*-------------------------------------------------------------*\
                        jQuery method
\*-------------------------------------------------------------*/

  $.fn.backToTop = function( options ) {

    // "return" -> Allow jQuery method chaining
    return this.each(function() {

      if( undefined === $(this).data( 'js-back-top' ) ) {
        backToTop = new $.backToTop( this, options );
        $(this).data( 'js-back-top', backToTop );
      }

    });

  };

  $( '.js-back-top' ).backToTop();

})(jQuery);
