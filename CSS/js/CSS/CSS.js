/**
 *
 * Objeto Literal CSS. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/CSS
 *
 * CSS.js
 * http://jscomponentes.googlecode.com/svn/trunk/CSS/js/CSS/CSS.js
 * @author: Edy Segura - edy@segura.pro.br
 * 
 */
var CSS = {
	
	getComputed: function(element, cssProperty) {
		if(element.currentStyle) {
			cssProperty = CSS.formatPropertyCSS(cssProperty);
			return element.currentStyle[cssProperty];
		}
		else if(window.getComputedStyle) {
			var computedStyle = window.getComputedStyle(element, "");
			return computedStyle.getPropertyValue(cssProperty);
		}
		return false;
	},	
	
	formatPropertyCSS: function(cssProperty) {
		var formatPropertyCSS = '',
		    splitCssProperty  = cssProperty.split("-");
		
		if(splitCssProperty.length > 1) {
			formatPropertyCSS = splitCssProperty[0];
			
			for(var i=1; i<splitCssProperty.length; i++) {
				formatPropertyCSS += (splitCssProperty[i].charAt(0).toUpperCase() + 
															splitCssProperty[i].substr(1, splitCssProperty[i].length));
			}
		}
		else {
			formatPropertyCSS = splitCssProperty[0];
		}
		
		return formatPropertyCSS;
	},	
	
	addClass: function(element, className) {
		var rePattern = new RegExp("(^| )" + className + "( |$)");

		if(!rePattern.test(element.className)) {
			if(element.className == "")
				element.className = className;
			else
				element.className += " " + className;
		}
		return true;
	},	
	
	removeClass: function(element, className) {
		var removedClass = element.className,
		    rePattern = new RegExp("(^| )" + className + "( |$)");
		
		removedClass = removedClass.replace(rePattern, "$1");
		removedClass = removedClass.replace(/ $/, "");
		element.className = removedClass;
		
		return true;
	}
	
};
