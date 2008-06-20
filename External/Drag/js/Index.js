/** 
 *
 * Exemplo do uso do componente Drag.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {

	init: function() {
		Index.setDrag();
	},

	setDrag: function() {
		var div   = document.getElementById("drag");
		var title = div.getElementsByTagName('h3')[0];
		
		div.style.top  = "212px";
		div.style.left = "9px";
		
		//usando componente Drag
		Drag.init(title, div);
	}

};

//inicializacao
window.onload = Index.init;
