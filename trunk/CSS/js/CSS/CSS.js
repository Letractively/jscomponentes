/* 
 * CSS.js
 * http://jscomponentes.googlecode.com/svn/trunk/CSS/js/CSS/CSS.js
 *
 * Objeto Literal CSS. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/CSS
 *
 * @author: Edy Segura - infoedy@gmail.com
 * 
 */

var CSS = {
	
	getComputed: function(vElement, sCssProperty) {
		var oElement = $(vElement);
		
		if(oElement.currentStyle) {
			sCssProperty = CSS.formatPropertyCSS(sCssProperty);
			return oElement.currentStyle[sCssProperty];
		}
		else if(window.getComputedStyle) {
			var oComputedStyle = window.getComputedStyle(oElement, "");
			return oComputedStyle.getPropertyValue(sCssProperty);
		}
		
		return false;
	},//fim getComputed
	
	
	formatPropertyCSS: function(sCssProperty) {
		var sFormatPropertyCSS = new String;
		var aSplitCssProperty  = sCssProperty.split("-");
		
		if(aSplitCssProperty.length > 1) {
			sFormatPropertyCSS = aSplitCssProperty[0];
			
			for(var i=1; i<aSplitCssProperty.length; i++) {
				sFormatPropertyCSS += (aSplitCssProperty[i].charAt(0).toUpperCase() + 
															 aSplitCssProperty[i].substr(1, aSplitCssProperty[i].length));
			}//fim for
		}//fim if
		else
			sFormatPropertyCSS = aSplitCssProperty[0];
		
		return sFormatPropertyCSS;
	},//fim formatPropertyCSS
	
	
	addClass: function(vElement, sClassName) {
		var oElement  = $(vElement);
		var rePattern = new RegExp("(^| )" + sClassName + "( |$)");

		if(!rePattern.test(oElement.className)) {

			if(oElement.className == "")
				oElement.className = sClassName;
			else
				oElement.className += " " + sClassName;

		}//fim if
		
		return true;
	},//fim addClass
	
	
	removeClass: function(vElement, sClassName) {
		var oElement = $(vElement);
		var sRemovedClass = oElement.className;
		var rePattern = new RegExp("(^| )" + sClassName + "( |$)");
		
		sRemovedClass = sRemovedClass.replace(rePattern, "$1");
		sRemovedClass = sRemovedClass.replace(/ $/, "");
		oElement.className = sRemovedClass;
		
		return true;
	}//fim removeClass

};//fim CSS.js
