/**
 *
 * Objeto Literal Index para uso do componente FilterList.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Index = {
	
	init: function() {
		FilterList.init({
			linkAction: Index.linkAction
		});
	},
	
	
	linkAction: function(link) {
		var description = (link.rel) ? link.rel : link.innerHTML;
		alert(description);
	}
	
};

//inicializacao
window.onload = Index.init;