/* 
 * String-extends.js
 * https://jscomponentes.googlecode.com/svn/trunk/JSExtends/String-extend/js/String-extend/String-extend.js
 * 
 * Extendendo o objeto String do javascript
 * @author: Edy Segura - infoedy@gmail.com
 *
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

