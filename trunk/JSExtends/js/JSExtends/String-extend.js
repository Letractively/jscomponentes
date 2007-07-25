/* 
 * String-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/String-extend.js
 * 
 * Extendendo o objeto String do javascript
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

//implementacao do metodo String.trim()
String.prototype.trim = function() {
	var sTrimString = this.ltrim();
	return sTrimString.rtrim();
}


//implementacao do metodo String.trim()
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, "");
}


//implementacao do metodo String.trim()
String.prototype.rtrim = function() {
	return this.replace(/\s+$/, "");
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

