/**
 * 
 * Script para DualList
 * @author LIVEWARE, contato@liveware.com.br
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
		if(list && field) {
			for(var i=0; i<list.options.length; i++) {
				var option = list.options[i];
				if(i==0) field.value = option.value;
				else field.value += "|" + option.value;
			}
		}
	},
	
	
	all2Right: function() {
		DualList.moveList(DualList.listOne, DualList.listTwo, true);
	},
	
	all2Left: function() {
		DualList.moveList(DualList.listTwo, DualList.listOne, true);
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
		DualList.moveList(DualList.listOne, DualList.listTwo, false);
	},
	
	right2Left: function() {
		DualList.moveList(DualList.listTwo, DualList.listOne, false);
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
				DualList.moveList(DualList.listOne, DualList.listTwo, false);	
			};
			
			DualList.listTwo.ondblclick = function() {
				DualList.moveList(DualList.listTwo, DualList.listOne, false);
			};
		} 
		catch(e) {
			DualList.errorLog(e);
		}
	},
	
	
	moveList: function(listSource, listTarget, moveAll) {
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
