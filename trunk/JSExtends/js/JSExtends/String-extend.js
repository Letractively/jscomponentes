/**
 * 
 * Extendendo o objeto String do javascript
 *
 * String-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/String-extend.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

//implementacao do metodo String.trim()
String.prototype.trim = function() {
	return (this.ltrim()).rtrim();
}


//implementacao do metodo String.trim()
String.prototype.ltrim = function() {
	return this.replace(/^\s*\n/, "");
}


//implementacao do metodo String.trim()
String.prototype.rtrim = function() {
	return this.replace(/\s*\n$/, "");
}


//implementacao do metodo String.isEmpty()
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


//implementacao do metodo String.isEmail()
String.prototype.isEmail = function() {
	var sEmail = this;
	var rePattern = /^[a-zA-Z0-9_\.-]{2,}@([A-Za-z0-9_-]{2,}\.)+[A-Za-z]{2,4}$/;
	return rePattern.test(sEmail);
}

