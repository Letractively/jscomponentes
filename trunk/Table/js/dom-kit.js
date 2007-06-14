/* JavaScript Document
Autor: Edy Segura - infoedy@gmail.com
Descrição: DOM-Kit
Referência: Prototype - http://prototype.conio.net/
Referência: freeDOM   - http://www.metzen.com.br/freedom/
*/

//atalho document.getElementById()
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

