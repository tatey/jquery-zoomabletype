/*
 * Zoomable Type: Mac OS X's "Show in Large Type" for jQuery
 *
 * @version 1.0.3
 * @date    2010-04-26
 * @require jQuery >= v1.4.2 
 * @www     http://zoomabletype.tatey.com/
 *
 * Zoomable Type is a jQuery plugin for reading small text on a
 * display from far away.
 *
 * Distributed under the MIT licence:
 * See LICENCE or http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (c) 2010 Tate Johnson <tate@tatey.com>
 */

(function($) {  
  $.fn.zoomableType = function(klass) {
    if (navigator.userAgent.match(/iPhone/)) return this; // Mobile Safari on iPhone already binds event listeners to "telephone numbers"
    $(this).live('click', function() {
      if ($.zoomableType) return false; // There can only be one. Let document event listener clean up.
      $.zoomableType = $('<span>', {'id': 'zt' + new Date().getTime(), 'class': (klass || 'zoomed')})
        .text($(this).text())
        .appendTo('body')
        .attr('data-unzoomed-width', $(this).width())
        .attr('data-unzoomed-height', $(this).height());
      setSizeAndPosition($.zoomableType);
      $(document).bind('click.zt keydown.zt', unzoom);
      $(window).bind('resize.zt', setSizeAndPosition);
      
      /* 
       * Unbind event listeners and remove zoomed element from DOM.
       */
      function unzoom() {
        $(document).unbind('click.zt keyup.zt');
        $(window).unbind('resize.zt');
        $.zoomableType.remove();
        $.zoomableType = null;
      }
      
      /*
       * Zoom text to 90% of browser window's width or height (Whichever is greater). 
       * Position zoomed text in centre of the window.
       */
      function setSizeAndPosition() {
        var win         = $(window);
        var widthScale  = (win.width() - win.width() * 0.10) / $.zoomableType.attr('data-unzoomed-width');
        var heightScale = (win.height() - win.height() * 0.10) / $.zoomableType.attr('data-unzoomed-height');
        $.zoomableType.css(
          'font-size',
          (widthScale < heightScale ? widthScale : heightScale) * 100 + '%'
        );
        var radius = $.zoomableType.outerWidth() * 0.02;
        $.zoomableType.css({
          'padding': radius,
          '-moz-border-radius': radius,
          '-webkit-border-radius': radius,
          'border-radius': radius,
          'text-shadow': '#000 2px 2px ' + parseFloat($.zoomableType.css('fontSize')) * 0.01 + 'px'
        });
        // Position after styling has been applied.
        $.zoomableType.css({
          'left': (win.width() - $.zoomableType.outerWidth()) / 2,
          'top': win.height() / 2 - $.zoomableType.outerHeight() / 2
        });
      }
    });
    return this;
  }
})(jQuery);
