/**
 * SuperFilter
 */ 
var SuperFilter = {

	container: 'superfilter-container',

	init: function(container) {
		if(container != null && container != '') {
			SuperFilter.container = container;
		}
		SuperFilter.appendHTML();
	},
	
	
	appendHTML: function() {
		var script = document.getElementById('script-superfilter');
		if(script) {
			var path = script.src.replace(/SuperFilter\.js$/, '');
			jQuery('#' + SuperFilter.container).load(path + 'filter.html', SuperFilter.initHTML);
		}
	},
	
	
	initHTML: function(response, status, xhr) {
		if(status === 'success') {
			SuperFilter.setEntityActin();
			SuperFilter.buildListEntities();
			SuperFilter.setListEntitiesAction();
		}
		else {
			alert('Ocorreram erros ao carregar o super filtro.');
		}
	},
	
	
	buildListEntities: function() {
		var entityList = Entities.list, list = [], entity = {};
		list.push('<ul>');
		for (var i = 0, leng = entityList.length; i < leng; i++) {
			entity = entityList[i];
			list.push('<li>');
				list.push('<a href="#entidade_'+ entity.id +'">');
					list.push(entity);
				list.push('</a>');
			list.push('</li>');
		}
		list.push('</ul>');
		jQuery('#superfilter-entities').append(list.join(""));
	},
	
	setEntityActin: function() {
		var linkEntity = document.getElementById('filter-name');
		if(linkEntity) {
			linkEntity.onclick = function(e) {
				console.info(e);
				return false;
			};
		}
	},
	
	setListEntitiesAction: function() {
		jQuery('#superfilter-entities a').click(function(){
			alert(this.href);
			return false;
		});
	}
	
	
}