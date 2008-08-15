/**
 *
 * Objeto Literal Index
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Index = {

	init: function() {
		Index.loadXML();
		window.setTimeout(Index.createElementForTest, 100);
	},


	createElementForTest: function() {
		var p = document.createElement("p");
		
		p.innerHTML = "Ler XML novamente.";
		p.className = "link";
		p.title     = "Ler XML novamente, para teste.";
		
		p.onclick = function() {
			Index.loadXML();
		};
		
		document.body.appendChild(p);
	},
	
	
	loadXML: function() {
		XML.load("xml/republicanos.xml", Index.showXML);
	},
	
	
	showXML: function(oXMLDocument) {
		var list  = document.createElement("ul");
		var nomes = oXMLDocument.getElementsByTagName("nome");
		var idade = oXMLDocument.getElementsByTagName("idade");
		
		for(var i=0; i<nomes.length; i++) {
			var listItem = document.createElement('li');
			
			listItem.innerHTML = nomes[i].childNodes[0].nodeValue + ", com " + idade[i].childNodes[0].nodeValue + " anos";
			list.appendChild(listItem);
		}
		
		document.body.appendChild(list);
	}

};

//inicializacao
window.onload = Index.init;
