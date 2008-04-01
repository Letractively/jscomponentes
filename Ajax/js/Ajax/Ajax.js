/**
 *
 * Objeto literal Ajax. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Ajax
 *
 * Ajax.js
 * http://jscomponentes.googlecode.com/svn/trunk/Ajax/js/Ajax/Ajax.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Ajax = {

	loading: null,
	
	createXmlHttp: function() {
		var xmlHttp;
		
		//instanciando o objeto XMLHttpRequest
		try {
			xmlHttp = new XMLHttpRequest();
		}
		catch(e1) {
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e2) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e3) {
					xmlHttp = false; 
				}
			}
		}
		
		return xmlHttp;
	},
	
	
	createLoading: function() {
		var oLoading = document.createElement('p');
				
		oLoading.className = "loading";
		oLoading.innerHTML = "Carregando...";
		document.body.appendChild(oLoading);
		
		Ajax.loading = oLoading;
	},//fim createDivLoading
	
	
	removeLoading: function() {
		if(Ajax.loading) {
			Ajax.loading.parentNode.removeChild(Ajax.loading);
			Ajax.loading = null;
		}
	},
	

	addRequest: function(params) {
	},
	
	
	//old alias (deprecated)
	run: function(params) {
		Ajax.request(params);
	},
	

	request: function(params) {
		var xmlHttp = Ajax.createXmlHttp();
		
		if(xmlHttp) {
			var method = (params.method) ? params.method : "GET";
			var async  = (typeof params.async == 'boolean') ? params.async : true;
			if(params.loading) Ajax.createLoading();
			
			xmlHttp.open(method, params.url, async);
			xmlHttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
			xmlHttp.setRequestHeader("Pragma", "no-cache");
			
			if(method.toUpperCase() == "POST") {
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			
			if(params.response == "xml" && xmlHttp.overrideMimeType) {
				xmlHttp.overrideMimeType('text/xml');
			}
			
			xmlHttp.onreadystatechange = function() {
				if(xmlHttp.readyState == 4) {
					if(xmlHttp.status == 200 || params.update) {
						
						if(params.callback) {
							params.callback((params.response == "xml") ? xmlHttp.responseXML : xmlHttp.responseText, 
															 (params.params) ? params.params : 0);
						}
						
						if(params.loading) Ajax.removeLoading();
					}
					else {
						
						if(params.callerro) {
							params.callerro(xmlHttp.status, xmlHttp.statusText, 
															 (params.params) ? params.params : 0);
						}
						else {
							var message = new String;
							
							message += "HTTP Status: " + xmlHttp.status + "\n";
							message += "Message: ";
							message += (xmlHttp.statusText) ? xmlHttp.statusText : "Unknown";
							
							alert(message);
						}
						
						if(params.loading) Ajax.removeLoading();
					}
				}
			};
			
			xmlHttp.send((params.send) ? params.send : null);
			delete xmlHttp;
		}
		else {
			alert("Sem suporte ao objeto XMLHttpRequest");
		}
	}

};