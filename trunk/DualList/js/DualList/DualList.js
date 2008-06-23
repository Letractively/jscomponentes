/**
 * 
 * Script para DualList
 * @author Edy Segura, edy@segura.pro.br
 * 
 */

var DualList = {

	listOne  : null,
	listTwo  : null,


	init: function(params) {
		if(params && params.listOne && params.listTwo) {
			DualList.listOne = document.getElementById(params.listOne);
			DualList.listTwo = document.getElementById(params.listTwo);
			DualList.setButtons(params);
			DualList.setDoubleClick();
		}
	},
	
	
	setButtons: function(params) {
		var buttonL2R = document.getElementById(params.left2Right);
		var buttonR2L = document.getElementById(params.right2Left);
		var buttonA2R = document.getElementById(params.all2Right);
		var buttonA2L = document.getElementById(params.all2Left);
		
		try {
			if(buttonL2R) {
				buttonL2R.onclick = function() {
					DualList.left2Right();
				}
			}
			
			if(buttonR2L) {
				buttonR2L.onclick = function() {
					DualList.right2Left();
				}
			}
			
			if(buttonA2R) {
				buttonA2R.onclick = function() {
					DualList.all2Right();
				}
			}
			
			if(buttonA2L) {
				buttonA2L.onclick = function() {
					DualList.all2Left();
				}
			}
		} 
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	saveList: function(list, field) {
		field.value = "";
		if(list && field) {
			for(var i=0; i<list.options.length; i++) {
				var option = list.options[i];
				if(i==0) field.value = option.value;
				else field.value += "|" + option.value;
			}
		}
	},
	
	
	all2Right: function() {
		DualList.moveAll(DualList.listOne, DualList.listTwo);
	},
	
	all2Left: function() {
		DualList.moveAll(DualList.listTwo, DualList.listOne);
	},
	
	
	moveAll: function(listSource, listTarget) {
		try {
			for(var i=0; i<listSource.length; i++) {
		    var option = listSource.options[i];
		    var newOption = new Option(option.text, option.value);
		    listTarget.options[listTarget.options.length] = newOption;
		    listSource.options[i] = null;
		  }
		}
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
		
	left2Right: function() {
		DualList.sourceToTarget(DualList.listOne, DualList.listTwo);
	},
	
	right2Left: function() {
		DualList.sourceToTarget(DualList.listTwo, DualList.listOne);
	},
	
	
	sourceToTarget: function(listSource, listTarget) {
		try {
			for(var i=0; i<listSource.length; i++) {
		    var option = listSource.options[i];
		    
		    if(option.selected) {
			    var newOption = new Option(option.text, option.value);
			    listTarget.options[listTarget.options.length] = newOption;
			    listSource.options[i] = null;
		    }
		  }
		}
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	setDoubleClick: function() {
		try {
			DualList.listOne.ondblclick = function() {
				DualList.sourceToTarget(DualList.listOne, DualList.listTwo);	
			};
			
			DualList.listTwo.ondblclick = function() {
				DualList.sourceToTarget(DualList.listTwo, DualList.listOne);
			};
		} 
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	errorLog: function(e) {
		if(console && console.info) {
			console.info("Error: " + e.message);
		}
	}

};
