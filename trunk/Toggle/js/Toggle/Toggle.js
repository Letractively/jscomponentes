/* 
 * Toggle.js
 * http://jscomponentes.googlecode.com/svn/trunk/Toggle/js/Toggle/Toggle.js
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Toggle
 *
 * Referencia  : http://www.dustindiaz.com/seven-togglers/ 
 * Dependencia : function $()
 *   
 * @author: Edy Segura - infoedy@gmail.com
 *
 *           Instrucoes para uso do objeto
 * ------------------------------------------------------------
 *
 * //exibir elementos
 * Toggle.show (
 * 	'Elemento1',
 * 	'Elemento2',
 * 	oElemento3
 * );
 *  
 * //esconder elementos
 * Toggle.hide (
 * 	'Elemento1',
 * 	'Elemento2',
 * 	oElemento3
 * );
 *  
 * //esconder ou exibir elementos
 * Toggle.showHide (
 * 	'Elemento1',
 * 	'Elemento2',
 *  	oElemento3
 * );
 * 
 * ------------------------------------------------------------
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
