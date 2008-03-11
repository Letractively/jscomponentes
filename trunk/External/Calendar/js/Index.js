/**
 *  
 * Uso do objeto Calendar 
 * @author: Edy Segura - edy@segura.eti.br
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
			'date10', 'date11', 'date12',
			'date13'
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

