/* 
 * Index.js
 *
 * Objeto Literal Index para uso do objeto Restrict.js
 * @author: Edy Segura - edy@liveware.com.br, infoedy@gmail.com
 *
 */

var Index = {
	
	init: function() {
		Index.setMasks();
	},//fim init
	
	
	setMasks: function() {
		var oForm = new Restrict("frmMask");
		
    oForm.field.cpf = "\\d.-";
    oForm.mask.cpf  = "###.###.###-##";
		
		oForm.field.cnpj = "\\d.-";
    oForm.mask.cnpj  = "##.###.###/####-##";
   
    oForm.start();
	}
	
};//fim Index

//inicializacao
window.onload = Index.init;