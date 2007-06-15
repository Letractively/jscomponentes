/* 
 * Index.js
 *
 * Objeto Literal Index
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Index = {

	init: function() {
		Index.loadXML();
		window.setTimeout(Index.createElementForTest, 50);
	},//fim init


	createElementForTest: function() {
		var oElementP = document.createElement('p');
		
		oElementP.innerHTML = "Ler XML novamente.";
		oElementP.className = "link";
		oElementP.title     = "Ler XML novamente, para teste.";
		
		oElementP.onclick = function() {
			Index.loadXML();
		};
		
		document.body.appendChild(oElementP);
	},//fim createElementForTest
	
	
	loadXML: function() {
		XML.load("xml/republicanos.xml", Index.showXML);
	},//fim loadXML
	
	
	showXML: function(oXMLDocument) {
		var oList  = document.createElement("ul");
		var aNomes = oXMLDocument.getElementsByTagName("nome");
		var aIdade = oXMLDocument.getElementsByTagName("idade");

		for(var i=0; i<aNomes.length; i++) {
			var oItem = document.createElement('li');

			oItem.innerHTML = aNomes[i].firstChild.nodeValue + ", com " + aIdade[i].firstChild.nodeValue + " anos";
			oList.appendChild(oItem);

		}//fim for

		document.body.appendChild(oList);

	}//fim showXML

};//fim Index.js

//inicializacao
window.onload = Index.init;
