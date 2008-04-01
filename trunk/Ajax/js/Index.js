/**
 *
 * Objeto Literal Index para uso do componente Ajax.js
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
		var link = document.links[2];
		
		link.onclick = function() {
			document.getElementById('content-1').innerHTML = 
			document.getElementById('content-2').innerHTML = "";
			return false;
		};
		
	},
	
	
	showContent: function(response, target) {
		target.innerHTML = response;
	},
	
	
	showContent1: function(response) {
		var target = document.getElementById('content-1');
		Index.showContent(response, target);
	},
	
	
	showContent2: function(response) {
		var target = document.getElementById('content-2');
		Index.showContent(response, target);
	},
	
	
	showMsg: function() {
		alert("Componente Ajax.js");
	}
	
};

//inicializacao
window.onload = Index.init;