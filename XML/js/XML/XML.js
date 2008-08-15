/**
 * 
 * Objeto Literal XML. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/XML
 *
 * XML.js
 * http://jscomponentes.googlecode.com/svn/trunk/XML/js/XML/XML.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var XML = {
	
	load: function(url, callback) {
		var xml;
		
		if(!url || !callback) {
			throw new Error("Parâmetros incorretos.");
			return false;
		}
		
		if(window.ActiveXObject) {
			//load xml para o IE
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = false;
			xml.load(url);
			callback(xml);
		}
		else if(document.implementation && document.implementation.createDocument) {
			//load xml para os outros navegadores
			xml = document.implementation.createDocument("", "", null);
			xml.load(url);
			
			xml.onload = function() {
				callback(this);
			};
		}
		else {
			throw new Error("Sem suporte ao objeto XML.");
		}
	}

};
