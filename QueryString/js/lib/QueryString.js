/*
 * QueryString.js
 *
 * Script para pegar parametros/get da url
 * @author: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
 * 
 *            Instruções para uso do objeto
 * ------------------------------------------------------------
 * var oUrlParams = new QueryString("http://edysegura.com/?id=37");
 * var oUrlParams = new QueryString;
 * alert(oUrlParams.id);
 * 
 * ------------------------------------------------------------
 * 
 */

var QueryString = function() {
	
	//private
	var iStart, reKey, sUrl, 
	    aDados, aExpressao, sContent;
	
	//public
	this.isOK = false;
	
	sUrl = (QueryString.arguments[0]) ? QueryString.arguments[0] : document.location.toString();
	
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
};//fim QueryString

