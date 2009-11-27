/**
 * JsSorter
 * Componente com critérios de ordenação
 */
var JsSorter = {

	sortByNumber: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, valor1, valor2;
		rawData.sort(function(a, b) {
			valor1 = JsSorter.parseNumber(a[columnName]);
			valor2 = JsSorter.parseNumber(b[columnName]);
			result = valor1 - valor2;
			return result * factor;
		});
	},
	
	parseNumber: function(valor) {
		var number;
		number = valor.replace(/\./g, "");
		number = number.replace(/\,/g, ".");
		number = number.replace(/[^0-9.]/g, "");
		number = parseFloat(number);
		return number;
	}

};