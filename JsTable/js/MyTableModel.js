/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var MyTableModel = function(cache) {
	this.cache = cache;
	
	this.getData = function(row, col) {
	  var obj = this.cache[row];
		
	  switch (col) {
		  case 0: return obj.codigo;
		  case 1: return obj.versao;
		  case 2: return obj.descricao;
		  case 3: return obj.id;
		}
		
		return obj;
	};
	
	this.getObject = function(row) {
		return this.cache[row];
	};
	
	this.getNumRows = function() {
		return this.cache.length;
	};
	
	this.getColumns = function() {
	  return [
			{className:'codigo', text:'Código'}, 
			{className:'versao', text:'Versão'}, 
			{className:'descricao', text:'Descrição'}, 
			{
				className:'acoes', 
				text:'&nbsp;',
				columnRenderer: function(row, col, model) {
					var obj = model.getObject(row);
					return '<td><a href="#deletar-id-' + id + '">deletar</a></td>';
				}
			}
		];
	};
	
}