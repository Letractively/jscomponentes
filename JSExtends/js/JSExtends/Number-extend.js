/** 
 * 
 * Extendendo o objeto Number do javascript
 *
 * Number-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Number-extend.js
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

/**
 *
 * Verifica se o numero e um inteiro
 * @author Edy Segura
 *
 */
Number.prototype.isInt = function() {
 var iValue = parseInt(this);
 if(isNaN(iValue)) return false;
 return (this == iValue && this.toString() == iValue.toString());
}
