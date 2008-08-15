/**
 * 
 * Objeto Literal Index
 * @author Edy Segura, edy@segura.pro.br
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
		var aInputPlaca    = document.getElementsByName('placa');
		
		for(var i=0; i<2; i++) {
			/*
       * Regras Padrões
       * - a = A-Z e 0-9
       * - A = A-Z, acentos e 0-9
       * - 9 = 0-9
       * - C = A-Z e acentos
       * - c = A-Z
       * - * = qualquer coisa
			 */
			MaskInput(aInputData[i], "99/99/9999");
			MaskInput(aInputCartao[i], "9999.9999.9999.9999");
			MaskInput(aInputTelefone[i], "(99)9999-9999");
			MaskInput(aInputCNPJ[i], "99.999.999/9999-99");
			MaskInput(aInputCPF[i], "999.999.999-99");
			MaskInput(aInputCEP[i], "99999-999");
			MaskInput(aInputPlaca[i], "ccc-9999");
		}
	}
	
};

//inicializacao
window.onload = Index.init;