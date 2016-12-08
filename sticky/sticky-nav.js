/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);


/**
 * Activation du script Sticky-kit
 *
 * @contributors:	Jennifer Noesser <jennifer@alsacreations.fr>
 **/
jQuery(document).ready(function($) {

    $('.js-sticky-nav').stick_in_parent({
      sticky_class: 'sticky-is-stuck',
    });

});

/**!
 * ActiveNav
 * Active and sticky navigation with anchors and scroll updates
 *
 * @author	Damien Senger <damien@alsacreations.fr>
 * @author	Rodolphe <rodolphe@alsacreations.fr>
 * */

(function($) {

 $.stickyNav = function(el, options) {

   // Default settings values
   var defaults = {
     selectorNavlink:'.subnav-link',
     classToggle:'is-active',
     selectorContent:'.content-section',
     speed:300,
     interval:false,
     sections:undefined,
     lastContentId:false,
     topLimit:undefined,
     bottomLimit:undefined
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
     plugin.settings.sections = $(plugin.settings.selectorContent);
     plugin.settings.topLimit = plugin.settings.sections.first().offset().top;
     plugin.settings.bottomLimit = plugin.settings.sections.last().offset().top+plugin.settings.sections.last().outerHeight();
   };

   // Reads plugin settings from HTML data-* attributes (camelCase)
   var updateSettingsFromHTMLData = function() {
     var data = $element.data();
     for (var dat in data) plugin.settings[dat] = data[dat];
   };

   // Set event handlers on HTML elements (private method)
   var registerEvents = function() {
     $(plugin.settings.selectorNavlink,$element).on('click.activenav',plugin.scrollToContent);
     $(plugin.settings.selectorNavlink,$element).on('click.activenav',plugin.switchClasses);
     $(window).on('scroll.activenav', plugin.scrollUpdate);
   };

   // Scroll to the linked content in the document (public method)
   plugin.scrollToContent = function() {
     var $target = $($(this).attr('href'));
     var top = parseInt($target.offset().top);
     if(top>-1) {
       $('body,html').animate({
         scrollTop:top
       },plugin.settings.speed);
     }
   };

   // Scroll to the linked content in the document (public method)
   plugin.switchClasses = function(e) {
      $(plugin.settings.selectorNavlink,$element).removeClass(plugin.settings.classToggle);
      $(this).addClass(plugin.settings.classToggle);
      e.preventDefault();
   };

   // Scroll to the linked content in the document (public method)
   plugin.scrollUpdate = function(e) {

      clearTimeout(plugin.settings.interval);
      plugin.settings.interval = setTimeout(function() {

        var scrollTop = $(document).scrollTop();
        var id = false;
        var top, bottom;

        // For each content section, we search the one where the scroll is
        plugin.settings.sections.each(function() {

            var $that = $(this);
            top = $that.offset().top;
            bottom = $that.outerHeight()+top;

            if(top <= scrollTop && scrollTop <= bottom) {
              id = $that.attr('id');
              if(id !== plugin.settings.lastContentId) {
                plugin.settings.lastContentId = id;
                $(plugin.settings.selectorNavlink,$element).removeClass('is-active');
                $(plugin.settings.selectorNavlink+'[href="#'+id+'"]',$element).addClass('is-active');
              }
            }

        });

        // If linked content not found, remove the active class
        if(!id && (scrollTop < plugin.settings.topLimit || scrollTop > plugin.settings.bottomLimit)) {
          $(plugin.settings.selectorNavlink,$element).removeClass('is-active');
        }

      },20);
   };

   // Initialization
   plugin.init();

 };

 $.fn.stickyNav = function(options) {

   return this.each(function() {
     if (undefined === $(this).data('stickyNav')) {
       var plugin = new $.stickyNav(this, options);
       $(this).data('stickyNav', plugin);
     }
   });

 };

 $('.js-sticky-nav').stickyNav();

})(jQuery);
