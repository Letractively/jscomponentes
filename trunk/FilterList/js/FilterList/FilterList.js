/**
 *
 * Componente FilterList.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var FilterList = {
	
	init: function(params) {
		FilterList.setFilters(params);
	},
	
	
	setFilters: function(params) {
		var filters = $getByClass("liveSearch");
		
		if(filters && filters.length) {
			for(var i=0; i<filters.length; i++) {
				var filter = filters[i];
				FilterList.setActions(filter);
			}
		}
	},
	
	
	setActions: function(filter) {
		if(filter) {
			FilterList.setLinks(filter);
			FilterList.setInput(filter);
			FilterList.setClose(filter);
		}
			
		var divClose = $getByClass("close", filter)[0];
	},
	
	
	setLinks: function(filter) {
		var links = filter.getElementsByTagName("a");
		if(links) {
			for(var i=0; i<links.length; i++) {
				var link = links[i];
				link.onclick = function() {
					alert(this.href.replace("#","?"));
				}
			}
		}
	},
	
	
	setInput: function(filter) {
		var input = filter.getElementsByTagName("input")[0];
		if(input) {
			input.onkeyup = FilterList.liveSearch;
		}
	},
	
	
	setClose: function(filter) {
		var divClose = $getByClass("close", filter)[0];
		if(divClose) {
			divClose.onclick = function() {
				$remove(this.parentNode);
			};
		}
	},
	
	
	liveSearch: function() {
		var divList = this.parentNode.parentNode;
		var value = this.value;
		var list = divList.getElementsByTagName('li');
		
		for(var i=0; i<list.length; i++) {
			var item = list[i];
			var link = item.getElementsByTagName("a")[0];
			var pattern  = new RegExp("^[\s\n\t\r]?" + value, "i");
			var linkText = link.innerHTML;
			
			item.style.display = "";
			
			if(!pattern.test(linkText))
				item.style.display = "none";
		}
	}
	
};
