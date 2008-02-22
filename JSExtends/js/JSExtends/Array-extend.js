/**
 * 
 * Extendendo o objeto Array do javascript
 * 
 * Array-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Array-extend.js
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

 
/**
 *
 * Verifica o valor maximo do Array
 * @author Edy Segura
 *
 */
Array.prototype.max = function() {
	var iMax = this[0];
	
	for(var i=1; i<this.length; i++) {
		if(iMax < this[i]) iMax = this[i];
	}
	
	return iMax;
};


/**
 *
 * Verifica o valor existe dentro do Array
 * @author Edy Segura
 *
 */
Array.prototype.inArray = function(value) {
	var bResult = false;
	
	if(value) {
		for(var i=0; i<this.length; i++) {
			if(value == this[i]) {
				bResult = true;
				break;
			}
		}
	}
	
	return bResult;
};
