/**
 *
 * Objeto Literal Index para uso do objeto Dialog.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Index = {
	
	init: function() {
		Index.setAnchor();
	},
	
	
	setAnchor: function() {
		var anchor = document.links[2];
		
		if(anchor) {
			anchor.onclick = function() {
				Dialog.createDivOverlay();
				
				window.setTimeout(function(){
					Dialog.removeDivOverlay();
				}, 2000);
			};
		}
	}
	
};

//inicializacao
window.onload = Index.init;
