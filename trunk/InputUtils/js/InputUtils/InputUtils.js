/**
 * 
 * Componente para manipulação de inputs
 * http://jscomponentes.googlecode.com/svn/trunk/InputUtils/js/InputUtils/InputUtils.js
 * 
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var InputUtils = {
	
	setInputs: function(inputs, handle) {
		if(inputs && inputs.length && handle) {
			for(var i=0; i<inputs.length; i++) {
				var input = inputs[i];
				input.onkeypress = handle;
			}
		}
	},
	
	
	setNumberOnly: function(inputs) {
		if(inputs && inputs.length) {
			InputUtils.setInputs(inputs, InputUtils.numberOnly);
		}
	},
	
	
	setLetterOnly: function(inputs) {
		if(inputs && inputs.length) {
			InputUtils.setInputs(inputs, InputUtils.letterOnly);
		}
	},
	
	
	numberOnly: function(e) {
		var event = (e) ? e : window.event;
		var charCode = (event.which) ? event.which : event.keyCode;
		
		if(charCode == 13) return true;
		
		if(charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
	  }
		
		return true;
	},
	
	
	letterOnly: function(e) {
		var event = (e) ? e : window.event;
		var charCode = (event.which) ? event.which : event.keyCode;
		
		if((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) &&
			 (charCode != 32 || charCode != 8 || charCode != 13)) {
			return false;
		}
		
		return true;
	}

};
