/**
 * 
 * Script para uso do componente Table.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setTableAttribute();
		Index.setStripedTable();
	},
	
	
	setTableAttribute: function() {
		var oTable = document.getElementById('zebratable');
		oTable.setAttribute("cellSpacing", "1");
	},
	
	
	setStripedTable: function() {
		Table.stripedTable(document.getElementById('zebratable'));
		Table.stripedTable('simpletable', 'alternada');
		//Table.stripedTable('nada');
	}

};

//inicializacao
window.onload = Index.init;