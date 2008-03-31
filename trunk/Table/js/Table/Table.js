/**
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Table
 *
 * Table.js
 * http://jscomponentes.googlecode.com/svn/trunk/Table/js/Table/Table.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Table = {
	
	stripedTable: function(tableId, className) {
		var table = (typeof(tableId) == "string") ? document.getElementById(tableId) : tableId;
		
		if(table && typeof(table) == "object") {
			for(var i=0; i<table.tBodies.length; i++) {
				var rows = table.tBodies[i].rows;
				
				for(var j=0; j<rows.length; j++) {
					var row = rows[j];
					
					if(!row.className) {
						if(j%2) row.className = (className) ? className : "odd";
					}
					
				}
			}
		}
		else {
			throw new Error("table#" + tableId + " not found for method Table.stripedTable()");
		}

	},//fim stripedTable
	
	
	clearTable: function(tableId) {
		var table  = (typeof(tableId) == "string") ? document.getElementById(tableId) : tableId;
		var result = false;
		
		if(table && typeof(table) == "object") {
			var tbody = document.createElement('tbody');
			
			table.appendChild(tbody);
			table.removeChild(table.tBodies[0]);
			
			result = tbody;
		}
		else {
			throw new Error("table#" + tableId + " not found for method Table.clearTable()");
		}
		
		return result;
	}
	
};