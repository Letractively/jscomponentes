/**
 *
 * Objeto Literal Index para uso do objeto Dialog.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setAnchor();
	},//fim init
	
	
	setAnchor: function() {
		var anchor = document.body.getElementsByTagName("a")[0];
		
		if(anchor) {
			anchor.onclick = function() {
				Dialog.createDivOverlay();
				
				window.setTimeout(function(){
					Dialog.removeDivOverlay();
				}, 2000);
			};
		}
	}
	
};//fim Index

//inicializacao
window.onload = Index.init;
