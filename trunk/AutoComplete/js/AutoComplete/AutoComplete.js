/**
 *
 * Objeto para manipulacao de campos autocomplete.
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var AutoComplete = {

	init: function(inputId, inputText, url, params) {
		var inputId   = document.getElementById(inputId), 
				inputText = document.getElementById(inputText);

		if(inputId && inputText && url) {
			jQuery(inputText).autocomplete(
				url,
				{
					minChars: 0,
					max: 10,
					width: AutoComplete.getWidthAutocomplete(inputText),
					matchContains: true,
					autoFill: false,
					extraParams: params,

					formatItem: function(data, i, max) {
						inputId.value = "";
						return AutoComplete.formatItemReturn(inputId.id, data);
					},

					formatResult: function(data) {
						return AutoComplete.formatResult(inputId.id, data);
					}

				}
			)
			.result(function(event, data) {
				inputId.value = data[0];
				AutoComplete.triggerOnResult(inputId.id, data);
			});

			AutoComplete.clearInputsOnEmptyChange(inputId, inputText);
		}
	},


	getWidthAutocomplete: function(inputText) {
		return inputText.offsetWidth - 2;
	},


	clearInputsOnEmptyChange: function(inputId, inputText) {
		var inputHandler = function() {
			if(this.value == "") {
				var inputId = jQuery(this).next('input').get(0);
				if(inputId) {
					inputId.value = ""; 
				}
			}
		};

		jQuery(inputText)
			.keyup(inputHandler)
			.blur(inputHandler);
	},


	triggerOnResult: function(inputId, data) {
		//implementa um comportamento após selecionar um item
	},

	formatResult: function(inputId, data) {
		return data[1];
	},
	
	formatItemReturn: function(inputId, data) {
		return data[0] + " - " + data[1];
	}

};