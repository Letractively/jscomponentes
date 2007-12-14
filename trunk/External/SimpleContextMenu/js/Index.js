/**
 *
 * javascript for the page index.html
 * @author Edy Segura, edy@segura.eti.br
 *
 */
 
var Index = {
	
	init: function() {
		Index.setContextMenu();
	},
	
	setContextMenu: function() {
		SimpleContextMenu.setup({'preventDefault':false, 'preventForms':false});
		SimpleContextMenu.attach('container', 'CM1'); //className and id of the contextmenu
	}
	
}

//inicialization
window.onload = Index.init;