﻿/**
 *
 * Objeto Literal Index para uso do componente InputUtils.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.setForm();
		Index.setInputs();
	},
	
	
	setForm: function() {
		var form = document.forms[0];
		if(form) {
			form.onsubmit = function() {
				return false;
			}
		}
	},
	
	
	setInputs: function() {
		var inputLetter = document.getElementById('letter');
		var inputNumber = document.getElementById('number');
		var inputDigit  = document.getElementById('digit');
		InputUtils.setLetterOnly([inputLetter]);
		InputUtils.setNumberOnly([inputNumber]);
		InputUtils.setDigitOnly([inputDigit]);
	}
	
};

//inicializacao
window.onload = Index.init;
