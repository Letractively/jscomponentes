/**
 *
 * Objeto Literal Browser. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Browser
 *
 * Browser.js
 * http://jscomponentes.googlecode.com/svn/trunk/Browser/js/Browser/Browser.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Browser = {
	
	//atributos publicos
	name    : navigator.appName,
	ua      : navigator.userAgent.toLowerCase(),
	version : parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
	java    : navigator.javaEnabled(),
	win     : navigator.platform == 'Win32',
	dom     : (document.createElement && document.getElementById) ? true : false,
	
	//search engine's
	isAddSearchProvider : (window.external && ("AddSearchProvider" in window.external)) ? true : false,
	isAddSearchEngine   : (window.sidebar && ("addSearchEngine" in window.sidebar)) ? true : false,
	
	
	addBookmark: function(sLocation, sTitle) {
		sLocation = (sLocation) ? sLocation : document.location.href;
		sTitle    = (sTitle) ? sTitle : document.title;
		
		if(Browser.isIE) {
			window.external.AddFavorite(sLocation, sTitle);
		}
		else if(typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function") {
      window.sidebar.addPanel(sTitle, sLocation, "");
		}
		else {
			if(confirm("Seu navegador não suporta a extensão sidebar. Você quer fazer o upgrade agora?")) {
				document.location.href = "http://getfirefox.com/";
			}
		}
	},
	
	
	installSearchEngine: function() {
		var sUrlSearch = arguments[0];
		var sUrlIcon   = arguments[1];
		var sTitle     = arguments[2];
		var sMsgError  = "Seu navegador nao tem suporte ao search engine";
		
		if(arguments.length == 1) {
			// Firefox 2 and IE 7, OpenSearch
			if(window.external && ("AddSearchProvider" in window.external)) {
				window.external.AddSearchProvider(sUrlSearch);
			}
			else {
				alert(sMsgError);
			}
		}
		else if(arguments.length == 3) {
			//Firefox <= 1.5, Sherlock
			if(window.sidebar && ("addSearchEngine" in window.sidebar)) {
				window.sidebar.addSearchEngine(sUrlSearch, sUrlIcon, sTitle, "");
			}
			else {
				alert(sMsgError);
			}
		}
		
	},
	
	
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
		
	},

	
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
		
	}//fim getScroll
	
};

//atributos publicos do objeto literal Browser
Browser.isSafari  = Browser.ua.indexOf("safari") >= 0;
Browser.isOpera   = Browser.ua.indexOf("opera")  >= 0;
Browser.isMac     = Browser.ua.indexOf("mac")    >= 0;
Browser.isGecko   = Browser.ua.indexOf("gecko")  >= 0;
Browser.isFirefox = !Browser.isOpera && !Browser.isSafari && (Browser.name == "Netscape");
Browser.isIE      = !Browser.isOpera && (Browser.name == "Microsoft Internet Explorer");
Browser.isIE6     = Browser.isIE && Browser.ua.indexOf("msie 6.0") >= 0;
Browser.isIE7     = Browser.isIE && Browser.ua.indexOf("msie 7.0") >= 0;
