/* 
* JavaScript Document
* Autor: Edy Segura - infoedy@gmail.com
* Descri��o: Objeto crossbrowser para carregar xml
* Refer�ncia: http://www.w3schools.com/e4x/e4x_why.asp
*/

var XML = {
	
	load: function(sUrl, fnCallback) {
		var oXMLDocument;

		if(!sUrl || !fnCallback) {
			alert("Par�metros para XML.load() incompletos.");
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
			alert("Seu navegador n�o da suporte para o objeto XML");
		}

	}//fim load
	
};//fim XML

