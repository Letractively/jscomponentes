/*
 * DOM-Kit.js
 * http://jscomponentes.googlecode.com/svn/trunk/DOM-Kit/js/DOM-Kit/DOM-Kit.js
 *
 * DOM-Kit e' um conjunto de funcoes para simplificacao
 * do uso da API do DOM - Document Object Model.
 * http://jscomponentes.googlecode.com/svn/trunk/DOM-Kit/
 * 
 * @author: Edy Segura, infoedy@gmail.com
 * Referencia: Prototype - http://www.prototypejs.org/
 * Referencia: freeDOM   - http://www.metzen.com.br/freedom/
 *
 */


/*
 * Atalho para o metodo document.getElementById()
 * @param: sElementId => String
 * @return: Node Object, Array of Node Objects
 */
function $() {
 	var aElements = new Array;

	for(var i=0; i<arguments.length; i++) {
		var vElement = arguments[i];

		vElement = (typeof vElement == 'string') ? 
		            document.getElementById(vElement) : vElement;

		if(arguments.length == 1) return vElement;
		aElements.push(vElement);
	}
	
	return aElements;
}//fim $
