/**
 * 
 * Extendendo o objeto Array do javascript
 * 
 * Array-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Array-extend.js
 *
 * @author: Edy Segura, edy@segura.pro.br
 *
 */

 
/**
 *
 * Verifica o valor maximo do Array
 * @author Edy Segura, edy@segura.pro.br
 *
 */
Array.prototype.max = function() {
	var max = this[0];
	
	for(var i=1; i<this.length; i++) {
		if(max < this[i]) max = this[i];
	}
	
	return max;
};


/**
 *
 * Verifica o valor minimo do Array
 * @author Moreno Mello, moreno@liveware.com.br
 *
 */
Array.prototype.min = function() {
	var min = this[0];
	
	for(var i=1; i<this.length; i++) {
		if(min > this[i]) min = this[i];
	}
	
	return min;
};


/**
 *
 * Verifica se o valor existe dentro do Array
 * @author Edy Segura, edy@segura.pro.br
 *
 */
Array.prototype.inArray = function(value) {
	var result = false;
	
	if(value) {
		for(var i=0; i<this.length; i++) {
			if(value == this[i]) {
				result = true;
				break;
			}
		}
	}
	
	return result;
};
