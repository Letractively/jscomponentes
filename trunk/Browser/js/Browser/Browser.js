/* 
 * Browser.js
 * http://jscomponentes.googlecode.com/svn/trunk/Browser/js/Browser/Browser.js
 *
 * Objeto Literal Browser. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Browser
 *
 * @author: Edy Segura - infoedy@gmail.com
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
			if(confirm("Seu navegador no suporta a extenso sidebar. Voc quer fazer o upgrade agora?")) {
				document.location.href = "http://getfirefox.com/";
			}
		}
	},//fim addBookmark
	
	
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
		
	}//fim installSearchEngine

};//fim Browser

//atributos publicos do objeto literal Browser
Browser.isSafari  = Browser.ua.indexOf("safari") >= 0;
Browser.isOpera   = Browser.ua.indexOf("opera")  >= 0;
Browser.isMac     = Browser.ua.indexOf('mac')    >= 0;
Browser.isGecko   = Browser.ua.indexOf('gecko')  >= 0;
Browser.isFirefox = !Browser.isOpera && !Browser.isSafari && (Browser.name == "Netscape");
Browser.isIE      = !Browser.isOpera && (Browser.name == "Microsoft Internet Explorer");

