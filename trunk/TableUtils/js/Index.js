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
		TableUtils.stripedTable(document.getElementById("zebratable"));
		TableUtils.stripedTable("simpletable", "normal", "alternada");
		//Table.stripedTable("nada");
	}

};

//inicializacao
window.onload = Index.init;