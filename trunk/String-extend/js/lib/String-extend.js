/* JavaScript Document
Autor: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
Descrição: Extendendo o objeto String do javascript.
*/

//implementação do método String.trim()
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/, "");
}


//implementação do método String.isEmpty()
String.prototype.isEmpty = function() {
	var sCaractere;
	var sValue = this;
	
	if(sValue == "" || sValue == null) return true;
	
	sCaractere = sValue.charAt(0);
	
	if((sCaractere == " ") || 
		 (sCaractere == "\t") && 
		 (sCaractere == "\n")) {
		return true;
	}
	
	return false;
}


//implementação do método String.isEmail()
String.prototype.isEmail = function() {
	var sEmail = this;
	var rePattern = /^[a-zA-Z0-9_\.-]{2,}@([A-Za-z0-9_-]{2,}\.)+[A-Za-z]{2,4}$/;
	return rePattern.test(sEmail);
}

