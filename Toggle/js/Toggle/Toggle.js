/* 
 * Toggle.js
 * http://jscomponentes.googlecode.com/svn/trunk/Toggle/js/Toggle/Toggle.js
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Toggle
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Toggle = {

	show: function() {
		for(var i=0; i<arguments.length; i++) {
			$(arguments[i]).style.display = '';
		}
	},//fim show


	hide: function() {
		for(var i=0; i<arguments.length; i++) {
			$(arguments[i]).style.display = 'none';
		}
	},//fim hide
	
	
	showHide: function() {
		for(var i=0; i<arguments.length; i++) {
			var oElement = $(arguments[i]);
			
			if(typeof oElement == 'object') {
				oElement.style.display = (oElement.style.display != 'none') ? 'none' : '';
			}//fim if
			
		}//fim for
	},//fim hide

};//fim Toggle.js
