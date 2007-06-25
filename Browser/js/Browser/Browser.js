/* 
 * Browser.js
 * http://jscomponentes.googlecode.com/svn/trunk/Browser/js/Browser/Browser.js
 *
 * Objeto Literal Browser
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Browser = {

	name    : navigator.appName,
	ua      : navigator.userAgent.toLowerCase(),
	version : parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
	java    : navigator.javaEnabled(),
	win     : navigator.platform == 'Win32',
	dom     : (document.createElement && document.getElementById) ? true : false

};

//atributos publicos do objeto literal Browser
Browser.isSafari  = Browser.ua.indexOf("safari") >= 0;
Browser.isOpera   = Browser.ua.indexOf("opera")  >= 0;
Browser.isFirefox = !Browser.isOpera && !Browser.isSafari && (Browser.name == "Netscape");
Browser.isIE      = !Browser.isOpera && (Browser.name == "Microsoft Internet Explorer");
Browser.isMac     = Browser.ua.indexOf('mac')    >= 0;
Browser.isGecko   = Browser.ua.indexOf('gecko')  >= 0;
//fim Browser.js