/**
 *
 * javascript for the page index.html
 * @author Edy Segura, edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.setContextMenu();
		Index.setMouseUp();
	},
	
	
	setContextMenu: function() {
		SimpleContextMenu.setup({'preventDefault':false, 'preventForms':false});
		SimpleContextMenu.attach('container', 'CM1'); //className and id of the contextmenu
	},
	
	
	setMouseUp: function() {
		var divs = document.getElementsByTagName('div');
		for(var i=0; i<divs.length; i++) {
			divs[i].onmouseup = Index.showTarget;
		}
	},
	
	
	showTarget: function(e) {
		e = e ? e : window.event;
		if(e.button == 2) {
			var input = document.getElementById('field');
			var element = e.srcElement || e.target;
			input.value = element.innerHTML;
		}
	}
	
}

//inicialization
window.onload = Index.init;