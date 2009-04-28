/**
 *
 * Objeto Literal DateUtil
 * @author: Edy Segura, edy@segura.pro.br
 *
 */
var DateUtil = {
	
	getFormatDate: function(date) {
		var result;
		
		var dayMonth = date.getDate();     // dia do m�s.
		var dayWeek  = date.getDay();      // dia da semana.
		var month    = date.getMonth();    // m�s representado em n�meros.
		var year     = date.getFullYear(); // ano representado em n�meros.
		
		var weekLabel = [
			"Domingo",
			"Segunda",
			"Ter�a",
			"Quarta",
			"Quinta",
			"Sexta",
			"S�bado"
		];
		
		var monthLabel = [
			"Jan",
			"Fev",
			"Mar",
			"Abr",
			"Mai",
			"Jun",
			"Jul",
			"Ago",
			"Set",
			"Out",
			"Nov",
			"Dez"
		];
		
		dayMonth = (dayMonth < 10) ? "0" + dayMonth : dayMonth;
		result   = monthLabel[month] + " " + year;
		
		return result;
	}
	
};
