/* 
 * Array-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Array-extend.js
 * 
 * Extendendo o objeto Array do javascript
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

//implementacao do metodo Array.max()
Array.prototype.max = function() {
	var iMax = this[0];
	
	for(var i=1; i<this.length; i++) {
		if(iMax < this[i]) iMax = this[i];
	}
	
	return iMax;
}
