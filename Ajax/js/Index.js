/**
 *
 * Objeto Literal Index
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setLinksAjax();
		Index.setLinkClear();
	},
	
	
	setLinksAjax: function() {
		var links = [document.links[0], document.links[1]];
		
		for(var i=0; i<links.length; i++) {
			links[i].onclick = function() {
				var urlParams = new QueryString(this.href);
				
				Ajax.request({
					url      : this.href,
					callback : (urlParams.callback) ? eval('(' + urlParams.callback + ')') : null,
					update   : true,
					loading  : true
				});
				
				return false;
			};
		}
		
	},
	

	setLinkClear: function() {
		var oLink = document.links[2];
		
		oLink.onclick = function() {
			document.getElementById('content-1').innerHTML = 
			document.getElementById('content-2').innerHTML = "";
			return false;
		};

	},//fim setLinkClear
	
	
	showContent: function(sResponse, oTarget) {
		oTarget.innerHTML = sResponse;
	},//fim showContent
	
	
	showContent1: function(sResponse) {
		var oTarget = document.getElementById('content-1');
		Index.showContent(sResponse, oTarget);
	},//fim showContent1
	
	
	showContent2: function(sResponse) {
		var oTarget = document.getElementById('content-2');
		Index.showContent(sResponse, oTarget);
	},//fim showContent2
	
	
	showMsg: function() {
		alert("Componente Ajax.js");
	}
	
};//fim Index

//inicialização
window.onload = Index.init;
