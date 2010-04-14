/**
 * Document JavaScript
 */
var Index = {

	init: function() {
		Index.setTableActions();
	},
	
	setTableActions: function() {
		$("#list-ramal").tableDnD({
	    onDragClass: "selected",
	    onDragStart: function(table, row) {
				$(row).addClass("selected");
				$('#console').html("Linha selecionada: " + row.id);
			},
			onDrop: function(table, row) {
				$('tr', table).removeClass('odd');
				$('tr:odd', table.tBodies[0]).addClass('odd');
        Index.showNewOrder(table, row);
	    }
		});
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