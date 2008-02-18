/**
 * 
 * Objeto para parsear querystring, documentacao completa em: 
 * http://code.google.com/p/jscomponentes/wiki/QueryString
 * 
 * QueryString.js
 * http://jscomponentes.googlecode.com/svn/trunk/QueryString/js/lib/QueryString.js
 * @author Edy Segura - edy@segura.eti.br
 * 
 */

var QueryString = function(sURI) {
	
	//private
	var iStart, reKey, sUrl, 
	    aDados, aExpressao, sContent;
	
	//public
	this.isOK = false;
	
	sUrl = (sURI) ? sURI : document.location.toString();
	
	//expressão regular para pegar a posição do "?"
	reKey  = /\?/i;
	iStart = sUrl.search(reKey);
	
	//verificando se há parâmetros QueryString
	if(iStart > 1 && sUrl.substring(iStart + 1).search("=") > 1) {
		sUrl   = sUrl.substring(iStart + 1);
		aDados = sUrl.split("&");
		
		for(var i=0; i<aDados.length; i++) {
			aExpressao = aDados[i].split("=");
			
			//essa expressão regular é para substituir o sinal "+" por espaço
			sContent = decodeURIComponent(aExpressao[1].replace(/\+/g, " "));
			//remove os \r da string
			sContent = sContent.replace(/\r/g, "");
			//remove os \n da string
			sContent = sContent.replace(/\n/g, " ");
			
			try {
				eval("this." + aExpressao[0] + "=\"" + sContent + "\";");
			} 
			catch(oErr) { 
				alert([oErr.name, oErr.message].join("\n"));
			}

		}//fim for
		
		this.isOK = true;
	}//fim if

};//fim QueryString.js
