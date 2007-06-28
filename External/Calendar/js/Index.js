/* 
 * Index.js
 *  
 * Uso do objeto Calendar 
 * @author: Edy Segura - infoedy@gmail.com
 * 
 */

var Index = {
	
	init: function() {
		Index.setCalendar();
	},//fim init
	
	
	setCalendar: function() {
		var aInputs = $(
			'date01', 'date02', 'date03', 
			'date04', 'date05', 'date06',
			'date07', 'date08', 'date09',
			'date10', 'date11'
		);
		
		for(var i in aInputs) {
			
			Calendar.setup({
				inputField : aInputs[i],
				button     : "btn-" + aInputs[i].id,
				ifFormat   : "%d/%m/%Y"
			});
			
		}//fim for
	}//fim setCalendar
	
};//fim Index.js

//inicialização
window.onload = Index.init;

