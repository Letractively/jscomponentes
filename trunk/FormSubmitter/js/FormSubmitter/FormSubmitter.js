/**
 *
 * FormSubmitter
 * Classe javascript para submitar o formulário via Ajax
 * 
 */
var FormSubmitter = {
	
	callbackSuccess: null,
	callbackError: null,
	
	init: function(form, callSuccess, callError) {
		FormSubmitter.setForm(form);
		FormSubmitter.callbackSuccess = callSuccess;
		FormSubmitter.callbackError   = callError;
	},
	
	setForm: function(form) {
		if(form) {
			form.onsubmit = FormSubmitter.submitListener;
		}
	},
	
	submitListener: function() {
		var form = this,
		    data = $j(form).serialize();

		$j.ajax({
		  type    : "POST",
		  url     : form.action,
		  data    : data,
		  success : FormSubmitter.responseListener,
		  error   : FormSubmitter.errorAjax
	 	});
	 		 
		return false;
	},
	
	errorAjax: function(xhr, errorMessage, errorThrows) {
		alert("Error: " + errorMessage + " " + errorThrows);
	},
	
	responseListener: function(response) {
		response = eval ("("+response+")");
		alert(response.message);
		if(response.status == "SUCCESS") {
			if(FormSubmitter.callbackSuccess) {
				FormSubmitter.callbackSuccess(response);
			}
			FormSubmitter.formFilterSubmit();
		}
		else if(response.status == "ERROR") {
			if(FormSubmitter.callbackError) {
				FormSubmitter.callbackError(response);
			}
		}
	},
	
	formFilterSubmit: function() {
		var formFiltro = document.getElementById('form-filtro');
		if(formFiltro && response.status == "SUCCESS") {
			formFiltro.submit();
		} 
		else {
			document.location.reload();
		}
	}
	
};