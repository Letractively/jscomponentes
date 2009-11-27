﻿/**
 * CacheProduto.js
 * Script que será gerado pelo servido
 */
var CacheProduto = {

	columns: [
		{className:'codigo', text:'Código'},
		{
			className:'versao', 
			text:'Versão',
			cellHeaderRenderer: function(cell, columnNumber) {
				return '<th class="sortby-' + cell.className + ' column-' + columnNumber + '"><acronym title="'+ cell.text +'">V</acronym></th>';
			},
			sortby: function(columnName, columnNumber, model, factor) {
				var rawData = model.getRawData(), result;
				rawData.sort(function(a, b) {
					if(factor == 1) {
						result = a[columnNumber] - b[columnNumber];
					}
					else {
						result = b[columnNumber] - a[columnNumber];
					}
					return result;
				});
			}
		},
		{className:'descricao', text:'Descrição'},
		{
			className: 'unegocio', 
			text: 'Unidade de Negócio'
		},
		{className:'custo', text:'Custo'},
		{className:'preco', text:'Preço'},
		{className:'m1', text:'M1(%)'},
		{className:'m2', text:'M2(%)'},
		{
			className: 'acoes', 
			text: '&nbsp',
			sort: false,
			columnRenderer: function(row, col, model) {
				var cellString = "", 
					  data = model.getData(row, 0);
				cellString = 
					'<td>'
						+ '<a href="#edit-produto-'+ data +'">[..]</a>'
						+ ' | <a href="#delete-produto-'+ data +'">X</a>'
				+ '</td>';
				return cellString;
			}
		}
	],

	
	tableData: [
		['40149', '1', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '1', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Zebra', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Água', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Cebola', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Cão', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Bonitão', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", '1AB', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '-1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '10', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '-5', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '20', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '2', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40149', '0', "Davene Des Spray Alma Linda Lactee", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40150', '0', "Dav. D Sp Alma Leve Leite de Aveia Davene", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40151', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Adulto', '0,01', '0,01', '0,01', '0,01'],
		['40152', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Verão', '0,01', '0,01', '0,01', '0,01'],
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Barra', '0,01', '0,01', '0,01', '0,01'],
		['40154', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40155', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40156', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40157', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40158', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40159', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40160', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Infantil', '0,01', '0,01', '0,01', '0,01'],
		['40161', '2', "Davene Des Spray Alma e Vida Hydrassoma", 'Infantil', '0,01', '0,01', '0,01', '0,01']
	]
	
};