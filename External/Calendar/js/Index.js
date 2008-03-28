/**
 *  
 * Uso do objeto Calendar 
 * @author: Edy Segura - edy@segura.eti.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setCalendar();
	},
	
	
	setCalendar: function() {
		
		var inputs = $(
			'date01', 'date02', 'date03', 
			'date04', 'date05', 'date06',
			'date07', 'date08', 'date09',
			'date10', 'date11', 'date12',
			'date13'
		);
		
		for(var i in inputs) {
			Calendar.setup({
				inputField : inputs[i],
				button     : "btn-" + inputs[i].id,
				ifFormat   : "%d/%m/%Y"
			});
		}
		
	}
	
};

//inicializacao
window.onload = Index.init;

