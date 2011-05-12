/**
 * Navigation Screen Set
 */
var NavigationScreenSet = {
	
	/**
	 * Collection of the NavigationActionSet
	 */
	navigations: [],
	
	init: function() {
		NavigationScreenSet.monitorKeyEvents();
	},
	
	/**
	 * Add more navigation
	 */
	add: function(navigation) {
		this.navigations.push(navigation);
	},
	
	/**
	 * Remove navigation by id
	 */
	remove: function(navigationId) {
		var navigation, navigations = this.navigations;
		for(var i=0; i<navigations.length; i++) {
			navigation = navigations[i];
			if(navigation.id == navigationId) {
				//remove navigation from array
				navigations.splice(i, 1);
			}
		}
	},
	
	/**
	 * Return index from attribute navigations
	 * by NavigationActionSet.id
	 */
	getNavActionIndexById: function(navigationId) {
		var navigation, navigations = this.navigations;
		for(var i=0; i<navigations.length; i++) {
			navigation = navigations[i];
			if(navigation.id == navigationId) {
				return i;
			}
		}
		return null;
	},
	
	
	/**
	 * Monitor Key Event for delegate
	 */
	monitorKeyEvents: function() {
		$(document).keydown(function(e) {
			NavigationScreenSet.delegate(e.keyCode);
			return false; //cancel anything key event
		});
	},
	
	/**
	 * Delegate action for key
	 */
	delegate: function(keyCode) {
		if(this.navigations.length) {
			
			var navigation = this.navigations[NavigationScreenStatus.current], 
					acceptedKey;
					
			if(navigation) {
				for(var i=0, leng = navigation.acceptedKeys.length; i<leng; i++) {
					acceptedKey = navigation.acceptedKeys[i];
					if(acceptedKey == keyCode) {
						navigation.delegateAction(keyCode);
					}
				}
			}
			
		}
	}
	
};

/**
 * NavigationScreenStatus
 */
var NavigationScreenStatus = {
	
	current: 0, //first navigation action set
	
	/**
	 * Set navigation for execute actions
	 */
	setNavigationActions: function(navigationId) {
		var index = NavigationScreenSet.getNavActionIndexById(navigationId);
		if(index != null) {
			this.current = index;
		}
		else {
			alert('The navigation ' + navigationId + ' is not found!');
		}
	},
	
	/**
	 * Go to next navigation action set
	 */
	next: function() {
		if(this.current < (NavigationScreenSet.navigations.length-1)) {
			this.current++;
		}
	},
	
	/**
	 * Go to previous navigation action set
	 */
	previous: function() {
		if(this.current > 0) {
			this.current--;
		}
	}
	
};
