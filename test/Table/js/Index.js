/* 
 * Index.js
 * 
 * Script para testar o objeto Table.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setTableAttribute();
		Index.setStripedTable();
	},//fim init
	
	
	setTableAttribute: function() {
		var oTable = document.getElementById('zebratable');
		oTable.setAttribute("cellSpacing", "1");
	},//fim setTableAttribute
	
	
	setStripedTable: function() {
		Table.stripedTable(document.getElementById('zebratable'));
		Table.stripedTable('simpletable', 'alternada');
		//Table.stripedTable('nada');
	}

};//fim Index

//inicializacao
window.onload = Index.init;
