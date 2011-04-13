/**
 * Object Literal
 */
var Index = {
	
	init: function() {
		Index.showCurrentTime();
	},
	
	showCurrentTime: function() {
		var p = document.getElementById('current-time');
		p.innerHTML = DateUtil.getFormatDate();
	}
	
};

//inicialization
window.onload = Index.init;