/**
 * Entities for SuperFilter
 */
var Entities = {
	
	'entidade_1' : {id:'1',  name:'Produto'},
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
	'entidade_3' : {id:'3',  name:'Teste Edy Segura'},
	
	list: [],
	
	init: function() {
		var entity;
		for (var property in Entities) {
			if(property == 'init' || property == 'list') continue;
			entity = Entities[property];
			entity.url = 'superFilter.action?entity=' + entity.id;
			entity.key = property;
			entity.toString = function() {
				return this.name;
			}
			Entities.list.push(entity);
		}
	}
	
};

//inicialization for Entities
Entities.init();

