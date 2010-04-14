/**
 * Document JavaScript
 */
var Index = {

	init: function() {
		TableActions.init({
			tableId: 'list-ramal',
			onDragListener: Index.showLinhaSelecionada,
			onDropListener: Index.showNewOrder
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
	}
	
};

//inicializacao
$(function(){ Index.init(); });