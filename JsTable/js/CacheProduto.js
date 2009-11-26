/**
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
			className:'unegocio', 
			text:'Unidade de Negócio',
			sortby: function(columnName, columnNumber, model, factor) {
				var rawData = model.getRawData(), valor1, valor2;
				rawData.sort(function(a, b) {
					
					valor1 = CacheProduto.removeEspecialChars(a[columnNumber]);
					valor2 = CacheProduto.removeEspecialChars(b[columnNumber]);
					
					if(valor1 > valor2) return  1 * factor;
					if(valor1 < valor2) return -1 * factor;
					
					return 0;
				});
			}
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
	
	removeEspecialChars: function(text) {
		var result = "";
		if(text) {
			text = text.replace(/[ÁÀÂÃ]/g, "A");
			text = text.replace(/[áàâã]/g, "a");
			text = text.replace(/[ÉÈÊ]/g, "E");
			text = text.replace(/[éèê]/g, "e");
			text = text.replace(/[ÍÌÎ]/g, "I");
			text = text.replace(/[íìî]/g, "i");
			text = text.replace(/[ÓÒÔÕ]/g, "O");
			text = text.replace(/[óòôõ]/g, "o");
			text = text.replace(/[ÚÙÛÜ]/g, "U");
			text = text.replace(/[úùûü]/g, "u");
			text = text.replace(/Ç/g, "C");
			text = text.replace(/ç/g, "c");
			result = text;
		}
		return result;
	},
	
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
		['40153', '1', "Davene Des Spray Alma Bela Do Re Mi", 'Babão', '0,01', '0,01', '0,01', '0,01'],
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
