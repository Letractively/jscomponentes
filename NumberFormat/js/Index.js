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

		MaskNumber.setMaksNumberByClass({
			className : "number"
		});
		
		MaskNumber.setMaksNumberByClass({
			className   : "number-2",
			maskOptions : {
				FRACTION_SEPARATOR : ".",
				FRACTION_NUMBER    : 3,
				THOUSAND_SEPARATOR : ","
			}
		});
		
		MaskNumber.setMaksNumberByClass({
			className   : "number-3",
			maskOptions : {
				FRACTION_SEPARATOR : "-",
				FRACTION_NUMBER    : 4,
				THOUSAND_SEPARATOR : " "
			}
		});
	}
	
};

//inicializacao
window.onload = Index.init;