/**
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Table
 *
 * TableUtils.js
 * http://jscomponentes.googlecode.com/svn/trunk/Table/js/Table/Table.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var TableUtils = {
	
	stripedTable: function(tableId, classNameForOdd, classNameForEven) {
		var table = (typeof(tableId) == "string") ? document.getElementById(tableId) : tableId;
		
		if(table && table.nodeName.toLowerCase() == "table") {
			for(var i=0; i<table.tBodies.length; i++) {
				var rows = table.tBodies[i].rows;
				
				for(var j=0; j<rows.length; j++) {
					var row = rows[j];
					
					if(j%2) {
						classNameForOdd = (classNameForOdd) ? classNameForOdd : "odd";
						TableUtils.addClass(row, classNameForOdd);
					}
					else {
						classNameForEven = (classNameForEven) ? classNameForEven : "even";
						TableUtils.addClass(row, classNameForEven);
					}
					
				}
			}
		}
		else {
			throw new Error("Table not found for method TableUtils.stripedTable()");
		}
	},
	
	
	addClass: function(row, className) {
		if(!row.className) {
			row.className = className;
		}
		else if(!row.className.indexOf(className) > -1) {
			row.className += " " + className;
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
			throw new Error("Table not found for method TableUtils.clearTable()");
		}
		
		return result;
	}
	
};