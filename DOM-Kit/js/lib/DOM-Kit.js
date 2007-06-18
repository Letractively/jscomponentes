/*
 * DOM-Kit.js
 * http://jscomponentes.googlecode.com/svn/trunk/DOM-Kit/
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


/*
 * Atalho para o metodo document.getElementsByTagName()
 * @name: $tags(sTagName, oParentNode)
 * @param: sTagName => String
 * @param: oParentNode => Node Object (optional)
 * @return: Array of Node Objects
 */
function $tags(sTagName, oParentNode) {
	return ($(oParentNode) || document).getElementsByTagName(sTagName);
}//fim $tags


/*
 * Retorna um array de objetos contendo a classe especificada
 * @param: sClassName => String
 * @param: oParentNode => Node Object (optional)
 * @return: Array of Node Objects
 */
function $tagsByClassName(sClassName, oParentNode) {
	var aAllElements = ($(oParentNode) || document.body).getElementsByTagName('*');
	var aElements    = new Array;
	var rePattern    = new RegExp("(^|\\s)" + sClassName + "(\\s|$)");
	
	for(var i=0; i<aAllElements.length; i++) {
		if(rePattern.test(aAllElements[i].className)) {
			aElements.push(aAllElements[i]);
		}
	}//fim for
	
	return aElements;
}//fim getElementsByClassName


/*
 * Retorna um array de objetos contendo o atributo e
 * valor especificado
 * @param: sAttribute => String
 * @param: sAttributeValue => String
 * @param: oParentNode => Node Object (optional)
 * @return: Array of Node Objects
 */
function $tagsByAttribute(sAttribute, sAttributeValue, oParentNode) {
	var aAllElements = ($(oParentNode) || document).getElementsByTagName('*');
	var aElements    = new Array;
	
	for(var i=0; i<aAllElements.length; i++) {
		if(sAttribute == "class") {
			var rePattern = new RegExp("(^|\\s)" + sAttributeValue + "(\\s|$)");
			
				if(rePattern.test(aAllElements[i].className)) {
					aElements.push(aAllElements[i]);
				}

		}//fim if
		else if(sAttribute == "for") {
			if(aAllElements[i].getAttribute("htmlFor") || aAllElements[i].getAttribute("for")) {
				
				if(aAllElements[i].htmlFor == sAttributeValue) {
					aElements.push(aAllElements[i]);
				}
				
			}//fim if
		}//fim elseif
		else if(aAllElements[i].getAttribute(sAttribute) == sAttributeValue) {
			
			aElements.push(aAllElements[i]);
		
		}//fim elseif
	}//fim for
	
	return aElements;
}//fim getElementsByAttribute


/*
 * Busca o offsetParent especificado em sTagName
 * @param: oElementNode => Node Object
 * @param: sTagName => String
 * @return: Node Object
 */
function $getParentByTagName(oElementNode, sTagName) {
	sTagName = sTagName.toLowerCase();
	
	for(
		oElementNode = oElementNode.parentNode;
		(
			oElementNode && (			
				(oElementNode.tagName && (oElementNode.tagName.toLowerCase() != sTagName)) ||
				(!oElementNode.tagName && (oElementNode.nodeType != 3)) 
			)
		);
		oElementNode = oElementNode.parentNode){}

	return oElementNode;
}


/*
 * Atalho para o metodo document.createElement();
 * @param: sElement => String
 * @return: Node Object
 */
function $create(sElement) {
	var oElement = document.createElement(sElement);
	
	if(typeof oElement == 'object' && arguments.length > 1) {
		for(var i=1; i<arguments.length; i++) {
			var aAttribute = arguments[i].split(":");
			
			if(aAttribute.length == 2) {
				oElement[aAttribute[0]] = aAttribute[1];
			}
			
		}//fim for
	}//fim if
	
	return oElement;
}//fim $create


/*
 * Método para inserir oNewElement antes de oElement
 * @param: oNewElement => Node Object
 * @param: oElement => Node Object
 * @return: boolean
 */
function $before(oNewElement, oElement) { 
	return oElement.parentNode.insertBefore(oNewElement, oElement);
}//fim $before


/*
 * Método para inserir oNewElement depois de oElement
 * @param: oNewElement => Node Object
 * @param: oElement => Node Object
 * @return: boolean
 */
function $after(oNewElement, oElement) { 
	return oElement.parentNode.insertBefore(oNewElement, oElement.nextSibling);
}//after


/*
 * Método para substituir oNewElement por oOldElement
 * @param: oNewElement => Node Object
 * @param: oOldElement => Node Object
 * @return: boolean
 */
function $replace(oNewElement, oOldElement) {
	if(oOldElement.parentNode) {
		return oOldElement.parentNode.replaceChild(oNewElement, oOldElement);
	}
	else {
		return false;
	}
}//fim $replace


/*
 * Método para remover o elemento especificado em sElementId
 * @param: sElementId => String or Node Object
 */
function $remove() {
	for(var i=0; i<arguments.length; i++) {
		var oElement = $(arguments[i]);
		
		if(oElement) {
			oElement.parentNode.removeChild(oElement);
		}
	
	}//fim for
}//fim $remove

