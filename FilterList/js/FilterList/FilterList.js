/**
 *
 * Componente FilterList.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var FilterList = {
	
	init: function() {
		FilterList.setFilters();
	},
	
	setFilters: function() {
		var filters = $getByClass("liveSearch");
		
		if(filters) {
			for(var i = 0; i<filters.length; i++) {
				var filter = filters[i];
				var filterLinks = filter.getElementsByTagName("a");
				var filterInput = filter.getElementsByTagName("input")[0];
				FilterList.setLinks(filterLinks);
				FilterList.setInput(filterInput);
			}
		}
	},
	
	
	setLinks: function(links) {
		if(links) {
			for(var i=0; i<links.length; i++) {
				var link = links[i];
				link.onclick = function() {
					alert(this.href.replace("#","?"));
				}
			}
		}
	},
	
	
	setInput: function(input) {
		if(input) {
			input.onkeyup = FilterList.liveSearch;
		}
	},
	
	
	liveSearch: function() {
		var divList = this.parentNode.parentNode;
		var value = this.value;
		var list = divList.getElementsByTagName('li');
		
		for(var i=0; i<list.length; i++) {
			var item = list[i];
			var link = item.getElementsByTagName("a")[0];
			var pattern  = new RegExp("^" + value, "i");
			var linkText = link.innerHTML;
			
			item.style.display = "";
			
			if(!pattern.test(linkText))
				item.style.display = "none";
		}
	}
	
};
