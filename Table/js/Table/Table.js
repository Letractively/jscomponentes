/*
 * Table.js
 * http://jscomponentes.googlecode.com/svn/trunk/Table/js/Table/Table.js
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Table
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Table = {
	
	stripedTable: function(sTable, sOdd) {
		var oTable = (typeof sTable == "string") ? document.getElementById(sTable) : sTable;
		
		if(oTable && typeof oTable == "object") {
			for(var i=0; i<oTable.tBodies.length; i++) {
				var aRows = oTable.tBodies[i].rows;
			
				for(var j=0; j<aRows.length; j++) {
					var oRow = aRows[j];
					
					if(!oRow.className) {
						if(j%2) oRow.className = (sOdd) ? sOdd : "odd";
					}
					
				}//fim for
			}//fim for
		}//fim if
		else {
			throw new Error("table#" + sTable + " não foi encontrada para uso do método Table.stripedTable()");
		}

	},//fim stripedTable
	
	
	clearTable: function(oTable) {
		var result = false;
		
		if(oTable) {
			var oTbody = document.createElement('tbody');
			
			oTable.appendChild(oTbody);
			oTable.removeChild(oTable.tBodies[0]);
			
			result = oTbody;
		}
		
		return result;
	}//fim clearTable
	
};//fim Table.js
