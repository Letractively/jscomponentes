/**
 * 
 * Objeto Literal Index
 * @author Edy Segura, edy@segura.eti.br
 * 
 */

var Index = {
	
	init: function() {
		Index.setInputMask();
	},
	
	setInputMask: function() {
		var aInputData     = document.getElementsByName('data');
		var aInputCartao   = document.getElementsByName('cartao');
		var aInputTelefone = document.getElementsByName('telefone');
		var aInputCNPJ     = document.getElementsByName('cnpj');
		var aInputCPF      = document.getElementsByName('cpf');
		var aInputCEP      = document.getElementsByName('cep');
	
		for(var i=0; i<2; i++) {
			MaskInput(aInputData[i], "99/99/9999");
			MaskInput(aInputCartao[i], "9999.9999.9999.9999");
			MaskInput(aInputTelefone[i], "(99)9999-9999");
			MaskInput(aInputCNPJ[i], "99.999.999/9999-99");
			MaskInput(aInputCPF[i], "999.999.999-99");
			MaskInput(aInputCEP[i], "99999-999");
		}
	}
	
};

//inicializacao
window.onload = Index.init;