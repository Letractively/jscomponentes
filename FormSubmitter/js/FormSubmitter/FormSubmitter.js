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
			form.onsubmit = FormSubmitter.submitListener;
		}
	},
	
	
	submitListener: function() {
		var form = this,
		    data = $j(form).serialize();
		
		//for jquery.validate
		//if(!$j(form).validate().form()) return false;
		
		$j.ajax({
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
		try {
			response = eval ("(" + response + ")");
			alert(response.message);
		}
		catch(e) {
			response = {status:'ERROR', message: e.message};
		}
		
		if(response.status == "SUCCESS") {
			FormSubmitter.callForeignCallback (
				response,
				form,
				FormSubmitter.CALLBACK_SUCCESS
			);
		}
		else if(response.status == "ERROR") {
			FormSubmitter.callForeignCallback (
				response,
				form,
				FormSubmitter.CALLBACK_ERROR
			);
		}
	},
	
	
	callForeignCallback: function(response, form, callbackType) {
		var callbacks = FormSubmitter.callbacks,
		    params = [],
		    continueSubmit = true;
		
		for(var i in callbacks) {
			params = callbacks[i];
			
			if(params[0] === form && params[callbackType]) {
				continueSubmit = params[callbackType](response, form);
			}
		}
		
		if(continueSubmit) {
			FormSubmitter.formFilterSubmit();
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