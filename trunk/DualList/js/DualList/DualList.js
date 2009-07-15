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
					return false;
				}
			}
			
			if(buttonR2L) {
				buttonR2L.onclick = function() {
					DualList.right2Left();
					return false;
				}
			}
			
			if(buttonA2R) {
				buttonA2R.onclick = function() {
					DualList.all2Right();
					return false;
				}
			}
			
			if(buttonA2L) {
				buttonA2L.onclick = function() {
					DualList.all2Left();
					return false;
				}
			}
		} 
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	saveList: function(list, field) {
		if(list && field) {
			for(var i=0; i<list.options.length; i++) {
				var option = list.options[i];
				if(i==0) field.value = option.value;
				else field.value += "|" + option.value;
			}
		}
	},
	
	
	all2Right: function() {
		DualList.sourceToTarget(DualList.listOne, DualList.listTwo, true);
	},
	
	all2Left: function() {
		DualList.sourceToTarget(DualList.listTwo, DualList.listOne, true);
	},
	
	left2Right: function() {
		DualList.sourceToTarget(DualList.listOne, DualList.listTwo, false);
	},
	
	right2Left: function() {
		DualList.sourceToTarget(DualList.listTwo, DualList.listOne, false);
	},
	
	
	setDoubleClick: function() {
		try {
			DualList.listOne.ondblclick = function() {
				DualList.sourceToTarget(DualList.listOne, DualList.listTwo, false);	
			};
			
			DualList.listTwo.ondblclick = function() {
				DualList.sourceToTarget(DualList.listTwo, DualList.listOne, false);
			};
		} 
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	sourceToTarget: function(listSource, listTarget, moveAll) {
		if((listSource.selectedIndex == -1 ) && (moveAll == false)) {
			return false;
		}
		
		var newList = [];
		var index   = 0;
		
		for(index=0; index<listTarget.length; index++) {
			var option = listTarget.options[index];
			if(option != null) {
				newList[index] = new Option(option.text, option.value);
			}
		}
		
		for(var i=0; i<listSource.length; i++) {
			var option = listSource.options[i];
			if(option != null && (option.selected || moveAll)) {
				newList[index] = new Option(option.text, option.value);
				index++;
			}
		}
		
		for(var i=0; i<newList.length; i++) {
			var option = newList[i];
			if(option != null) {
				listTarget.options[i] = option;
			}
		}
		
		for(var i=listSource.options.length - 1; i>=0; i--) {
			var option = listSource.options[i];
			if(option != null && (option.selected || moveAll)) {
				listSource.options[i] = null;
			}
		}
	},
	

	errorLog: function(e) {
		if(console && console.info) {
			console.info("Error: " + e.message);
		}
	}

};
