/**
 *
 * Objeto Literal Index para uso do componente Browser.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.buildTable();
		Index.createButtons();
		Index.setWinResize();
	},
	
	
	setWinResize: function() {
		Index.getPageSize();
		window.onresize = Index.getPageSize;
	},
	
	
	createButtons: function() {
		var button1 = document.createElement('button');
		var button2 = document.createElement('button');
		var button3 = document.createElement('button');
		
		button1.onclick = function() {
			if(Browser && Browser.addBookmark) {
				Browser.addBookmark("http://edysegura.com", "Edy Segura");
			}
		}
		
		button2.onclick = function() {
			if(Browser && Browser.isAddSearchProvider) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/opensearch/edysegura.com.xml");
			}
		}
		
		button3.onclick = function() {
			if(Browser && Browser.isAddSearchEngine) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/sherlock/edysegura.com.src", 
                                    "http://us.i1.yimg.com/us.yimg.com/i/yg/img/logo/favicon.ico",  
                                    "Edy Search");
			}
		}
		
		button1.appendChild(document.createTextNode('Adicionar ao favoritos'));
		document.body.appendChild(button1);
		
		if(Browser.isAddSearchProvider) {
			button2.appendChild(document.createTextNode('Adicionar search engine (OpenSearch)'));
			document.body.appendChild(button2);
		}
		
		if(Browser.isAddSearchProvider) {
			button3.appendChild(document.createTextNode('Adicionar search engine (Sherlock)'));
			document.body.appendChild(button3);
		}
		
	},
	
	
	buildTable: function() {
		var table = document.getElementById('properties');
		var tbody = table.appendChild(document.createElement('tbody'));
		var pattern = /addBookmark|installSearchEngine|getPageSize|getScroll/
		
		//percorrendo o objeto Browser
		for(var property in Browser) {
			if(pattern.test(property)) continue;
			
			var row          = tbody.insertRow(tbody.rows.length);
			var cellProperty = row.insertCell(row.cells.length);
			var cellValue    = row.insertCell(row.cells.length);
			
			cellProperty.innerHTML = property;
			cellValue.innerHTML    = Browser[property];
		}
		
		table.removeChild(table.tBodies[0]);
	},
	
	
	getPageSize: function() {
		var pageSize   = Browser.getPageSize();
		var pageWidth  = document.getElementById('pageWidth');
		var pageHeight = document.getElementById('pageHeight');
		var viewWidth  = document.getElementById('viewWidth');
		var viewHeight = document.getElementById('viewHeight');
		
		pageWidth.innerHTML  = pageSize.pageWidth;
		pageHeight.innerHTML = pageSize.pageHeight;
		viewWidth.innerHTML  = pageSize.viewWidth;
		viewHeight.innerHTML = pageSize.viewHeight;
	}
	
};

//inicializacao
window.onload = Index.init;
