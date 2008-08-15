/**
 * 
 * Exemplo de uso do componente Table.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Index = {
	
	init: function() {
		Index.setStripedTable();
	},
	
	
	setStripedTable: function() {
		Table.stripedTable(document.getElementById("zebratable"));
		Table.stripedTable("simpletable", "alternada");
		//Table.stripedTable("nada");
	}

};

//inicializacao
window.onload = Index.init;