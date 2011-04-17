(function($) {
  var ZoomableType = function(element) { 
    this.copy     = null;
    this.original = element.bind('click.z', this, function(e) { 
      if (e.data.copy) return;
      e.data.zoom();
      e.stopPropagation();
    });
  }

  $.extend(ZoomableType.prototype, {
    zoom: function() {
      this.copy = $('<span>', {className: 'zoomed'})
        .text(this.original.text())
        .appendTo('body')
        .bind('click.z', function(e) { e.stopPropagation(); });
        
      this.resize();
        
      $(document).bind('click.z keyup.z', this, function(e) { e.data.shrink(); });
      $(window).bind('resize.z', this, function(e) { e.data.resize(); });
    },
    
    shrink: function() {      
      this.copy.remove();
      this.copy = null;
      
      $(document).unbind('.z');
      $(window).unbind('.z');
    },
    
    resize: function() {
      var w = $(window),
          wScale = w.width() * 0.9 / this.original.width(),
          hScale = w.height() * 0.9 / this.original.height();
      
      this.copy.css({
        fontSize: (wScale < hScale ? wScale : hScale) * 100 + '%'
      });
    }
  });
  
  $.fn.zoomabletype = function() {
    return this.each(function() { new ZoomableType($(this)); });
  }
})(jQuery);
