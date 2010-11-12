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
	filterValues: 'filter-values',
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
			SuperFilter.buildTableFilterValues();
			SuperFilter.setListEntitiesAction();
			SuperFilter.setFindMoreAction();
			SuperFilter.hideDivs();
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
			jQuery(link).click(function(e) {
				var link = this;
				jQuery('#' + SuperFilter.entitiesContainer)
				.css({top: (link.offsetTop + 12) + 'px', left: link.offsetLeft + 'px'})
				.show();
				return false;
			});
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
			link.href,
			{
				minChars: 0,
				max: 10,
				autoFill: false,
				matchContains: true,
				formatItem: function(data, i, max) {
					return data[0] + ' - ' + data[1];
				},
				formatResult: function(data) {
					return data[1];
				}
			}
		)
		.result(function(event, data, formatted) {
			SuperFilter.addToMetadata(link.rel, data);
			SuperFilter.buildTableFilterValues();
			jQuery('#' + SuperFilter.inputEntityValue).val('');
		});
	},
	
	
	addToMetadata: function(entityName, data) {
		Entities[entityName].filterValues.push(data);
	},
	
	
	buildTableFilterValues: function() {
		var table = document.getElementById(SuperFilter.filterValues);
		var entities = Entities.list, rows = [], entity, filterValues;
		
		for(var i=0, lengI = entities.length; i<lengI; i++) {
			entity = entities[i];
			if(entity.filterValues.length == 0) continue;
			
			filterValues = entity.filterValues;
			
			rows.push('<tr>');
				rows.push('<th>');
					rows.push(entity.name);
				rows.push('</th>');
				
				rows.push('<td>');
					if (filterValues.length == 1) {
		  			rows.push(filterValues[0][1]);
				  }
				  else if(filterValues.length > 1) {
						rows.push('<a href="#show-values" class="show-values">Vários...</a>');
						rows.push('<div class="superfilter-floatdiv" style="display:none;">');
							rows.push('<ul>');
					  	for (var j = 0, lengJ = filterValues.length; j < lengJ; j++) {
					  		rows.push('<li>');
									rows.push(filterValues[j][1]);
								rows.push('</li>');
					  	}
							rows.push('</ul>');
						rows.push('</div>');
				  }
				rows.push('</td>');
				
				rows.push('<td>');
					rows.push('<a href="#delete-'+ entity.key +'" rel="'+ entity.key +'" class="delete">[X]</a>');
				rows.push('</td>');
			rows.push('</tr>');
		}
		
		if(rows.length > 0) {
			jQuery(table).html(rows.join(''));
			SuperFilter.setLinksTableAction();
		}
		else {
			jQuery(table).html('<tr><td>Nenhum parâmetro para o filtro foi adicionado.</td></tr>');
		}
	},
	
	setLinksTableAction: function() {
		var table = document.getElementById(SuperFilter.filterValues);
		jQuery('a.show-values', table).click(function(e){
			var div = this.nextSibling;
			jQuery(div)
			.css({
				top: e.clientY + 'px',
				left: e.clientX + 'px'
			})
			.show();
			return false;
		});
		jQuery('a.delete', table).click(function(e){
			var entity = Entities[this.rel], entityName = '';
			entityName = entity.name.toLowerCase();
			if (confirm('Deseja remover os valores para o filtro de ' + entityName + '?')) {
	  		Entities[this.rel].filterValues = [];
				SuperFilter.buildTableFilterValues();
	  	}
		});
	},
	
	hideDivs: function() {
		jQuery(document).click(function(e){
			var table = document.getElementById(SuperFilter.filterValues);
			jQuery('div.superfilter-floatdiv', table).hide();
			jQuery('#' + SuperFilter.entitiesContainer).hide();
		});
	},
	
	clearInput: function() {
		jQuery('#' + SuperFilter.inputEntityValue)
		.unautocomplete()
		.val("");
	}
	
};