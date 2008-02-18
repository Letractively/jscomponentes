/** 
 *
 * Objeto Literal DOMStorage para armazenamento de dados no cliente. 
 * Documentação completa pode ser consultada em:
 * http://code.google.com/p/jscomponentes/wiki/DOMStorage
 *
 * DOMStorage.js
 * http://jscomponentes.googlecode.com/svn/trunk/DOMStorage/js/DOMStorage/DOMStorage.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var DOMStorage = {

	ensureStorage: function() {
		if(DOMStorage.storage != null) return;
		var oStorage;

		if(window.ActiveXObject) {
			oStorage = document.createElement("span");
			oStorage.style.behavior = "url(#default#userData)";

			if(document.body) document.body.appendChild(oStorage);
			else throw new Error("DOMStorage para IE funciona somente depois do carregamento do DOM.");

			oStorage.load("DOMStorage");
		}
		else {
			var sHostName = document.location.hostname;
			
			if(sHostName == "localhost") {
				document.location.href = document.location.href.replace(/localhost/, "127.0.0.1");
			}
			else if(!sHostName) {
				throw new Error("DOMStorage para FF funciona somente em um servidor de páginas.");
			}
			
			oStorage = globalStorage[(sHostName) ? sHostName : ""];
		}

		DOMStorage.storage = oStorage;
	},//fim ensureStorage
	

	set: function(sName, sValue) {
		DOMStorage.ensureStorage();

		if(window.ActiveXObject) {
			DOMStorage.storage.setAttribute(sName, sValue);
			DOMStorage.storage.save("DOMStorage");
		}
		else {
			DOMStorage.storage[sName] = sValue;
		}
		
	},//fim set


	get: function(sName, sDefaultValue) {
		DOMStorage.ensureStorage();

		var sResult = (window.ActiveXObject)
			? DOMStorage.storage.getAttribute(sName)
			: DOMStorage.storage[sName]
		;

		return sResult || sDefaultValue;
	}//fim get
	
};//fim DOMStorage.js
