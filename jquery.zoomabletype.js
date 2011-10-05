/*
 * Zoomable Type: Mac OS X's "Show in Large Type" for jQuery
 *
 * @version 1.0.4
 * @date    2011-04-17
 * @require jQuery >= v1.5.2 
 * @www     http://zoomabletype.tatey.com/
 *
 * Zoomable Type is a jQuery plugin for reading small text on a
 * display from far away.
 *
 * Distributed under the MIT licence:
 * See LICENCE or http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2010 Tate Johnson <tate@tatey.com>
 */

(function($) {
  var ZoomableType = {
    _doc: $(document),
    _win: $(window),
    _isZoomed: false,
    
    Element: function(element, options) {
      this.options  = $.extend({className: 'zoomed', textShadowColor: '#000'}, options);
      this.copy     = null;
      this.original = $(element).bind('click.zt', this, function(e) {
        if (ZoomableType._isZoomed) return;
        e.data.zoom();
        e.stopPropagation();
      });
      
      return this;
    }
  }

  $.extend(ZoomableType.Element.prototype, {
    zoom: function() {
      this.copy = $('<span>', {'class': this.options.className})
        .text(this.original.text())
        .appendTo('body')
        .bind('click.zt', function(e) { e.stopPropagation(); });
      this.resize();
      
      ZoomableType._isZoomed = true;
      ZoomableType._doc.bind('click.zt keyup.zt', this, function(e) { 
        if (!e.keyCode || e.keyCode == 27) e.data.shrink();
      });
      ZoomableType._win.bind('resize.zt', this, function(e) { 
        e.data.resize(); 
      });
    },
    
    shrink: function() {      
      this.copy.remove();
      this.copy = null;
      
      ZoomableType._isZoomed = false;
      ZoomableType._doc.unbind('.zt');
      ZoomableType._win.unbind('.zt');
    },
    
    resize: function() {
      var width  = ZoomableType._win.width() * 90 / this.original.width(),
          height = ZoomableType._win.height() * 90 / this.original.height();
      
      this.copy.css('font-size', (width < height ? width : height) + '%');
      this._style()._center();
    },
        
    _style: function() {
      var radius = this.copy.outerWidth() * 0.02;
      
      this.copy.css({
        padding: radius,
        webkitBorderRadius: radius,
        mozBorderRadius: radius,
        borderRadius: radius,
        textShadow: this.options.textShadowColor + ' 2px 2px ' + radius + 'px'
      });
      
      return this;
    },
    
    _center: function() {
      this.copy.css({
        position: 'fixed',
        left: (ZoomableType._win.width() - this.copy.outerWidth()) / 2,
        top: (ZoomableType._win.height() - this.copy.outerHeight()) / 2
      });
      
      return this;
    }
  });
    
  $.fn.zoomabletype = function(options) {
    if (window.screen.width > 480) {
      this.each(function() { new ZoomableType.Element(this, options); });
    }
    return this;
  }
})(jQuery);
