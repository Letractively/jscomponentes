/**
 * 
 * Objeto Literal Index
 * @author Edy Segura, edy@segura.eti.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setInputMask();
	},
	
	setInputMask: function() {
		MaskNumber.setMaksNumberByClass("number");
	}
	
};

//inicializacao
window.onload = Index.init;