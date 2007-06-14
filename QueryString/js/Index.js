/* 
 * JavaScript Document
 * Autor: Edy Segura - infoedy@gmail.com
 * Descrição: Scripts para pegar os valores da QueryString
 */

var Index = {
		
		init: function() {
			Index.showParams();
			Index.setForm();
		},//fim init
		
		
		showParams: function() {
			var oUrlParams = new QueryString;
		
			if(oUrlParams.isOK) {
				document.getElementById('result').innerHTML = "Nome: " + oUrlParams.nome + ", " + 
					"E-mail: " + oUrlParams.email + ", Comentário: " + oUrlParams.comentario;
				
				/*for(var sIndex in oUrlParams) {
					alert([sIndex, oUrlParams[sIndex]].join("\n"));
				}*/
				
			}//fim do if
		},//fim showParams
		
		
		setForm: function() {
			var oForm = document.forms['frm-contato'];
			
			oForm.onreset = function() {
				document.location.href = "index.html";
			};
			
		}//fim setReload
		
};//fim Index

//inicialização
window.onload = Index.init;

