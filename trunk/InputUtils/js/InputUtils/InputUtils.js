/**
 * 
 * Componente para manipulação de inputs
 * http://jscomponentes.googlecode.com/svn/trunk/InputUtils/js/InputUtils/InputUtils.js
 * 
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var InputUtils = {
	
	setNumberOnly: function(inputs) {
		if(inputs && inputs.length) {
			InputUtils.setInputs(inputs, InputUtils.numberOnly);
		}
	},
	
	
	setDigitOnly: function(inputs) {
		if(inputs && inputs.length) {
			InputUtils.setInputs(inputs, InputUtils.digitOnly);
		}
	},
	
	
	setLetterOnly: function(inputs) {
		if(inputs && inputs.length) {
			InputUtils.setInputs(inputs, InputUtils.letterOnly);
		}
	},
	

	setInputs: function(inputs, handle) {
		if(inputs && inputs.length && handle) {
			for(var i=0; i<inputs.length; i++) {
				var input = inputs[i];
				input.onkeypress = handle;
			}
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
	
	
	digitOnly: function(e) {
		var event = (e) ? e : window.event;
		var charCode = (event.which) ? event.which : event.keyCode;
		var input = (event.target) ? event.target : event.srcElement;
		
		if((charCode == 43 || charCode == 45) && input.value.search(/[+-]/) == -1) {
			return true;
		}
		
		return InputUtils.numberOnly(e);
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
