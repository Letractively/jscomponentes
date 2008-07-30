/**
 *
 * DOM-Kit e' um conjunto de funcoes para simplificacao
 * do uso da API do DOM. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/DOMKit
 *
 * DOM-Kit.js
 * http://jscomponentes.googlecode.com/svn/trunk/DOM-Kit/js/DOM-Kit/DOM-Kit.js
 * @author: Edy Segura, edy@segura.pro.br
 *
 */


/**
 *
 * Atalho para o metodo document.getElementById()
 * @param: elementId => String
 * @return: Node Object, Array of Node Objects
 *
 */
function $() {
 	var elements = [];

	for(var i=0; i<arguments.length; i++) {
		var element = arguments[i];
		
		element = (typeof element == "string") ? 
		document.getElementById(element) : element;
		
		if(arguments.length == 1) return element;
		elements.push(element);
	}
	
	return elements;
}


/**
 *
 * Atalho para o metodo document.getElementsByTagName()
 * @name: $tags(tagName, parentNode)
 * @param: tagName => String
 * @param: parentNode => Node Object (optional)
 * @return: Array of Node Objects
 *
 */
function $getByTag(tagName, parentNode) {
	return ($(parentNode) || document).getElementsByTagName(tagName);
}

//deprecated
function $tags(tagName, parentNode) {
	return $getByTag(tagName, parentNode)
}

/**
 * 
 * Retorna um array de objetos contendo a classe especificada
 * @param: className => String
 * @param: parentNode => Node Object (optional)
 * @return: Array of Node Objects
 *
 */
function $getByClass(className, parentNode) {
	var allElements = ($(parentNode) || document.body).getElementsByTagName("*");
	var elements    = new Array;
	var rePattern   = new RegExp("(^|\\s)" + className + "(\\s|$)");
	
	for(var i=0; i<allElements.length; i++) {
		if(rePattern.test(allElements[i].className)) {
			elements.push(allElements[i]);
		}
	}
	
	return elements;
}

//deprecated
function $tagsByClassName(className, parentNode) {
	return $getByClass(className, parentNode);
}


/**
 *
 * Retorna um array de objetos contendo o atributo e
 * valor especificado
 * @param: attributeName => String
 * @param: attributeValue => String
 * @param: parentNode => Node Object (optional)
 * @param: tagName => String (optional)
 * @return: Array of Node Objects
 *
 */
function $getByAttribute(attributeName, attributeValue, parentNode, tagName) {
	var allElements = ($(parentNode) || document).getElementsByTagName((tagName || "*"));
	var elements    = [];
	
	for(var i=0; i<allElements.length; i++) {
		if(attributeName == "class") {
			var rePattern = new RegExp("(^|\\s)" + attributeValue + "(\\s|$)");
			
			if(rePattern.test(allElements[i].className)) {
				elements.push(allElements[i]);
			}
			
		}
		else if(attributeName == "for") {
			if(allElements[i].getAttribute("htmlFor") || allElements[i].getAttribute("for")) {
				
				if(allElements[i].htmlFor == attributeValue) {
					elements.push(allElements[i]);
				}
				
			}
		}
		else if(allElements[i].getAttribute(attributeName) == attributeValue) {
			elements.push(allElements[i]);
		}
	}
	
	return elements;
}

//deprecated
function $tagsByAttribute(attributeName, attributeValue, parentNode, tagName) {
	return $getByAttribute(attributeName, attributeValue, parentNode, tagName);
}


/**
 *
 * Busca o offsetParent especificado em tagName
 * @param: element => Node Object
 * @param: tagName => String
 * @return: Node Object
 *
 */
function $getOffsetParent(element, tagName) {
	element = $(element);
	tagName = tagName.toLowerCase();
	
	for(
		element = element.parentNode;
		(
			element && (			
				(element.tagName && (element.tagName.toLowerCase() != tagName)) ||
				(!element.tagName && (element.nodeType != 3)) 
			)
		);
		element = element.parentNode){}

	return element;
}

//deprecated
function $getParentByTagName(element, tagName) {
	return $getOffsetParent(element, tagName);
}

/**
 *
 * Atalho para o metodo document.createElement();
 * @param: elementName => String
 * @return: Node Object
 *
 */
function $create(elementName) {
	var element = document.createElement(elementName);
	
	if(typeof element == 'object' && arguments.length > 1) {
		for(var i=1; i<arguments.length; i++) {
			var attribute = arguments[i].split(":");
			
			if(attribute.length == 2) {
				element[attribute[0]] = attribute[1];
			}
			
		}
	}
	
	return element;
}


/**
 *
 * Metodo para inserir newElement antes de element
 * @param: newElement => Node Object
 * @param: element => Node Object
 * @return: boolean
 *
 */
function $insertBefore(newElement, element) { 
	try {
		return element.parentNode.insertBefore(newElement, element);
	}
	catch(e) {
		if(console && console.info) console.info("Error: " + e.message);
		return false;
	}
}

//deprecated
function $before(newElement, element) { 
	return $insertBefore(newElement, element);
}

/**
 *
 * Metodo para inserir newElement depois de element
 * @param: newElement => Node Object
 * @param: element => Node Object
 * @return: boolean
 *
 */
function $insertAfter(newElement, element) { 
	try {
		return element.parentNode.insertBefore(newElement, element.nextSibling);
	}
	catch(e) {
		if(console && console.info) console.info("Error: " + e.message);
		return false;
	}
}

//deprecated
function $after(newElement, element) {
	return $insertAfter(newElement, element);
}

/**
 *
 * Método para substituir newElement por oldElement
 * @param: newElement => Node Object
 * @param: oldElement => Node Object
 * @return: boolean
 *
 */
function $replace(newElement, oldElement) {
	if(oldElement.parentNode) {
		return oldElement.parentNode.replaceChild(newElement, oldElement);
	}
	else {
		return false;
	}
}


/**
 *
 * Metodo para remover elemento(s)
 * @param: elementId => String or Node Object
 *
 */
function $remove() {
	for(var i=0; i<arguments.length; i++) {
		var element = $(arguments[i]);
		
		if(element && element.parentNode) {
			element.parentNode.removeChild(element);
		}
		
	}
}
