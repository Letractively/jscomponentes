/**
 * 
 * Script para pegar os valores computado do CSS
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.showCSSProperty();
	},	
	
	showCSSProperty: function() {
		var title = document.getElementsByTagName('h2')[0];
		
		var cssProperties = [
			'border-bottom-style',
			'border-bottom-color',
			'border-bottom-width',
			'color',
			'font-size',
			'padding-top',
			'background-color',
		];
		
		for(var i in cssProperties) {
			var spanProperty = document.createElement('span');
			var spanValue    = document.createElement('span');
			var paragrafo    = document.createElement('p');
			
			CSS.addClass(spanProperty, "property");
			CSS.addClass(spanValue,    "value");
			CSS.addClass(spanProperty, "comum");
			CSS.addClass(spanValue,    "comum");
			
			spanProperty.innerHTML = cssProperties[i]  + ": ";
			spanValue.innerHTML    = CSS.getComputed(title, cssProperties[i]) + ";";
			
			paragrafo.appendChild(spanProperty);
			paragrafo.appendChild(spanValue);
			document.body.appendChild(paragrafo);
		}
	}
	
};

//inicializacao
window.onload = Index.init;
