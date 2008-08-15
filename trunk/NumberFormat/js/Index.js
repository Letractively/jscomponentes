/**
 * 
 * Objeto Literal Index para uso do NumberFormat.js
 * @author Edy Segura, edy@segura.pro.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setNumberFormat();
	},
	
	setNumberFormat: function() {

		NumberFormat.setNumberFormatByClass({
			className : "number"
		});
		
		NumberFormat.setNumberFormatByClass({
			className   : "number-2",
			maskOptions : {
				FRACTION_SEPARATOR : ".",
				FRACTION_NUMBER    : 3,
				THOUSAND_SEPARATOR : ","
			}
		});
		
		NumberFormat.setNumberFormatByClass({
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