/**
 * Navigation Screen Set
 */
var Index = {
	
	init: function() {
		NavigationScreenSet.init();
		BuildNavigations.init();
		Index.logAnyKeyPressed();
	},
	
	/*
	 * Just verify the keyCode from keydown event
	 */
	logAnyKeyPressed: function() {
		var log = document.getElementById('logkeydown');
		$(document).keydown(function(e) {
			log.innerHTML = e.keyCode;
		});
	}
	
};

//inicialization
$(function(){ Index.init(); });
