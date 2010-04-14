/**
 * Document JavaScript
 */
var TableActions = {

	selectedRow: null,
	tableId: null,
	
	
	init: function(params) {
		var table  = document.getElementById(params.tableId);
		if(table && table.nodeName.toLowerCase() === "table") {
			TableActions.setActions(table, params);
			TableActions.tableId = table.id;
		}
		else {
			alert("table#" + params.tableId + " not found!");
		}
	},
	
	
	setActions: function(table, params) {
		var onDragListener = (typeof(params.onDragListener) === 'function') 
		                      ? params.onDragListener : null,
		    onDropListener = (typeof(params.onDropListener) === 'function') 
				                  ? params.onDropListener : null;
				
		TableActions.setTableDnD(table, onDragListener, onDropListener);
		TableActions.setThAction(table);
		TableActions.setThContextMenu(table.id);
	},
	
	
	setTableDnD: function(table, onDragListener, onDropListener) {
		jQuery(table).tableDnD({
	    
			onDragClass: "selected",
			
	    onDragStart: function(table, row) {
				jQuery(row).addClass("selected");
				if(onDragListener) {
					onDragListener(table, row);
				}
			},
			
			onDrop: function(table, row) {
				TableActions.stripedTable(table);
				if(onDropListener) {
					onDropListener(table, row);
				}
	    }
			
		});
	},
	
	
	setThAction: function(table) {
		var tbody = table.tBodies[0];
		jQuery('th', tbody)
			.addClass('cmenu')
			.mouseup(TableActions.getRow);
	},
	
	
	setThContextMenu: function(tableId) {
		var cmenuContainer = document.getElementById(tableId + '-cmenu');
		if(cmenuContainer) {
			SimpleContextMenu.setup({'preventDefault':false, 'preventForms':false});
			SimpleContextMenu.attach('cmenu', cmenuContainer.id);
			TableActions.setMenuActions(cmenuContainer);
		}
	},
	
	
	setMenuActions: function(cmenuContainer) {
		jQuery('#menu-1').click(TableActions.addNewLine);
		jQuery('#menu-2').click(TableActions.duplicateLine);
	},
	
	
	getRow: function(e) {
		if(e.button == 2) {
			var row = e.target.parentNode;
			TableActions.selectedRow = row;
		}
	},
	
	
	addNewLine: function() {
	},
	
	
	duplicateLine: function() {
		var row = TableActions.selectedRow,
		    newRow = jQuery(row).clone(true).get(0);
		jQuery(newRow).insertAfter(row);
	},
	
	
	stripedTable: function(table) {
		var tbody = table.tBodies[0];
		jQuery('tr', tbody).removeClass('odd');
		jQuery('tr:odd', tbody).addClass('odd');
	}	
	
};