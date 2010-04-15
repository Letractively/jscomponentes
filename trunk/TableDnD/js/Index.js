/**
 * Document JavaScript
 */
var Index = {

	init: function() {
		TableActions.init({
			tableId: 'list-ramal',
			onDragListener: Index.showLinhaSelecionada,
			onDropListener: Index.showNewOrder,
			cmenuListeners: {
				'menu-1': Index.addNewLine,
				'menu-2': Index.duplicateLine
			}
		});
		
	},
	
	
	showLinhaSelecionada: function(table, row) {
		$('#console').html("Linha selecionada: " + row.id);
	},
	
	
	showNewOrder: function(table, row) {
		var rows = table.tBodies[0].rows, 
		    rowsId = [], console = "",
				rowShift = rows[row.rowIndex];
				
		for(var i=0; i<rows.length; i++) {
			rowsId.push(rows[i].id);
		}
		
		console  = "Linha alterada: " + row.id + "<br />";
		if(rowShift) {
			console += "Linha deslocada para baixo: " + rowShift.id + "<br />";
		}		
		console += "Nova ordem: " + rowsId.join(", ");
		
		$('#console').html(console);
	},
	
	
	addNewLine: function(row) {
		var newRow = jQuery(row).clone(true).get(0);
		
		newRow.id = Index.generateId();
		jQuery('th, td', newRow).html('&nbsp;');
		jQuery(newRow).insertAfter(row);
		
		Index.showTarget(row);
	},
	
	
	duplicateLine: function(row) {
		var newRow = jQuery(row).clone(true).get(0);
		
		newRow.id = Index.generateId();
		jQuery(newRow).insertAfter(row);
		
		Index.showTarget(row);
	},
	
	
	showTarget: function(row) {
		var debug = [], rows = jQuery('#list-ramal tbody tr').get();
		debug.push("RowId: " + row.id);
		
		if(rows[row.rowIndex]) {
			debug.push("NewRowId: " + rows[row.rowIndex].id);
		}
		
		alert(debug.join("\n"));
	},
	
	
	generateId: function() {
		var numRows = jQuery('#list-ramal tbody tr').length;
		return "rm-" + (numRows + 100);
	}
	
};

//inicializacao
$(function(){ Index.init(); });