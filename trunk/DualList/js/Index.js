/**
 * 
 * Script para teste do compoente DualList.js
 * @author Edy Segura, edy@segura.pro.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setDualList();
		Index.clearPermissao();
	},
	
	
	clearPermissao: function() {
		var permissao = document.getElementById("permissao");
		if(permissao) {
			permissao.options.length = 0;
		}
	},
	
	
	setDualList: function() {
		DualList.init({
			listOne    : "permissao",
			listTwo    : "permissoes",
			left2Right : "left2Right",
			right2Left : "right2Left",
			all2Left   : "all2Left",
			all2Right  : "all2Right"
		});
	}
	
};

//inicializacao
window.onload = Index.init;
