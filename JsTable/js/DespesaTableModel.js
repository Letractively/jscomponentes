﻿/**
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
	
	this.parseNumber = function(valor) {
		var number;
		number = valor.replace(/\./g, "");
		number = number.replace(/\,/g, ".");
		number = parseFloat(number);
		return number;
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
				className:'valor', 
				text:'Valor',
				sortby: function(columnName, columnNumber, model, factor) {
				var rawData = model.getRawData(), result, valor1, valor2;
					rawData.sort(function(a, b) {
						
						valor1 = model.parseNumber(a[columnName]);
						valor2 = model.parseNumber(b[columnName]);
						
						if(factor == 1) {
							result = valor1 - valor2;
						}
						else {
							result = valor2 - valor1;
						}
						
						return result;
					});
				}
			},
			{className:'nomeTipoRecurso', text:'Tipo Recurso'},
			{className:'idAtividade', text:'Atividade'},
			{className:'avanco', text:'Avanco'},
		];
	};
	
}
