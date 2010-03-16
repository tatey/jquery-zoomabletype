/*
* Zoomable Type: Mac OS X's "Show in Large Type" for jQuery
* @version 1.0.2
* @date 2010-03-16
* @require jQuery >= v1.4.2 
*
* Zoomable Type is a jQuery plugin for reading small text on a
* display from far away.
*
* Distributed under the MIT licence:
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright (c) 2010 Tate Johnson <tate@tatey.com>
*/

(function($) {  
  $.zoomableType = function(selector, settings) {
    if (!navigator.userAgent.match(/iPhone/)) {
      $(selector || '.zoomable').each(function() { $(this).click(onZoom); });
    }
  };
  var $zt = $.zoomableType;
  
  function onZoom() {
    if ($zt.zoomedElement) {
      onHide();
      return false; 
    }
    var element = $('<span>', {'id': 'zoomed' + (+ new Date()), 'class': 'zoomed'});
    element.text($(this).text());
    element.appendTo('body');
    element.data.unzoomedWidth  = element.width();
    element.data.unzoomedHeight = element.height();
    setSizeAndPositionFor(element);
    $zt.zoomedElement = element;
    $(document).bind('click keydown', onHide);
    $(window).resize(onWindowResize);
    return false;
  }
  
  function onHide() {
    $(document).unbind('click keydown', onHide);
    $(window).unbind('resize', onWindowResize);
    $zt.zoomedElement.remove();
    $zt.zoomedElement = null;
    return false;
  }
  
  function onWindowResize() {
    setSizeAndPositionFor($zt.zoomedElement);
  }
  
  function setSizeAndPositionFor(element) {
    var win         = $(window);
    var widthScale  = (win.width() - win.width() * 0.10) / element.data.unzoomedWidth;
    var heightScale = (win.height() - win.height() * 0.10) / element.data.unzoomedHeight;
    element.css(
      'font-size',
      (widthScale < heightScale ? widthScale : heightScale) * 100 + '%'
    );
    var radius = element.outerWidth() * 0.02;
    element.css({
      'padding': radius,
      '-moz-border-radius': radius,
      '-webkit-border-radius': radius,
      'border-radius': radius,
      'text-shadow': '#000 2px 2px ' + parseFloat(element.css('fontSize')) * 0.01 + 'px'
    });
    element.css({
      'left': (win.width() - element.outerWidth()) / 2,
      'top': win.height() / 2 - element.outerHeight() / 2
    });
  }
})(jQuery);
