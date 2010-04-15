/**
 * Document JavaScript
 */
var TableActions = {

	selectedRow: null,
	
	init: function(params) {
		var table  = document.getElementById(params.tableId);
		if(table && table.nodeName.toLowerCase() === "table") {
			TableActions.setActions(table, params);
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
		TableActions.setThContextMenu(params);
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
	
	
	setThContextMenu: function(params) {
		var cmenuContainer = document.getElementById(params.tableId + '-cmenu');
		if(cmenuContainer) {
			SimpleContextMenu.setup({'preventDefault':false, 'preventForms':false});
			SimpleContextMenu.attach('cmenu', cmenuContainer.id);
			TableActions.setMenuActions(cmenuContainer, params.cmenuListeners);
		}
	},
	
	
	setMenuActions: function(cmenuContainer, cmenuListeners) {
		var menuId = "", listener;
		for(menuId in cmenuListeners) {
			jQuery("#" + menuId).click(function() {
				listener = cmenuListeners[this.id];
				listener(TableActions.selectedRow);
				jQuery(cmenuContainer).hide();
				return false;
			});
		}
	},
	
	
	getRow: function(e) {
		if(e.button == 2) {
			var row = e.target.parentNode;
			TableActions.selectedRow = row;
		}
	},
	
	
	stripedTable: function(table) {
		var tbody = table.tBodies[0];
		jQuery('tr', tbody).removeClass('odd');
		jQuery('tr:odd', tbody).addClass('odd');
	}	
	
};