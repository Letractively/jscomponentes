/**
 * JsTable
 * Componente para criar e manipular uma 
 * tabela a partir de um table model JSON
 */
var MyTableModel = function(cache) {
	this.cache = cache;
	
	this.getData = function(row, col) {
	  var obj = cache[row];
		
	  switch (col) {
		  case 0: return obj.codigo;
		  case 1: return obj.versao;
		  case 2: return obj.descricao;
		  case 3: return obj.preco;
		}
		
		return this.data[row, col];
	};
	
	this.getNumRows = function() {
		return this.cache.length;
	};
	
	this.getColumns = function() {
	  return [
			{className:'codigo', text:'Código'}, 
			{className:'versao', text:'Versão'}, 
			{className:'descricao', text:'Descrição'}, 
			{className:'preco', text:'Preço'}
		];
	};
	
}