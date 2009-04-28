/**
 *
 * Objeto Literal DateUtil
 * @author: Edy Segura, edy@segura.pro.br
 *
 */
var DateUtil = {
	
	getFormatDate: function(date) {
		var result;
		
		var dayMonth = date.getDate();     // dia do mês.
		var dayWeek  = date.getDay();      // dia da semana.
		var month    = date.getMonth();    // mês representado em números.
		var year     = date.getFullYear(); // ano representado em números.
		
		var weekLabel = [
			"Domingo",
			"Segunda",
			"Terça",
			"Quarta",
			"Quinta",
			"Sexta",
			"Sábado"
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
