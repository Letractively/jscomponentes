/** 
 *
 * Exemplo do uso do componente Drag.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Index = {

	init: function() {
		Index.setDrag();
	},

	setDrag: function() {
		var div    = document.getElementById("drag"),
		    title  = div.getElementsByTagName('h3')[0],
				limitX = (Browser.getPageSize().viewWidth  - div.offsetWidth) - 2,
				limitY = (Browser.getPageSize().viewHeight - div.offsetHeight) - 2;
		
		div.style.top  = "212px";
		div.style.left = "9px";
		
		//usando componente Drag
		Drag.init(title, div, 2, limitX, 2, limitY);
	}

};

//inicializacao
window.onload = Index.init;
window.onresize = Index.setDrag;
