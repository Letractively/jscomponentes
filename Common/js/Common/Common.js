/* 
 * Common.js
 * http://jscomponentes.googlecode.com/svn/trunk/Common/js/Common/Common.js
 *
 * Objeto Literal Common. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Common
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Common = {

	noFocus: function(bNoFocus, oParentNode) {
		var oElements  = ($(oParentNode) || document.body).getElementsByTagName('*');
		var rePattern  = /button|submit|reset|image|checkbox|radio/;
		var fnSetBlur  = new Function("if(this.blur)this.blur();");
		var fnSetFocus = new Function("if(this.focus)this.focus();");
		
		bNoFocus = (typeof bNoFocus != "boolean") ? true : bNoFocus;
		
		for(var i=0; i<oElements.length; i++) {
			var oElement = oElements[i];
			
			switch(oElement.nodeName.toLowerCase()) {
				case 'a'      :
				case 'button' :
					oElement.onfocus = (bNoFocus) ? fnSetBlur : fnSetFocus;
				break;
				
				case 'input'  :
					if(rePattern.test(oElement.type)) {
						oElement.onfocus = (bNoFocus) ? fnSetBlur : fnSetFocus;
					}
				break;
				
			}//fim do switch
		}//fim do for
	},//fim noFocus


	getFormatDate: function() {
		var sResult;
		
		var oDate  = new Date();          //Data completa.
		var iDay   = oDate.getDate();     //Dia do mês.
		var iWeek  = oDate.getDay();      //Dia da semana.
		var iMonth = oDate.getMonth();    //Mês representado em números.
		var iYear  = oDate.getFullYear(); //Ano representado em números.
		
		var aWeek  = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
		var aMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
									"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
		
		iDay    = (iDay < 10) ? "0" + iDay : iDay;
		sResult = aWeek[iWeek] + ", " + iDay + " de " + aMonth[iMonth] + " de " + iYear + ".";
		
		return sResult;
	},//fim showDate
	
	
	random: function(iInicio, iFim) {
		var iVariacao = 0;
		
		iInicio   = (iInicio) ? iInicio : 1;
		iFim      = (iFim) ? iFim : 10;
		iVariacao = iFim - iInicio + 1;
		
		return Math.floor(Math.random() * iVariacao + iInicio);
	},//fim rand
	
	
	getBaseURL: function(sScriptName) {
		var aScripts = document.getElementsByTagName("script");
		
		for(var i=0; i<aScripts.length; ++i) {
			if(aScripts[i].src.indexOf((sScriptName || "Common.js")) != -1) {
				var iLastSlash = aScripts[i].src.lastIndexOf("/");
				return aScripts[i].src.substr(0, iLastSlash);
			}
		}
		
	},//fim getBaseURL
	
	
	includeJS: function(sSource) {
		if(!Common.checkExistScript(sSource)) {
			var oScript  = document.createElement('script');
			
			oScript.type = "text/javascript";
			oScript.src  = sSource; //+ "?" + (new Date()).getTime();
			document.getElementsByTagName('head')[0].appendChild(oScript);

		}//fim if
	},//fim includeJs
	
	
	checkExistScript: function(sSource) {
		var oScripts  = document.getElementsByTagName('script');
		var rePattern = new RegExp(sSource, "g");
		
		for(var i=0; i<oScripts.length; i++) {
			if(rePattern.test(oScripts[i].src)) {
				return true;
			}
		}//fim for
	
		return false;
	}//fim checkExistScript

};//fim Common.js
