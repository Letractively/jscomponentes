/**
 * 
 * Script para teste do objeto QueryString
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
		
		init: function() {
			Index.showParams();
			Index.setForm();
		},
		
		
		showParams: function() {
			var urlParams = new QueryString;
		
			if(urlParams.isOK) {
				document.getElementById("result").innerHTML = "Nome: " + urlParams.nome + ", " + 
					"E-mail: " + urlParams.email + ", Comentário: " + urlParams.comentario;
			}
		},
		
		
		setForm: function() {
			var form = document.forms["frm-contato"];
			
			form.onreset = function() {
				document.location.href = "index.html";
			};
			
		}
		
};

//inicializacao
window.onload = Index.init;
