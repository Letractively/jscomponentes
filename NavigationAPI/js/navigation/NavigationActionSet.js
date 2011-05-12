/**
 * Class Navigation
 */
var NavigationActionSet = function(navigationId, keyActions) {

	if(!navigationId || navigationId == null || typeof navigationId != 'string') {
		var message = 'Please, inform the id for this navigation.';
		alert(message);
		throw new Error(message);
		return false;
	}

	//private members
	this.id = navigationId;
	var actions = [];
	
	//public members
	this.acceptedKeys = [];
	
	/**
	 * execute delegate
	 */
	this.delegateAction = function(key) {
		var action = [];
		for(var i=0; i<actions.length; i++) {
			action = actions[i];
			if(action.key == key) {
				if (action.before) {
					action.before();
				}
				if (action.execute) {
					action.execute();
				}
				if (action.after) {
					action.after();
				}
			}
		}
	};
	
	/**
	 * Add KeyAction
	 */
	this.addAction = function(action) {
		if(action instanceof KeyAction) {
			actions.push(action);
			this.acceptedKeys.push(action.key);
		}
	};
	
	/**
	 * Instructions for constructor
	 */
	if(keyActions && keyActions.length) {
		for(var i=0; i<keyActions.length; i++) {
			this.addAction(keyActions[i]);
		}
	};
	
};