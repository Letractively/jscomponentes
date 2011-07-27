/**
 * BuildKeyAction
 * This action is for access default actions
 * like Main Menu and Guide
 */
var BuildKeyAction = {

	//instructions
	getDefaultActions: function() {
		var actions = [];
		
		var menuAction = new KeyAction(KeyMapping.VK_MENU);
		menuAction.setExecute(function() {
			NavigationScreenStatus.setNavigationActions('mainMenu');
			alert('Show Menu, Main menu selected');
		});
		
		var guideAction = new KeyAction(KeyMapping.VK_GUIDE);
		guideAction.setExecute(function() {
			NavigationScreenStatus.setNavigationActions('guideMenu');
			alert('Show guide');
			var log = document.getElementById('log');
			log.innerHTML = "Guide (EPG) Selected";
		});
		
		actions = [menuAction, guideAction];
		return actions;
	},
	
	overrideAction: function(action) {
		var index = -1, actions = BuildKeyAction.actions;
		for(var i=0, leng = actions.length; i<leng; i++) {
			if(action.key == actions[i].key) {
				index = i;
				break;
			}
		}
		if(index > -1) {
			actions[index] = action;
		}
		else {
			actions.push(action);
		}
	}
	
};

