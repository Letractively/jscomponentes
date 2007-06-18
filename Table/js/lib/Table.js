/*
 * Table
 *
 * @author: Edy Segura - infoedy@gmail.com
 * @description: Objeto Literal Table
 *
 */

var Table = {
	
	stripedTable: function(vTable) {
		var oTable = (typeof vTable == "string") ? ($(vTable)) ? $(vTable) : vTable : vTable;
		
		if(typeof oTable == "object" && oTable.nodeName.toLowerCase() == "table") {
			for(var i=0; i<oTable.tBodies.length; i++) {
				var oRows = oTable.tBodies[i].rows;
			
				for(var j=0; j<oRows.length; j++) {
					oRows[j].className = (j%2) ? "normal" : "alternada";
				}
			
			}//fim do for
		} else alert("Table: \"" + oTable + "\" não encontrada!");

	},//fim stripedTable
	
	
	clearTable: function(vTable) {
		var oTable = $(vTable);
		var oTbody = document.createElement('tbody');
		
		oTable.removeChild(oTable.tBodies[0]);
		oTable.appendChild(oTbody);
		
		return oTbody;
	}//fim clearTable
	
};//fim Table