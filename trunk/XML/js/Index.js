/* 
* JavaScript Document
* Autor: Edy Segura - infoedy@gmail.com
* Descrição: Uso do objeto XML
*/

var Index = {

	init: function() {
		Index.loadXML();
		Index.setLink();
	},//fim init


	loadXML: function() {
		XML.load("xml/republicanos.xml", Index.showXML);
	},//fim loadXML


	setLink: function() {
		var oLink = document.links[0];
		
		oLink.onclick = function() {
			XML.load("xml/republicanos.xml", Index.showXML);
			return false;
		};
		
	},//fim setLink


	showXML: function(oXMLDocument) {
		var oList = document.createElement("ul");
		var aNomes = oXMLDocument.getElementsByTagName("nome");
		var aIdade = oXMLDocument.getElementsByTagName("idade");

		for(var i=0; i<aNomes.length; i++) {
			var oItem = document.createElement('li');

			oItem.innerHTML = aNomes[i].firstChild.nodeValue + ", com " + aIdade[i].firstChild.nodeValue + " anos";
			oList.appendChild(oItem);

		}//fim for

		document.body.appendChild(oList);

	}//fim showXML

};//fim Index

//inicialização
window.onload = Index.init;

