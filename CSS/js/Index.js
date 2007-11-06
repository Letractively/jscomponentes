/* 
 * Index.js
 * 
 * Script para pegar os valores computado do CSS
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.showCSSProperty();
	},//fim init
	
	
	showCSSProperty: function() {
		var oTitle = document.getElementsByTagName('h2')[0];
		
		var aCSSPropertys = [
			'border-bottom-style',
			'border-bottom-color',
			'border-bottom-width',
			'color',
			'font-size',
			'padding-top',
			'background-color',
		];
		
		for(var i in aCSSPropertys) {
			var oSpanProperty = document.createElement('span');
			var oSpanValue    = document.createElement('span');
			var oParagrafo    = document.createElement('p');
			
			CSS.addClass(oSpanProperty, "property");
			CSS.addClass(oSpanValue,    "value");
			CSS.addClass(oSpanProperty, "comum");
			CSS.addClass(oSpanValue,    "comum");

			oSpanProperty.innerHTML = aCSSPropertys[i]  + ": ";
			oSpanValue.innerHTML    = CSS.getComputed(oTitle, aCSSPropertys[i]) + ";";
			
			oParagrafo.appendChild(oSpanProperty);
			oParagrafo.appendChild(oSpanValue);
			document.body.appendChild(oParagrafo);

		}//fim for
	}//fim showCSSProperty
	
};//fim Index.js

//inicializacao
window.onload = Index.init;
