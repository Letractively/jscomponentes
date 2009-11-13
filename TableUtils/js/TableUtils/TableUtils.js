/**
 * 
 * Objeto Literal TableUtils. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Table
 *
 * TableUtils.js
 * http://jscomponentes.googlecode.com/svn/trunk/TableUtils/js/TableUtils/TableUtils.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var TableUtils = {
	
	stripedTable: function(tableId, className) {
		var table = (typeof(tableId) == "string") ? document.getElementById(tableId) : tableId;
		
		if(table && table.nodeName.toLowerCase() == "table") {
			for(var i=0; i<table.tBodies.length; i++) {
				var rows = table.tBodies[i].rows;
				
				for(var j=0; j<rows.length; j++) {
					var row = rows[j];
					
					if(j%2) {
						var className = (className) ? className : "odd";
						if(!row.className) {
							row.className = className;
						}
						else {
							row.className += " " + className;
						}
					}
					
				}
			}
		}
		else {
			throw new Error("table#" + tableId + " not found for method TableUtils.stripedTable()");
		}
	},
	
	
	clearTable: function(tableId) {
		var table  = (typeof(tableId) == "string") ? document.getElementById(tableId) : tableId,
		    result = false;
		
		if(table && table.nodeName.toLowerCase() == "table") {
			var tbody = document.createElement('tbody');
			
			table.appendChild(tbody);
			table.removeChild(table.tBodies[0]);
			
			result = tbody;
		}
		else {
			throw new Error("table#" + tableId + " not found for method TableUtils.clearTable()");
		}
		
		return result;
	}
	
};