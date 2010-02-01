/**
 * Objeto Literal para Div Flutuante
 */
var DivFlutuante = {
	
	init: function() {
		DivFlutuante.setActions();
		DivFlutuante.setDrag();
	},
	
	
	setActions: function() {
		jQuery('div.div-flutuante div.close').click(function() {
	    jQuery(this.parentNode).hide();
	    return false;
	  });
	},
	
	
	setDrag: function() {
		jQuery('div.div-flutuante').each(function() {
			var div   = this,
			    title = div.getElementsByTagName("h2")[0];
			if(title) {	Drag.init(title, div, 5, null, 15, null); }
			else { Drag.init(div, null); }
		});
	},
	
	
	getMousePositionForDivFlutuante: function(e, div) {
  		e = e || window.event;

  		var positionX = (e.clientX) ? e.clientX : e.pageX,
  		    positionY = (e.clientY) ? e.clientY : e.pageY,
  		    
  		    offsetWidth  = div.offsetWidth,
          offsetHeight = div.offsetHeight,      
  		    
  		    x = positionX + offsetWidth,
		      y = positionY + offsetHeight,
		  
  		    pageWidth   = Browser.getPageSize().viewWidth,
  			  pageHeight  = Browser.getPageSize().viewHeight,
  		    scrollWidth = 24;
  		
  		if(x > pageWidth) {
   			positionX = (pageWidth - offsetWidth) - scrollWidth;
  		}
  		
  		if(y > pageHeight) { 
 				positionY = (pageHeight - offsetHeight) - scrollWidth;
  		}
  		
  		return {x:positionX, y:positionY};
  },
  
  
  showDivFlutuante: function(e, div) {
 		var mousePosition = {};
		    
 		jQuery(div).show();
		
		mousePosition = DivFlutuante.getMousePositionForDivFlutuante(e, div);
		jQuery(div).css({
			left: mousePosition.x + 'px',
			top : mousePosition.y + 'px'
		});
 	}

};

//inicializacao
jQuery(function(){ DivFlutuante.init(); });
