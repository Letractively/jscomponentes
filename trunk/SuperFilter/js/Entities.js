/**
 * Entities for SuperFilter
 */
var Entities = {
	
	'entidade_1' : {name:'Produto', filterValues: [["951333", "Gel Fixador p/ Cab. M.Marinho 150g - 12"]]},
	'entidade_11': {name:'Linha'},
	'entidade_12': {name:'Hierarquia'},
	'entidade_13': {name:'Unidade de Negócio'},
	'entidade_2' : {name:'Cliente'},
	'entidade_21': {name:'Canal'},
	'entidade_22': {name:'Empresa'},
	'entidade_23': {name:'Grupo de Cliente'},
	'entidade_24': {name:'Estado'},
	'entidade_25': {name:'Gerência Regional'},
	'entidade_26': {name:'Vendedor'},
	'entidade_27': {name:'Subsidiária'},
	
	list: [],
	
	init: function() {
		var entity;
		for (var property in Entities) {
			if(property == 'init' || property == 'list') continue;
			entity = Entities[property];
			entity.url = 'localdata/' + property + '.html'; //'superFilter.action?entity=' + entity.id;
			entity.key = property;
			if (!entity.filterValues) {
	  		entity.filterValues = []; // valores do filtro
			}
			entity.toString = function() {
				return this.name;
			}
			Entities.list.push(entity);
		}
	}
	
};

//inicialization for Entities
Entities.init();

