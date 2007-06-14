/* 
 * Common.js
 *
 * Objeto Literal Common
 * @author: Edy Segura - infoedy@gmail.com
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
	
	
	getPageSize: function() {
		var iScrollX, iScrollY, oPageSize;
		var iViewWidth, iViewHeight;
		var iPageWidth, iPageHeight;
		
		if(window.innerHeight && window.scrollMaxY) {	
			iScrollX = document.body.scrollWidth;
			iScrollY = window.innerHeight + window.scrollMaxY;
		} 
		else if(document.body.scrollHeight > document.body.offsetHeight){
			iScrollX = document.body.scrollWidth;
			iScrollY = document.body.scrollHeight;
		} 
		else { 
			iScrollX = document.body.offsetWidth;
			iScrollY = document.body.offsetHeight;
		}
		
		if(self.innerHeight) {
			iViewWidth  = self.innerWidth;
			iViewHeight = self.innerHeight;
		} 
		else if(document.documentElement && document.documentElement.clientHeight) { 
			iViewWidth  = document.documentElement.clientWidth;
			iViewHeight = document.documentElement.clientHeight;
		} 
		else if(document.body) {
			iViewWidth  = document.body.clientWidth;
			iViewHeight = document.body.clientHeight;
		}
		
		//coordenada X
		if(iScrollX < iViewWidth){	
			iPageWidth = iViewWidth;
		} 
		else {
			iPageWidth = iScrollX;
		}
		
		//coordenada Y
		if(iScrollY < iViewHeight){
			iPageHeight = iViewHeight;
		} 
		else { 
			iPageHeight = iScrollY;
		}
		
		//retorna objeto
		return oPageSize = {
			pageWidth  : iPageWidth,
			pageHeight : iPageHeight,
			viewWidth  : iViewWidth,
			viewHeight : iViewHeight
		};
		
	},//getPageSize
	

	getScroll: function() {
		var iScrollX = 0, iScrollY = 0;
		
		if(self.pageYOffset) {
			iScrollX = self.pageXOffset;
			iScrollY = self.pageYOffset;
		}
		else if(document.documentElement && document.documentElement.scrollTop) {
			iScrollX = document.documentElement.scrollLeft;
			iScrollY = document.documentElement.scrollTop;
		}
		else if(document.body) {
			iScrollX = document.body.scrollLeft;
			iScrollY = document.body.scrollTop;
		}
		
		//retorna objeto
		return oScroll = {
			x : iScrollX,
			y : iScrollY
		};
		
	},//fim getScroll
	
	
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

};//fim Common


