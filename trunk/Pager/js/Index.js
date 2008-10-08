/**
 *
 * Objeto literal Index para página index.html
 * @author Edy Segura, edy@segura.pro.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setPager();
	},
	
	setPager: function() {
		pager = new Pager('list-cliente', 10);
		pager.init(); 
		pager.showPageNav('pager', 'pageNavPosition'); 
		pager.showPage(1);
	}
	
};

//inicializacao
window.onload = Index.init;