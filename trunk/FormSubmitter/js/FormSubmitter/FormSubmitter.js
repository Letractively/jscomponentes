/**
 *
 * FormSubmitter
 * Classe javascript para submitar o formulário via Ajax
 *
 */
var FormSubmitter = {
	
	CALLBACK_SUCCESS: 1,
	CALLBACK_ERROR: 2,
	
	callbacks: [],
	
	init: function(form, callSuccess, callError) {
		if(form && (callSuccess || callError)) {
			FormSubmitter.callbacks.push([form, callSuccess, callError]);
		}
		FormSubmitter.setForm(form);
	},
	
	
	setForm: function(form) {
		if(form) {
			form.onsubmit = function() {
				FormSubmitter.submitListener(this);
				return false;
			};
		}
	},
	
	
	submitListener: function(form) {
		//for jQuery
		//jQuery(form).validate({submitHandler: function(){}});
		//if(!jQuery(form).valid()) return false;
		
		var data = jQuery(form).serialize();
		
		jQuery.ajax({
		  type    : "POST",
		  url     : form.action,
		  data    : data,
		  error   : FormSubmitter.errorAjax,
		  success : function(data){
		  	FormSubmitter.responseListener(data, form);
		  }
	 	});
	 	
		return false;
	},
	
	
	errorAjax: function(xhr, errorMessage, errorThrows) {
		alert("Error: " + errorMessage + " " + errorThrows);
	},
	
	
	responseListener: function(response, form) {
		var callbackType = 0;
		
		try {
			response = eval ("(" + response + ")");
			alert(response.message);
		}
		catch(e) {
			response = {status:'ERROR', message: e.message};
		}
		
		if(response.status == "SUCCESS") {
			callbackType = FormSubmitter.CALLBACK_SUCCESS
		}
		else if(response.status == "ERROR") {
			callbackType = FormSubmitter.CALLBACK_ERROR
		}
		
		FormSubmitter.callForeignCallback (
			response,
			form,
			callbackType
		);
			
		return false;
	},
	
	
	callForeignCallback: function(response, form, callbackType) {
		var callbacks = FormSubmitter.callbacks,
		    params = [],
		    continueSubmit = true;
		
		for(var i in callbacks) {
			params = callbacks[i];
			
			if(params[0] == form && params[callbackType]) {
				continueSubmit = params[callbackType](response, form);
			}
		}
		
		if(continueSubmit) {
			FormSubmitter.formFilterSubmit(response, form);
		}
	},
	
	
	formFilterSubmit: function(response, form) {
		var formFiltro = document.getElementById('form-filtro');
		if(formFiltro && response.status == "SUCCESS") {
			formFiltro.submit();
		}
		else {
			document.location.reload();
		}
	}
	
};