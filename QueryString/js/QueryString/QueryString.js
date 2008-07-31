/**
 * 
 * Objeto para parsear querystring, documentacao completa em: 
 * http://code.google.com/p/jscomponentes/wiki/QueryString
 * 
 * QueryString.js
 * http://jscomponentes.googlecode.com/svn/trunk/QueryString/js/lib/QueryString.js
 * @author Edy Segura - edy@segura.pro.br
 * 
 */

var QueryString = function(url) {
	
	//private
	var start, key, data, name, value;
	
	//public
	this.isOK = false;
	
	url = (url) ? url : document.location.toString();
	
	//expressão regular para pegar a posição do "?"
	key  = /\?/i;
	start = url.search(key);
	
	if(start > 1 && url.substring(start + 1).search("=") > 1) {
		url  = url.substring(start + 1);
		data = url.split("&");
		
		for(var i=0; i<data.length; i++) {
			name = data[i].split("=");
			
			//essa expressão regular é para substituir o sinal "+" por espaço
			value = decodeURIComponent(name[1].replace(/\+/g, " "));
			//remove os \r da string
			value = value.replace(/\r/g, "");
			//remove os \n da string
			value = value.replace(/\n/g, " ");
			
			try {
				eval("this." + name[0] + "=\"" + value + "\";");
			} 
			catch(oErr) { 
				alert([oErr.name, oErr.message].join("\n"));
			}
		}
		
		this.isOK = true;
	}
};
