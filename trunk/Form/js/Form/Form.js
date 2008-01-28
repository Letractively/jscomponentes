/*
 * Form.js
 * http://jscomponentes.googlecode.com/svn/trunk/Form/js/Form/Form.js
 *
 * Objeto para manipulacao e edicao de formulario. 
 * A documentacao completa pode ser encontrada no endereco:
 * http://code.google.com/p/jscomponentes/wiki/Form
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Form = {
	
	//historico das modificacoes
	modifications: [],
	
	checkModifications: function(oForm) {
		var oInputModifications = $('modifications');
		var aElements = oForm.elements;
		
		if(oInputModifications) {
			for(var i=0; i<aElements.length; i++) {
				var oElement = aElements[i];
				
				if(oElement.disabled) continue;
				
				switch(oElement.type) {
					case 'text'      :
					case 'textarea'  :
						Form.checkModificationInput(oElement);
					break;
					case 'select-one':
						Form.checkModificationCombo(oElement);
					break;
				}//fim switch
			}//fim for
			
			oInputModifications.value = Form.modifications.join("<br />");
		}//fim if
		
		return true;
	},//fim checkModifications
	
	
	addModification: function(oElement, sNewValue, sOldValue) {
		var sMessage = "";
		
		sNewValue = (sNewValue) ? sNewValue : "vazio";
		sOldValue = (sOldValue) ? sOldValue : "vazio";
		
		if(sNewValue != sOldValue) {
			sMessage = oElement.title + ": De (" + sOldValue + ") para (" + sNewValue + ")";
			Form.modifications.push(sMessage);
		}
	
	},//fim addModification
	
	
	checkModificationInput: function(oElement) {
		Form.addModification(oElement, oElement.value, oElement.defaultValue);
	},//fim checkModificationInput
	
	
	checkModificationCombo: function(oElement) {
		var sNewValue = oElement[oElement.selectedIndex].text;
		var sOldValue = "";
		var aOptions  = oElement.options;
		
		for(var i=0; i<aOptions.length; i++) {
			if(aOptions[i].defaultSelected) {
				sOldValue = aOptions[i].text;
				break;
			}
		}
	
		Form.addModification(oElement, sNewValue, sOldValue);
	},//fim checkModificationCombo
 
 
	focusOnFirst: function() {
		if(document.forms.length > 0) {
			var oForm = document.forms[0];
			
			for(var i=0; i<oForm.elements.length; i++) {
				var oField = oForm.elements[i];
				
				if(typeof oField.type != "undefined" && oField.type != "hidden") {
					if(!oField.value) oField.focus();
					else continue;
					return;
				}
				
			}//fim for
		}//fim if
	},//fim focusOnFirst
	
	
	reset: function(oForm) {
		var oForm = (oForm) ? oForm : document.forms[0];
		
		if(oForm) {
			for(var i=0; i<oForm.elements.length; i++) {
				var oElement = oForm.elements[i];
				
				switch (oElement.type) {
					case 'text'    :
					case 'hidden'  :
					case 'password':
						
						if(oElement.name != "filtro") {
							oElement.value = "";
							oElement.defaultValue = "";
						}
						
					break;
				}//fim switch
			}//fim for
		}//fim if
		
		return true;
	},//fim reset
	
	
	validate: function(oForm) {
		var oRequired = oForm.required;
		
		if(oRequired) {
			var aElements = oRequired.value.split(",");
			return Form.eachElements(aElements);
		}//fim if
		else {
			return Form.eachElements(oForm.elements);
		}//fim else
		
	},//fim validate
	
	
	eachElements: function(aElements) {
		for(var i=0; i<aElements.length; i++) {
			var oElement = $(aElements[i]);
			
			if(oElement.disabled) continue;
			
			switch(oElement.type) {
				case 'text'      :
				case 'password'  :
				case 'textarea'  :
				case 'select-one':
					
					if(!Form.checkElement(oElement)) {
						return false;
					}

				break;
				
				case 'radio'   :
				case 'checkbox':

					continue; //Form.checkNodeListElement(oElement);

				break;
			
			}//fim switch
		}//fim for
		
		return true;
	},//fim eachElements
	
	
	checkElement: function(oElement) {
		try {
			
			if(Form.isEmpty(oElement.value)) {
				var sFieldName = (oElement.title) ? oElement.title : oElement.name;
				
				alert("O campo ( " + sFieldName + " ) é obrigatório.");
				oElement.focus();
				
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
	
	
	isEmpty: function(sValue) {
		var sCaractere;
		
		if(sValue == "" || sValue == null) return true;
		
		sCaractere = sValue.charAt(0);
		if((sCaractere == " ") || 
			 (sCaractere == "\t") && 
			 (sCaractere == "\n")) {
			return true;
		}
		
		return false;
	},//fim isEmpty
	
	
	isMail: function(sEmail) {
		//var rePattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		//var rePattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		
		var rePattern = /^[a-zA-Z0-9_\.-]{2,}@([A-Za-z0-9_-]{2,}\.)+[A-Za-z]{2,4}$/;
		return rePattern.test(sEmail);
		
	},//fim isMail
	
	
	tabForward: function(oField) {
		var oForm = oField.form;
		
		if(oForm.elements[oForm.elements.length-1] != oField && 
			 oField.value.length == oField.getAttribute("maxlength")) {
			
			for(var i=0; i<oForm.elements.length; i++) {
				if(oForm.elements[i] == oField) {
					for(var j=i+1; j<oForm.elements.length; j++) {
						var oElement = oForm.elements[j];

						if(typeof oElement.type != "undefined" && oElement.type != "hidden") {
							oForm.elements[j].focus();
							return;
						}
						
					}//fim do for
				}//fim do if
			}//fim do for
		}//fim do if
	},//fim tabForward
	
	
	getFormUrlEncodedValues: function(oForm) {
		var sParams = new String;
		var aParams = new Array;
		
		oForm = (typeof oForm == "string") ? $(oForm) : oForm;
		
		for(var i=0; i<oForm.elements.length; i++) {
			var oElement = oForm.elements[i];
			
			if(oElement.disabled) continue;
			if(oElement.name == "" || oElement.name == undefined) continue;
      if(oElement.type == "" || oElement.type == undefined) continue;
			
			switch(oElement.type) {

				case "text"       :
				case "textarea"   :
				case "password"   :
				case "hidden"     :
				case "select-one" :
					
					sParams = oElement.name + "=" + encodeURIComponent(oElement.value);
					if(sParams) aParams.push(sParams);
					
				break;

				case "select-multiple" :
					
					for(var j=0; j<oElement.options.length; j++) {
            sParams = (oElement.options[j].selected) ? oElement.name + "=" + encodeURIComponent(oElement.options[j].value) : "";
						if(sParams) aParams.push(sParams);
          }

				break;

				case "radio"    :
				case "checkbox" :

					sParams = (oElement.checked) ? oElement.name + "=" + encodeURIComponent(oElement.value) : "";
					if(sParams) aParams.push(sParams);

				break;
			}//fim switch
		}//fim do for

		return aParams.join("&");
	},//fim getValues
	
	
	populateFormFromJson: function(oForm, aValues) {
		var oNodeList;
		
		for(var sIndex in aValues) {
			var oElement = $(sIndex);
			
			if(oElement) {
				
				switch(oElement.type) {
					case "text"     :
					case "textarea" :
					case "hidden"   :
						oElement.value = aValues[sIndex];
					break;
					
					case "select-one" :
						Form.setComboValue(oElement, aValues[sIndex]);
					break;
					
					case "checkbox" :
						oElement.checked = (aValues[sIndex]) ? true : false;
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
			}//fim do if(oElement)
		}//fim do for
	
	},//fim populateForm
	
	
	setComboValue: function(oCombo, sValue) {
		for(var i=0; i<oCombo.options.length; i++) {
			if(oCombo.options[i].value == sValue) {
				oCombo.options[i].selected = true;
				return;
			}
		}//fim do for
	},//fim setComboValue
	
	
	/*
	 * requires object Event.js
	 */
	formatMoney: function(oInput, iFloatPoint, sDecimalSep, sThousandsSep) {
		oInput.floatPoint   = !isNaN(iFloatPoint) ? Math.abs(iFloatPoint) : 2;
		oInput.thousandsSep = typeof sThousandsSep != "string" ? "," : sThousandsSep, oInput.sDecimalSep = typeof sDecimalSep != "string" ? "." : sDecimalSep;
		
		Event.addEvent(oInput, "keypress", function(e) {
				if(e.key > 47 && e.key < 58) {
						var oInput, s, l = (s = ((oInput = this).value.replace(/^0+/g, "") + String.fromCharCode(e.key)).replace(/\D/g, "")).length, iFloatPoint;
						if(oInput.maxLength + 1 && l >= oInput.maxLength) return false;
						l <= (iFloatPoint = oInput.floatPoint) && (s = new Array(iFloatPoint - l + 2).join("0") + s);
						for(var i = (l = (s = s.split("")).length) - iFloatPoint; (i -= 3) > 0; s[i - 1] += oInput.sDecimalSep);
						iFloatPoint && iFloatPoint < l && (s[l - ++iFloatPoint] += oInput.thousandsSep);
						oInput.value = s.join("");
				}
				e.key > 30 && e.preventDefault();
		});
		
	},//fim formatMoney
	
	
	checkAll: function(oInputCheck) {
		var oForm = oInputCheck.form;
		var aInputs = (oForm || document.body).getElementsByTagName('input');
		var rePattern = new RegExp("^" + oInputCheck.id + "\\b");
		
		for(var i=0; i<aInputs.length; i++) {
			if(aInputs[i].type.toLowerCase() == "checkbox" && rePattern.test(aInputs[i].name)) {
				aInputs[i].checked = oInputCheck.checked;
			}
		}
		
	}//fim checkAll
	
};//fim Form.js
