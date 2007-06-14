/* JavaScript Document
Autor: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
Descrição: Script para técnica striped table
*/

var Index = {
	
	init: function() {
		Index.setStripedTable();
	},//fim init
	
	setStripedTable: function() {
		var oTable = document.getElementById('zebratable');
		
		//três possíveis entradas
		Table.stripedTable(oTable);
		Table.stripedTable('simpletable');
		Table.stripedTable('nada');
	}
	
};//fim Index

//inicialização
window.onload = Index.init;
