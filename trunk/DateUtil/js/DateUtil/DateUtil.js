/**
 *
 * Objeto Literal DateUtil
 * @author: Edy Segura, edy@segura.pro.br
 *
 */
var DateUtil = {
	
	getFormatDate: function() {
		var result;
		
		var date     = new Date();         // objeto do tipo date.
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
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro"
		];
		
		dayMonth = (dayMonth < 10) ? "0" + dayMonth : dayMonth;
		result   = weekLabel[dayWeek] + ", " + dayMonth + " de " + monthLabel[month] + " de " + year + ".";
	},
	
	
};
