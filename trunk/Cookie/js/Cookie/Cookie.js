/**
 *
 * Objeto Literal Cookie. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Cookie
 *
 * Cookie.js
 * http://jscomponentes.googlecode.com/svn/trunk/Cookie/js/Cookie/Cookie.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Cookie = {

	createCookie: function(sNome, sValue, iExpireDays) {
		var oExpireDate = new Date();

		oExpireDate.setTime(oExpireDate.getTime() + (iExpireDays * 24 * 3600 * 1000));
		document.cookie = sNome + "=" + escape(sValue) + 
		((iExpireDays == null) ? "" : "; expires=" + oExpireDate.toGMTString());
	},//fim createCookie


	deleteCookie: function(sNome, sPath, sDomain) {
		if(Cookie.getCookie(sNome)) {
			document.cookie = sNome + "=" + ((sPath) ? ";path=" + sPath : "") +
			((sDomain) ? ";domain=" + sDomain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
		}
	},//fim deleteCookie


	getCookie: function(sNome) {
		if(document.cookie.length > 0) {
			var iBegin = document.cookie.indexOf(sNome +"=");

			if(iBegin != -1) {
				var iEnd;

				iBegin += sNome.length + 1;
				iEnd = document.cookie.indexOf(";", iBegin);

				if(iEnd == -1) iEnd = document.cookie.length;
				return unescape(document.cookie.substring(iBegin, iEnd));

			}//fim if
		}//fim if
		
		return null;
	}//fim getCookie
	
};//fim Cookie.js
