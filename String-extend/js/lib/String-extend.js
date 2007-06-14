/* JavaScript Document
Autor: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
Descri��o: Extendendo o objeto String do javascript.
*/

//implementa��o do m�todo String.trim()
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/, "");
}


//implementa��o do m�todo String.isEmpty()
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


//implementa��o do m�todo String.isEmail()
String.prototype.isEmail = function() {
	var sEmail = this;
	var rePattern = /^[a-zA-Z0-9_\.-]{2,}@([A-Za-z0-9_-]{2,}\.)+[A-Za-z]{2,4}$/;
	return rePattern.test(sEmail);
}

