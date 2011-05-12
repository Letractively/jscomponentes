/**
 * BuildNavigationActions
 */

var BuildNavigations = {
	
	init: function() {
		this.createMainNavigation();
		this.createSecMenuNavigation();
		this.createGuideMenuNavigation();
	},
	
	/**
	 * Create main menu navigation
	 */
	createMainNavigation: function() {
		var actions = [], action = {};
		var log = document.getElementById('log');
		
		actions = BuildKeyAction.getDefaultActions();
		
		action = new KeyAction(KeyMapping.VK_OK);
		action.setExecute(function() {
			log.innerHTML = 'Item main menu selected';
			NavigationScreenStatus.setNavigationActions('secondMenu');
			alert('Second menu selected');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_LEFT);
		action.setExecute(function() {
			log.innerHTML = 'Left main menu pressed';
			alert('Do you hide menu?');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_UP);
		action.setExecute(function() {
			log.innerHTML = 'Up main menu pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_RIGHT);
		action.setExecute(function() {
			log.innerHTML = 'Right main menu pressed';
			NavigationScreenStatus.setNavigationActions('secondMenu');
			alert('Second menu selected');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_DOWN);
		action.setExecute(function() {
			log.innerHTML = 'Down main menu pressed';
		});
		actions.push(action);
		
		//adding main menu navigation 
		NavigationScreenSet.add(new NavigationActionSet('mainMenu', actions));
	},
	
	/**
	 * Create second menu navigation
	 */
	createSecMenuNavigation: function() {
		var actions = [], action = {};
		var log = document.getElementById('log');
		
		actions = BuildKeyAction.getDefaultActions();
		
		action = new KeyAction(KeyMapping.VK_OK);
		action.setExecute(function() {
			log.innerHTML = 'Item second menu selected';
			alert('Showing');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_LEFT);
		action.setExecute(function() {
			log.innerHTML = 'Left second menu pressed';
			NavigationScreenStatus.setNavigationActions('mainMenu');
			alert('Main menu selected');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_UP);
		action.setExecute(function() {
			log.innerHTML = 'Up second menu pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_RIGHT);
		action.setExecute(function() {
			log.innerHTML = 'Right second menu pressed';
			alert('Showing? Or do nothing?');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_DOWN);
		action.setExecute(function() {
			log.innerHTML = 'Down second menu pressed';
		});
		actions.push(action);
		
		//adding second menu navigation 
		NavigationScreenSet.add(new NavigationActionSet('secondMenu', actions));
	},
	
	/**
	 * Create guide menu navigation
	 */
	createGuideMenuNavigation: function() {
		var actions = [], action = {};
		var log = document.getElementById('log');
		
		actions = BuildKeyAction.getDefaultActions();
		
		action = new KeyAction(KeyMapping.VK_OK);
		action.setExecute(function() {
			log.innerHTML = 'Item guide (EPG) selected';
			alert('Showing');
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_LEFT);
		action.setExecute(function() {
			log.innerHTML = 'Left guide (EPG) pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_UP);
		action.setExecute(function() {
			log.innerHTML = 'Up guide (EPG) pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_RIGHT);
		action.setExecute(function() {
			log.innerHTML = 'Right guide (EPG) pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_DOWN);
		action.setExecute(function() {
			log.innerHTML = 'Down guide (EPG) pressed';
		});
		actions.push(action);
		
		action = new KeyAction(KeyMapping.VK_BACK);
		action.setExecute(function() {
			log.innerHTML = 'Back guide (EPG) pressed, Main Menu Selected';
			NavigationScreenStatus.setNavigationActions('mainMenu');
			alert('Main menu selected');
		});
		actions.push(action);
		
		//adding guide menu navigation 
		NavigationScreenSet.add(new NavigationActionSet('guideMenu', actions));
	}
	
};