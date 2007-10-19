/* 
 *
 * Objeto Literal Index para uso do objeto Restrict.js
 * @author: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
 *
 */

var Index = {
	
	init: function() {
		Index.setMasks();
		Index.setForm();
	},//fim init
	
	
	setMasks: function() {
		var oForm = new Restrict("frmMask");
		
    oForm.field.cpf = "\\d.-";
    oForm.mask.cpf  = "###.###.###-##";
		
		oForm.field.cnpj = "\\d.-";
    oForm.mask.cnpj  = "##.###.###/####-##";
   
    oForm.start();
	},
	
	
	setForm: function() {
		document.forms['frmMask'].onsubmit = function() {
			return false;
		}
	}
	
};//fim Index

//inicializacao
window.onload = Index.init;