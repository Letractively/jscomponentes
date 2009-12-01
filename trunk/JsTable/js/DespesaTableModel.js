/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var DespesaTableModel = function(data) {
	this.data = data;
	
	this.getData = function(row, col) {
	  var obj = this.data[row];
		
	  switch (col) {
		  case 0: return obj.codigo;
		  case 1: return obj.data;
		  case 2: return obj.nomeProjeto;
		  case 3: return obj.nomeItemCusto;
		  case 4: return obj.nome;
		  case 5: return obj.quantidade;
		  case 6: return obj.valor;
		  case 7: return obj.nomeTipoRecurso;
		  case 8: return obj.idAtividade;
		  case 9: return obj.avanco;
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
			{className:'codigo', text:'Código'}, 
			{className:'data', text:'Data'},
			{className:'nomeProjeto', text:'Nome Projeto'},
			{className:'nomeItemCusto', text:'Item Custo'},    
			{className:'nome', text:'Nome'},
			{className:'quantidade', text:'Quantidade'},
			{
				className: 'valor', 
				text: 'Valor',
				sortBy: JsSorter.sortByFormatNumber
			},
			{className:'nomeTipoRecurso', text:'Tipo Recurso'},
			{className:'idAtividade', text:'Atividade'},
			{className:'avanco', text:'Avanco'},
		];
	};
	
}
