/**
 * SuperFilter
 */ 
var SuperFilter = {

	container: 'superfilter-container',
	defaultEntity: 'entidade_1',
	idScript: 'script-superfilter',
	fileNameHTML: 'filter.html',
	entitiesContainer: 'superfilter-entities',
	findMoreContainer: 'superfilter-findmore',
	linkEntityName: 'superfilter-entityName',
	inputEntityValue: 'superfilter-entityValue',
	path: '',

	
	init: function(container) {
		if(typeof Entities == 'object') {
			if(container != null && container != '') {
				SuperFilter.container = container;
			}
			SuperFilter.loadHTML();
		}
		else {
			alert('Não foi possível inicializar o filtro. O metadata Entities não foi definido.');
		}
	},
	
	
	loadHTML: function() {
		var script = document.getElementById(SuperFilter.idScript);
		if(script) {
			var path = SuperFilter.path = script.src.replace(/\/SuperFilter\.js$/, '');
			jQuery('#' + SuperFilter.container)
			.load(path + '/' + SuperFilter.fileNameHTML, SuperFilter.initHTML);
		}
	},
	
	
	initHTML: function(response, status, xhr) {
		if(status === 'success') {
			SuperFilter.setEntityDefault();
			SuperFilter.buildListEntities();
			SuperFilter.setListEntitiesAction();
			SuperFilter.setFindMoreAction();
		}
		else {
			alert('Ocorreram erros ao carregar o HTML do filtro.');
		}
	},
	
	
	setEntityDefault: function() {
		var link = document.getElementById(SuperFilter.linkEntityName);
		if(link) {
			SuperFilter.setLinkEntity(SuperFilter.defaultEntity);
			SuperFilter.setAutocomplete();
			link.onclick = function(e) {
				var link = this;
				jQuery('#' + SuperFilter.entitiesContainer)
				.css({top: (link.offsetTop + 12) + 'px', left: link.offsetLeft + 'px'})
				.show();
				return false;
			};
		}
	},
	
	
	setLinkEntity: function(entity) {
		var link = document.getElementById(SuperFilter.linkEntityName);
		link.innerHTML = Entities[entity];
		link.rel  = entity;
		link.href = Entities[entity].url;
	},
	
	
	buildListEntities: function() {
		var entityList = Entities.list, list = [], entity = {}, entityStr = "";
		list.push('<ul>');
		for (var i = 0, leng = entityList.length; i < leng; i++) {
			entity = entityList[i];
			entityStr = 'entidade_'+ entity.id;
			list.push('<li>');
				list.push('<a href="#'+ entityStr +'" rel="'+ entityStr +'">');
					list.push(entity);
				list.push('</a>');
			list.push('</li>');
		}
		list.push('</ul>');
		jQuery('#' + SuperFilter.entitiesContainer).append(list.join(""));
	},
	
	
	setListEntitiesAction: function() {
		jQuery('#' + SuperFilter.entitiesContainer + ' a').click(function() {
			var entity = this.rel;
			SuperFilter.setLinkEntity(entity);
			SuperFilter.setAutocomplete();
			jQuery('#' + SuperFilter.entitiesContainer).hide();
			return false;
		});
	},
	
	
	setFindMoreAction: function() {
		var link = document.getElementById('superfilter-addmore');
		if(link) {
			jQuery(link).click(function() {
				var link = this;
				jQuery('#' + SuperFilter.findMoreContainer)
				.css({top: (link.offsetTop + 12) + 'px', left: link.offsetLeft + 'px'})
				.show();
				return false;
			});
		}
	},

	
	setAutocomplete: function() {
		var link = document.getElementById(SuperFilter.linkEntityName);
		SuperFilter.clearInput();
		jQuery('#' + SuperFilter.inputEntityValue)
		.autocomplete (
			eval(link.rel), // TODO alterar para href e tirar o método eval
			{
				minChar: 0,
				max: 10,
				autoFill: false,
				matchContains: true,
				formatItem: function(data, i, max) {
					return data.cod + ' - ' + data.label; // TODO alterar para indece data[0] e data[1]
				},
				formatResult: function(data) {
					return data.label;
				}
			}
		);
	},
	
	
	clearInput: function() {
		jQuery('#' + SuperFilter.inputEntityValue)
		.unautocomplete()
		.val("");
	}
	
};