/**
 * 
 * Objeto Literal para teste do componente Cookie.js
 * @author Edy Segura, edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.setForm();
		Index.getCookie();
	},
	
	setForm: function() {
		var formId = 'frm-cookie',
		    form   = document.getElementById(formId);
		
		if(form) {
			form.onsubmit = Index.formSubmit;
			form.onreset = Index.formReset;
		}
		else {
			alert('Error: form#' + formId + ' não encontrado!');
		}
	},
	
	formSubmit: function() {
		var form = this, jsonString = '';
		
		jsonString += '{'
			+ 'nome:"'    + form.nome.value    + '",'
			+ 'email:"'	  + form.email.value   + '",'
			+ 'website:"' + form.website.value + '"'
		+ '}';
		
		Cookie.set('formData', jsonString, 365);
		alert('Cookie criado com sucesso!');
		return false;
	},
	
	formReset: function() {
		var form = this, element;
		
		for(var i = 0; i < form.elements.length; i++) {
			element = form.elements[i];
			if(element.type == 'text') {
				element.value = element.defaultValue = "";
			}
		}
		
		Cookie.unset('formData');
		alert('Cookie removido com sucesso!');
		return false;
	},
	
	getCookie: function() {
		var jsonString = Cookie.get('formData');
		if(jsonString) {
			Index.populateForm(eval('(' + jsonString + ')'));
		}
	},
	
	populateForm: function(formData) {
		var input;
		for(inputId in formData) {
			input = document.getElementById(inputId);
			if(input) {
				input.value = formData[inputId];
			}
		}
	}
	
}

//inicializacao
window.onload = Index.init;