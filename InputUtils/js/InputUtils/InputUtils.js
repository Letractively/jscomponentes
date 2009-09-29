/**
 * 
 * Componente para manipulação de inputs
 * http://jscomponentes.googlecode.com/svn/trunk/InputUtils/js/InputUtils/InputUtils.js
 * 
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var InputUtils = {

	especialKeys: {8:0, 9:0, 13:0, 35:0, 36:0, 37:0, 38:0, 39:0, 40:0, 46:0},
	
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
		var event      = (e) ? e : window.event,
		    charCode   = (event.which) ? event.which : event.keyCode,
		    acceptCode = InputUtils.especialKeys,
				charactere = String.fromCharCode(charCode),
				isAccept   = charCode in acceptCode;
		
		if(isAccept) {
			return true;
		}
		
		if(/[^0-9]/.test(charactere)) {
			return false;
	  }
		
		return true;
	},
	
	
	digitOnly: function(e) {
		var event      = (e) ? e : window.event,
		    charCode   = (event.which) ? event.which : event.keyCode,
				acceptCode = {43:0, 45:0},
		    input      = (event.target) ? event.target : event.srcElement,
				isAccept   = charCode in acceptCode;
		
		if(isAccept && (input.value.search(/[+-]/) == -1 && input.value == "")) {
			return true;
		}
		
		return InputUtils.numberOnly(e);
	},
	
	
	letterOnly: function(e) {
		var event      = (e) ? e : window.event,
		    charCode   = (event.which) ? event.which : event.keyCode,
		    acceptCode = InputUtils.especialKeys,
				charactere = String.fromCharCode(charCode),
				isAccept   = charCode in acceptCode;
		
		if(isAccept) {
			return true;
		}
		
		if(/[^a-zA-ZáàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]/.test(charactere)) {
			return false;
	  }
		
		return true;
	}

};
