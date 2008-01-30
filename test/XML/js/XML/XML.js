/* 
 * XML.js
 * http://jscomponentes.googlecode.com/svn/trunk/XML/js/XML/XML.js
 * 
 * Objeto Literal XML. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/XML
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var XML = {
	
	load: function(sUrl, fnCallback) {
		var oXMLDocument;

		if(!sUrl || !fnCallback) {
			alert("Parâmetros para XML.load() incompletos.");
			return false;
		}

		//load xml para o IE
		if(window.ActiveXObject) {
			oXMLDocument = new ActiveXObject("Microsoft.XMLDOM")
			oXMLDocument.async = false;
			oXMLDocument.load(sUrl);
			
			fnCallback(oXMLDocument);
		}

		//load xml para os outros navegadores
		else if(document.implementation && document.implementation.createDocument) {
			oXMLDocument = document.implementation.createDocument("", "", null);
			oXMLDocument.load(sUrl);

			oXMLDocument.onload = function() {
				fnCallback(this);
			};

		}
		else {
			throw new Error("Seu navegador não da suporte para o objeto literal XML");
		}

	}//fim load

};//fim XML.js
