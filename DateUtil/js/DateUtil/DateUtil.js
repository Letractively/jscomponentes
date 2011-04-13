/**
 *
 * Objeto Literal DateUtil
 * @author: Edy Segura, edy@segura.pro.br
 *
 */
var DateUtil = {
	
	getFormatDate: function() {
		var date     = new Date(),         
		    dayMonth = date.getDate(),     
		    dayWeek  = date.getDay(),      
		    month    = date.getMonth(),    
		    year     = date.getFullYear(),
				hours    = date.getHours(),
				minutes  = date.getMinutes(),
				strDate  = '';
		
		var weekLabel = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		
		var monthLabel = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		
		dayMonth = DateUtil.fillWithZero(dayMonth);
		hours = DateUtil.fillWithZero(hours);
		minutes = DateUtil.fillWithZero(minutes);
		
		strDate = weekLabel[dayWeek] + ', ' + dayMonth + ' ' + monthLabel[month] + ', ' + year + '. ' + hours + ':' + minutes;
		
		return strDate;
	},
	
	fillWithZero: function(value) {
		return value = (value < 10) ? "0" + value : value;
	}
	
};
