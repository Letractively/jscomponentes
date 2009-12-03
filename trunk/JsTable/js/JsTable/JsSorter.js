/**
 * JsSorter
 * Componente com critérios de ordenação
 */
var JsSorter = {

	sortByFormatNumber: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, valor1, valor2;
		rawData.sort(function(a, b) {
			valor1 = JsSorter.parseNumber(a[columnNumber] || a[columnName]);
			valor2 = JsSorter.parseNumber(b[columnNumber] || b[columnName]);
			result = JsSorter.sortNumber(valor1, valor2);
			return result * factor;
		});
	},
	
	sortOnlyNumber: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, valor1, valor2;
		rawData.sort(function(a, b) {
			valor1 = parseFloat(a[columnNumber] || a[columnName]);
			valor2 = parseFloat(b[columnNumber] || b[columnName]);
			result = JsSorter.sortNumber(valor1, valor2);
			return result * factor;
		});
	},
	
	sortNumber: function(a, b) {
		if(isNaN(a) && !isNaN(b)) {
			return 1;
		}
		else if(!isNaN(a) && isNaN(b)) {
			return -1;
		}
		return a - b;
	},
	
	parseNumber: function(valor) {
		var number;
		number = valor.replace(/\./g, "");
		number = number.replace(/\,/g, ".");
		number = number.replace(/[^0-9.-]/g, "");
		number = parseFloat(number);
		return number;
	}

};