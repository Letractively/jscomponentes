﻿/**
 *
 * Objeto para manipulacao e edicao de formulario. 
 * A documentacao completa pode ser encontrada no endereco:
 * http://code.google.com/p/jscomponentes/wiki/Form
 *
 * Form.js
 * http://jscomponentes.googlecode.com/svn/trunk/Form/js/Form/Form.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Form = {
	
	//historico das modificacoes
	modifications: [],
	
	checkModifications: function(form) {
		var inputModifications = $('modifications');
		var elements = form.elements;
		
		//inicializacao
		Form.modifications = [];
		
		if(inputModifications) {
			for(var i=0; i<elements.length; i++) {
				var element = elements[i];
				
				if(element.disabled) continue;
				
				switch(element.type) {
					case 'text'      :
					case 'textarea'  :
						Form.checkModificationInput(element);
					break;
					case 'select-one':
						Form.checkModificationCombo(element);
					break;
				}
			}
			
			inputModifications.value = Form.modifications.join("<br />");
		}
		
		return true;
	},
	
	
	addModification: function(element, newValue, oldValue) {
		var message = "";
		
		newValue = (newValue) ? newValue : "vazio";
		oldValue = (oldValue) ? oldValue : "vazio";
		
		if(newValue != oldValue) {
			message = element.title + ": De (" + oldValue + ") para (" + newValue + ")";
			Form.modifications.push(message);
		}
	
	},
	
	
	checkModificationInput: function(element) {
		Form.addModification(element, element.value, element.defaultValue);
	},
	
	
	checkModificationCombo: function(element) {
		var newValue = element[element.selectedIndex].text;
		var oldValue = "";
		var options  = element.options;
		
		for(var i=0; i<options.length; i++) {
			if(options[i].defaultSelected) {
				oldValue = options[i].text;
				break;
			}
		}
		
		Form.addModification(element, newValue, oldValue);
	},
 
 
	focusOnFirst: function() {
		if(document.forms.length > 0) {
			var form = document.forms[0];
			
			for(var i=0; i<form.elements.length; i++) {
				var field = form.elements[i];
				
				if(typeof field.type != "undefined" && field.type != "hidden" && !field.readOnly && !field.disabled) {
					if(!field.value) field.focus();
					else continue;
					return;
				}
				
			}
		}
	},
	
	
	reset: function(form) {
		var form = (form) ? form : document.forms[0];
		
		if(form) {
			for(var i=0; i<form.elements.length; i++) {
				var formElement = form.elements[i];
				
				switch (formElement.type) {
					case 'text'    :
					case 'hidden'  :
					case 'password':
						
						if(formElement.name != "filtro") {
							formElement.value = "";
							formElement.defaultValue = "";
						}
						
					break;
					case 'select-one' :
					
					for(var j=0; j<formElement.options.length; j++) {
						formElement.options[j].defaultSelected = false;
					}
					
					formElement.options[0].defaultSelected = true;
					formElement.options[0].selected = true;
					
					break;
				}
			}
		}
		
		return true;
	},
	
	
	validate: function(form) {
		var required = form.required;
		
		if(required) {
			var elements = required.value.split(",");
			return Form.eachElements(elements);
		}
		else {
			return Form.eachElements(form.elements);
		}
		
	},
	
	
	eachElements: function(elements) {
		for(var i=0; i<elements.length; i++) {
			var element = $(elements[i]);
			var noRequired = new RegExp("(^|\\s)no-required(\\s|$)");
			
			if(!element || element.disabled || noRequired.test(element.className)) continue;
			
			switch(element.type) {
				case 'text'      :
				case 'password'  :
				case 'textarea'  :
				case 'select-one':
					
					if(!Form.checkElement(element)) {
						return false;
					}

				break;
				
				case 'radio'   :
				case 'checkbox':

					continue; //Form.checkNodeListElement(element);

				break;
			
			}
		}
		
		return true;
	},
	
	
	checkElement: function(element) {
		try {
			
			if(Form.isEmpty(element.value)) {
				var sFieldName = (element.title) ? element.title : element.name;
				
				alert("O campo ( " + sFieldName + " ) é obrigatório.");
				element.focus();
				
				return false;
			}
		}
		catch(oErr) {
			
			alert([oErr.name, oErr.message].join("\n"));
			return false;
			
		}
		
		return true;
	},
	
	
	checkNodeListElement: function(oNodeList) {
	},
	
	
	tabForward: function(field) {
		var form = field.form;
		
		if(form.elements[form.elements.length-1] != field && 
			 field.value.length == field.getAttribute("maxlength")) {
			
			for(var i=0; i<form.elements.length; i++) {
				if(form.elements[i] == field) {
					for(var j=i+1; j<form.elements.length; j++) {
						var element = form.elements[j];

						if(typeof element.type != "undefined" && element.type != "hidden") {
							form.elements[j].focus();
							return;
						}
						
					}
				}
			}
		}
	},
	
	
	getFormUrlEncodedValues: function(form) {
		var sParams = new String;
		var aParams = new Array;
		
		form = (typeof form == "string") ? $(form) : form;
		
		for(var i=0; i<form.elements.length; i++) {
			var element = form.elements[i];
			
			if(element.disabled) continue;
			if(element.name == "" || element.name == undefined) continue;
      if(element.type == "" || element.type == undefined) continue;
			
			switch(element.type) {

				case "text"       :
				case "textarea"   :
				case "password"   :
				case "hidden"     :
				case "select-one" :
					
					sParams = element.name + "=" + encodeURIComponent(element.value);
					if(sParams) aParams.push(sParams);
					
				break;

				case "select-multiple" :
					
					for(var j=0; j<element.options.length; j++) {
            sParams = (element.options[j].selected) ? element.name + "=" + encodeURIComponent(element.options[j].value) : "";
						if(sParams) aParams.push(sParams);
          }

				break;

				case "radio"    :
				case "checkbox" :

					sParams = (element.checked) ? element.name + "=" + encodeURIComponent(element.value) : "";
					if(sParams) aParams.push(sParams);

				break;
			}
		}

		return aParams.join("&");
	},
	
	
	populateFormFromJson: function(form, aValues) {
		var oNodeList;
		
		for(var sIndex in aValues) {
			var element = $(sIndex);
			
			if(element) {
				
				switch(element.type) {
					case "text"     :
					case "textarea" :
					case "hidden"   :
						element.value = aValues[sIndex];
					break;
					
					case "select-one" :
						Form.setComboValue(element, aValues[sIndex]);
					break;
					
					case "checkbox" :
						element.checked = (aValues[sIndex]) ? true : false;
					break;
				}
				
			} 
			else if(oNodeList = document.getElementsByName(sIndex)) {
				
				for(var i=0; i<oNodeList.length; i++) {
	
					if(oNodeList[i].value == aValues[sIndex]) {
						oNodeList[i].checked = true;
						break;
					}
					
				}
			}
		}
	
	},
	
	
	setComboValue: function(combo, value) {
		var result = false;
		
		for(var i=0; i<combo.options.length; i++) {
			if(combo.options[i].value == value) {
				combo.options[i].selected = true;
				result = true;
				break;
			}
		}
		
		return result;
	},
	
	
	hasOneChecked: function(inputsName) {
		var result = false;
		var checks = document.getElementsByName(inputsName);
		
		if(checks.length) {
			for(var i=0; i<checks.length; i++) {
				
				if(checks[i].checked) {
					result = true;
					break;
				}
				
			}
		}
		
		return result;
	},
	
	getRadioValue: function(inputRadioName) {
		var inputs = document.getElementsByName(inputRadioName), input;
		if(inputs && inputs.length > 0) {
			for(var i=0; i<inputs.length; i++) {
				input = inputs[i];
				if(input.checked) {
					return input.value;
				}
			}
		}
		return "";
	},
	
	checkAll: function(inputCheck) {
		var form    = inputCheck.form;
		var inputs  = (form || document.body).getElementsByTagName("input");
		var pattern = new RegExp("^" + inputCheck.id + "\\b");
		
		for(var i=0; i<inputs.length; i++) {
			if(inputs[i].type.toLowerCase() == "checkbox" && pattern.test(inputs[i].name)) {
				inputs[i].checked = inputCheck.checked;
			}
		}
	},
	
	
	//deprecated
	isEmpty: function(value) {
		var oneChar;
		
		if(value == "" || value == null) return true;
		
		oneChar = value.charAt(0);
		if((oneChar == " ") || 
			 (oneChar == "\t") && 
			 (oneChar == "\n")) {
			return true;
		}
		
		return false;
	},
	
	
	numberOnly: function(event) {
 		var isNumber = true;
 		var charCode;
		
 		event = (event) ? event : window.event;
 		charCode = (event.which) ? event.which : event.keyCode;
		
		if(charCode > 31 && (charCode < 48 || charCode > 57)){
			isNumber = false;
		}
		
 		return isNumber;
	}
	
};
