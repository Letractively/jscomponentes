/**
 *
 * Objeto Literal Index para uso do objeto Browser.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.buildTable();
		Index.createButtons();
	},//fim init
	
	
	createButtons: function() {
		var oButton1 = document.createElement('button');
		var oButton2 = document.createElement('button');
		var oButton3 = document.createElement('button');
		
		oButton1.onclick = function() {
			if(Browser && Browser.addBookmark) {
				Browser.addBookmark("http://edysegura.com", "Edy Segura");
			}
		}
		
		oButton2.onclick = function() {
			if(Browser && Browser.isAddSearchProvider) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/opensearch/edysegura.com.xml");
			}
		}
		
		oButton3.onclick = function() {
			if(Browser && Browser.isAddSearchEngine) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/sherlock/edysegura.com.src", 
                                    "http://us.i1.yimg.com/us.yimg.com/i/yg/img/logo/favicon.ico",  
                                    "Edy Search");
			}
		}
		
		oButton1.appendChild(document.createTextNode('Adicionar ao favoritos'));
		document.body.appendChild(oButton1);
		
		if(Browser.isAddSearchProvider) {
			oButton2.appendChild(document.createTextNode('Adicionar search engine (OpenSearch)'));
			document.body.appendChild(oButton2);
		}
		
		if(Browser.isAddSearchProvider) {
			oButton3.appendChild(document.createTextNode('Adicionar search engine (Sherlock)'));
			document.body.appendChild(oButton3);
		}
		
	},//fim createButton
	
	
	buildTable: function() {
		var oTable = document.getElementsByTagName('table')[0];
		var oTbody = oTable.appendChild(document.createElement('tbody'));
		var rePattern = /addBookmark|installSearchEngine|getPageSize|getScroll/
		
		//percorrendo o objeto Browser
		for(var sProperty in Browser) {
			if(rePattern.test(sProperty)) continue;
			
			var oRow          = oTbody.insertRow(oTbody.rows.length);
			var oCellProperty = oRow.insertCell(oRow.cells.length);
			var oCellValue    = oRow.insertCell(oRow.cells.length);
			
			oCellProperty.innerHTML = sProperty;
			oCellValue.innerHTML    = Browser[sProperty];
		}//fim do for
		
		oTable.removeChild(oTable.tBodies[0]);
		
	}//fim buildTable
	
};//fim Index

//inicializacao
window.onload = Index.init;
