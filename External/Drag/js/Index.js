/** 
 *
 * Exemplo do uso do componente Drag.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {

	init: function() {
		Index.setDomDrag();
	},//fim init


	setDomDrag: function() {
		var oDiv = document.getElementById("drag");
		var oH3  = oDiv.getElementsByTagName('h3')[0];
		
		oDiv.style.top  = "155px";
		oDiv.style.left = "155px";
		
		//usando componente Drag
		Drag.init(oH3, oDiv);
		
	}//fim setDomDrag

};//fim Index

//inicialização
window.onload = Index.init;
