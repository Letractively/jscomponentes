/* 
 * Index
 *
 * Objeto Literal Index
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Index = {
	
	init: function() {
		Index.buildTable();
	},//fim init
	
	
	buildTable: function() {
		var oTable = document.getElementsByTagName('table')[0];
		var oTbody = oTable.appendChild(document.createElement('tbody'));
		
		//percorrendo o objeto Browser
		for(var sProperty in Browser) {
			var oRow          = oTbody.insertRow(oTbody.rows.length);
			var oCellProperty = oRow.insertCell(oRow.cells.length);
			var oCellValue    = oRow.insertCell(oRow.cells.length);
			
			oCellProperty.innerHTML = sProperty;
			oCellValue.innerHTML    = Browser[sProperty];
		}//fim do for
		
		oTable.removeChild(oTable.tBodies[0]);
		
	}//fim buildTable
	
};//fim Index

//inicialização
window.onload = Index.init;
