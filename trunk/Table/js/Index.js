/* 
 * Index.js
 * 
 * Script para testar o objeto Table.js
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Index = {
	
	init: function() {
		Index.setStripedTable();
	},//fim init
	
	
	setStripedTable: function() {
		Table.stripedTable($('zebratable'));
		Table.stripedTable('simpletable');
		Table.stripedTable('nada');
	}

};//fim Index.js

//inicializacao
window.onload = Index.init;
