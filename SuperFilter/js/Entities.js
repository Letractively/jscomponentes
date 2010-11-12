/**
 * Entities for SuperFilter
 */
var Entities = {
	
	'entidade_1' : {name:'Produto', filterValues: [["951333", "Gel Fixador p/ Cab. M.Marinho 150g - 12"]]},
	'entidade_11': {id:'11', name:'Linha'},
	'entidade_12': {id:'12', name:'Hierarquia'},
	'entidade_13': {id:'13', name:'Unidade de Negócio'},
	'entidade_2' : {id:'2',  name:'Cliente'},
	'entidade_21': {id:'21', name:'Canal'},
	'entidade_22': {id:'22', name:'Empresa'},
	'entidade_23': {id:'23', name:'Grupo de Cliente'},
	'entidade_24': {id:'24', name:'Estado'},
	'entidade_25': {id:'25', name:'Gerência Regional'},
	'entidade_26': {id:'26', name:'Vendedor'},
	'entidade_27': {id:'27', name:'Subsidiária'},
	
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

