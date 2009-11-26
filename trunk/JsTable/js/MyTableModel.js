/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var MyTableModel = function(data) {
	this.data = data;
	
	this.getData = function(row, col) {
	  var obj = this.data[row];
		
	  switch (col) {
		  case 0: return obj.id;
			case 1: return obj.codigo;
		  case 2: return obj.versao;
		  case 3: return obj.descricao;
		}
		
		return obj;
	};
	
	this.getObject = function(row) {
		return this.data[row];
	};
	
	this.getNumRows = function() {
		return this.data.length;
	};
	
	this.getNumCols = function() {
		return this.getColumns().length;
	};
	
	this.getRawData = function() {
		return this.data;
	};
	
	this.getColumns = function() {
	  return [
			{
				className: 'check',
				text: '&nbsp;',
				sort: false,
				cellHeaderRenderer: function(cell, columnNumber) {
					return '<th><input type="checkbox" id="produtoIds" onclick="Index.setSelectedAll(this)" /></th>';
				},
				columnRenderer: function(row, col, model) {
					var obj = model.getObject(row), checked = '';
					if(obj.selected) {
						checked = 'checked="checked"';
					}
					return '<td><input type="checkbox" name="produtoIds" onclick="Index.setSelected(' + row + ')" value="' + obj.id + '" ' + checked + ' /></td>';
				}
			},
			{className:'codigo', text:'Código'}, 
			{
				className: 'versao', 
				text: 'Versão',
				cellHeaderRenderer: function(cell, columnNumber) {
					return '<th class="sortby-' + cell.className + ' column-' + columnNumber + '"><acronym title="' + cell.text + '">V</acronym></th>';
				}
			}, 
			{className:'descricao', text:'Descrição'}, 
			{
				className:'acoes', 
				text:'Ações',
				sort: false,
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