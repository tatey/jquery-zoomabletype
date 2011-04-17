(function($) {
  var ZoomableType = {
    d: $(document),
    w: $(window),
    
    Element: function(element) {
      this.copy     = null;
      this.original = element.bind('click.zt', this, function(e) {
        if (this.copy != null) return;
        e.data.zoom();
        e.stopPropagation();
      });
    }
  }

  $.extend(ZoomableType.Element.prototype, {
    zoom: function() {
      this.copy = $('<span>', {className: 'zoomed'})
        .text(this.original.text())
        .appendTo('body')
        .bind('click.zt', function(e) { e.stopPropagation(); });
        
      this.resize();
              
      ZoomableType.d.bind('click.zt keyup.zt', this, function(e) { 
        if (!e.keyCode || e.keyCode == 27) e.data.shrink();
      });
      ZoomableType.w.bind('resize.zt', this, function(e) { 
        e.data.resize(); 
      });
    },
    
    shrink: function() {      
      this.copy.remove();
      this.copy = null;
      
      ZoomableType.d.unbind('.zt');
      ZoomableType.w.unbind('.zt');
    },
    
    resize: function() {
      var width  = ZoomableType.w.width() * 0.9 / this.original.width() * 100,
          height = ZoomableType.w.height() * 0.9 / this.original.height() * 100;
      
      this.copy.css('font-size', (width < height ? width : height) + '%');
      this.stylize().center();
    },
        
    stylize: function() {
      var radius = this.copy.outerWidth() * 0.02;
      
      this.copy.css({
        padding: radius,
        webkitBorderRadius: radius,
        mozBorderRadius: radius,
        borderRadius: radius,
        textShadow: '#000 2px 2px ' + radius + 'px'
      });
      
      return this;
    },
    
    center: function() {
      this.copy.css({
        position: 'fixed',
        left: (ZoomableType.w.width() - this.copy.outerWidth()) / 2,
        top: (ZoomableType.w.height() - this.copy.outerHeight()) / 2
      });
      
      return this;
    }
  });
    
  $.fn.zoomabletype = function() {
    return this.each(function() { new ZoomableType.Element($(this)); });
  }
})(jQuery);
