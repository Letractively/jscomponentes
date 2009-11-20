/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var MyTableModel = function(cache) {
	this.cache = cache;
	
	this.getData = function(row, col) {
	  var obj = this.cache[row];
		
	  switch (col) {
		  case 0: return obj.id;
			case 1: return obj.codigo;
		  case 2: return obj.versao;
		  case 3: return obj.descricao;
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
			{
				className: 'check',
				text: '&nbsp;',
				cellHeaderRenderer: function(cell) {
					return '<th><input type="checkbox" id="produtoIds" /></th>';
				},
				columnRenderer: function(row, col, model) {
					var id = model.getData(row, col);
					return '<td><input type="checkbox" name="produtoIds" value="' + id + '" /></td>';
				}
			},
			{className:'codigo', text:'Código'}, 
			{className:'versao', text:'Versão'}, 
			{className:'descricao', text:'Descrição'}, 
			{
				className:'acoes', 
				text:'Ações',
				columnRenderer: function(row, col, model) {
					var obj = model.getObject(row),
					    cellString = "<td>";
					cellString += '<a href="#duplicar-id-' + obj.id + '">Duplicar</a> ';
					if(!obj.readonly) {
						cellString += '| <a href="#deletar-id-' + obj.id + '">Deletar</a>';
					}
					cellString += "</td>";
					return cellString;
				}
			}
		];
	};
	
}