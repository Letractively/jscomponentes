/**
 *
 * javascript for the page index.html
 * @author Edy Segura, edy@segura.eti.br
 *
 */
 
var Index = {
	
	init: function() {
		Index.setContextMenu();
		Index.setMouseUp();
	},
	
	
	setContextMenu: function() {
		SimpleContextMenu.setup({'preventDefault':true, 'preventForms':false});
		SimpleContextMenu.attach('container', 'CM1'); //className and id of the contextmenu
	},
	
	
	setMouseUp: function() {
		var aDivs = document.getElementsByTagName('div');
		
		for(var i=0; i<aDivs.length; i++) {
			aDivs[i].onmouseup = Index.showTarget;
		}
	},
	
	
	showTarget: function(e) {
		e = e ? e : window.event;
		if(e.button == 2) {
			var oInput = document.getElementById('field');
			var oElement = e.srcElement || e.target;
			oInput.value = oElement.innerHTML;
		}
	}
	
}

//inicialization
window.onload = Index.init;