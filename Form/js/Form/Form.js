/**
 *
 * Objeto para manipulacao e edicao de formulario. 
 * A documentacao completa pode ser encontrada no endereco:
 * http://code.google.com/p/jscomponentes/wiki/Form
 *
 * Form.js
 * http://jscomponentes.googlecode.com/svn/trunk/Form/js/Form/Form.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Form = {
	
	//historico das modificacoes
	modifications: [],
	
	checkModifications: function(form) {
		var oInputModifications = $('modifications');
		var aElements = form.elements;
		
		//inicializacao
		Form.modifications = [];
		
		if(oInputModifications) {
			for(var i=0; i<aElements.length; i++) {
				var element = aElements[i];
				
				if(element.disabled) continue;
				
				switch(element.type) {
					case 'text'      :
					case 'textarea'  :
						Form.checkModificationInput(element);
					break;
					case 'select-one':
						Form.checkModificationCombo(element);
					break;
				}//fim switch
			}//fim for
			
			oInputModifications.value = Form.modifications.join("<br />");
		}//fim if
		
		return true;
	},//fim checkModifications
	
	
	addModification: function(element, sNewValue, sOldValue) {
		var sMessage = "";
		
		sNewValue = (sNewValue) ? sNewValue : "vazio";
		sOldValue = (sOldValue) ? sOldValue : "vazio";
		
		if(sNewValue != sOldValue) {
			sMessage = element.title + ": De (" + sOldValue + ") para (" + sNewValue + ")";
			Form.modifications.push(sMessage);
		}
	
	},//fim addModification
	
	
	checkModificationInput: function(element) {
		Form.addModification(element, element.value, element.defaultValue);
	},//fim checkModificationInput
	
	
	checkModificationCombo: function(element) {
		var sNewValue = element[element.selectedIndex].text;
		var sOldValue = "";
		var aOptions  = element.options;
		
		for(var i=0; i<aOptions.length; i++) {
			if(aOptions[i].defaultSelected) {
				sOldValue = aOptions[i].text;
				break;
			}
		}
		
		Form.addModification(element, sNewValue, sOldValue);
	},
 
 
	focusOnFirst: function() {
		if(document.forms.length > 0) {
			var form = document.forms[0];
			
			for(var i=0; i<form.elements.length; i++) {
				var field = form.elements[i];
				
				if(typeof field.type != "undefined" && field.type != "hidden") {
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
	},//fim reset
	
	
	validate: function(form) {
		var oRequired = form.required;
		
		if(oRequired) {
			var aElements = oRequired.value.split(",");
			return Form.eachElements(aElements);
		}//fim if
		else {
			return Form.eachElements(form.elements);
		}//fim else
		
	},//fim validate
	
	
	eachElements: function(aElements) {
		for(var i=0; i<aElements.length; i++) {
			var element = $(aElements[i]);
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
			
			}//fim switch
		}//fim for
		
		return true;
	},//fim eachElements
	
	
	checkElement: function(element) {
		try {
			
			if(Form.isEmpty(element.value)) {
				var sFieldName = (element.title) ? element.title : element.name;
				
				alert("O campo ( " + sFieldName + " ) é obrigatório.");
				element.focus();
				
				return false;

			}//fim if
		}
		catch(oErr) {
			
			alert([oErr.name, oErr.message].join("\n"));
			return false;
			
		}//fim try catch
		
		return true;
	},//fim checkElement
	
	
	checkNodeListElement: function(oNodeList) {
	},//fim checkNodeListElement
	
	
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
						
					}//fim do for
				}//fim do if
			}//fim do for
		}//fim do if
	},//fim tabForward
	
	
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
			}//fim switch
		}//fim do for

		return aParams.join("&");
	},//fim getValues
	
	
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
					
				}//fim do for
			}//fim do if(element)
		}//fim do for
	
	},//fim populateForm
	
	
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
	}
	
};
