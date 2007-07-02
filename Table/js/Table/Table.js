/*
 * Table.js
 * http://jscomponentes.googlecode.com/svn/trunk/Table/js/Table/Table.js
 * 
 * Objeto Literal Table. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Table
 *
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Table = {
	
	stripedTable: function(sTable) {
		var oTable = (typeof sTable == "string") ? ($(sTable)) ? $(sTable) : sTable : sTable;
		
		if(typeof oTable == "object" && oTable.nodeName.toLowerCase() == "table") {
			for(var i=0; i<oTable.tBodies.length; i++) {
				var oRows = oTable.tBodies[i].rows;
			
				for(var j=0; j<oRows.length; j++) {
					oRows[j].className = (j%2) ? "normal" : "alternada";
				}
			
			}//fim do for
		} else alert("Table: \"" + oTable + "\" não encontrada!");

	},//fim stripedTable
	
	
	clearTable: function(sTable) {
		var oTable = $(sTable);
		var oTbody = document.createElement('tbody');
		
		oTable.removeChild(oTable.tBodies[0]);
		oTable.appendChild(oTbody);
		
		return oTbody;
	}//fim clearTable
	
};//fim Table.js
