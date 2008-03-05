/**
 * 
 * Extendendo o objeto String do javascript
 *
 * String-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/String-extend.js
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

 
/**
 *
 * Remove os espacos em brancos no 
 * inicio e final da string
 * @author Edy Segura
 *
 */
String.prototype.trim = function() {
	return (this.ltrim()).rtrim();
}


/**
 *
 * Remove os espacos em brancos no 
 * inicio da string
 * @author Edy Segura
 *
 */
String.prototype.ltrim = function() {
	return this.replace(/^\s*\n/, "");
}


/**
 *
 * Remove os espacos em brancos no 
 * final da string
 * @author Edy Segura
 *
 */
String.prototype.rtrim = function() {
	return this.replace(/\s*\n$/, "");
}


/**
 *
 * Verifica se o primeiro caractere da
 * string é vazia
 * @author Edy Segura
 *
 */
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


/**
 *
 * Validacao de email
 * @author Edy Segura
 *
 */
String.prototype.isEmail = function() {
	var sEmail = this;
	var rePattern = /^[a-zA-Z0-9_\.-]{2,}@([A-Za-z0-9_-]{2,}\.)+[A-Za-z]{2,4}$/;
	return rePattern.test(sEmail);
}

/**
 *
 * Validacao de CPF
 * http://jsfromhell.com/pt/string/is-cpf
 * @author Carlos R. L. Rodrigues
 *
 */
String.prototype.isCPF = function(){
	var c = this;
	if((c = c.replace(/[^\d]/g,"").split("")).length != 11) return false;
	if(new RegExp("^" + c[0] + "{11}$").test(c.join(""))) return false;
	for(var s = 10, n = 0, i = 0; s >= 2; n += c[i++] * s--);
	if(c[9] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
	for(var s = 11, n = 0, i = 0; s >= 2; n += c[i++] * s--);
	if(c[10] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
	return true;
};


/**
 *
 * Validacao de CNPJ
 * http://jsfromhell.com/pt/string/is-cpf
 * @author Carlos R. L. Rodrigues
 *
 */
String.prototype.isCNPJ = function(){
	var b = [6,5,4,3,2,9,8,7,6,5,4,3,2], c = this;
	if((c = c.replace(/[^\d]/g,"").split("")).length != 14) return false;
	for(var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
	if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
	for(var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
	if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
	return true;
};


/**
 *
 * Metodo para completar a string com valores especificos
 * exemplo:
 * 	alert(mes.pad(2, "0", String.PAD_LEFT)); // exibe "09"
 * 
 * http://forum.imasters.uol.com.br/index.php?showtopic=144107
 * @author Carlos R. L. Rodrigues
 *
 */
 
String.PAD_LEFT  = 0;
String.PAD_RIGHT = 1;
String.PAD_BOTH  = 2;

String.prototype.pad = function(size, pad, side) {
  var str = this, append = "", size = (size - str.length);
  var pad = ((pad != null) ? pad : " ");
	
  if((typeof size != "number") || ((typeof pad != "string") || (pad == ""))) {
    throw new Error("Wrong parameters for String.pad() method.");
  }
	
  if (side == String.PAD_BOTH) {
    str = str.pad((Math.floor(size / 2) + str.length), pad, String.PAD_LEFT);
    return str.pad((Math.ceil(size / 2) + str.length), pad, String.PAD_RIGHT);
  }
	
  while ((size -= pad.length) > 0) {
    append += pad;
  }
	
  append += pad.substr(0, (size + pad.length));
  return ((side == String.PAD_LEFT) ? append.concat(str) : str.concat(append));
}
