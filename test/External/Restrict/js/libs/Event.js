/* 
 * Event.js
 * http://jscomponentes.googlecode.com/svn/trunk/Event/js/Event/Event.js
 *
 * Objeto Literal Event. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Event
 *
 * Referencia: 1 - http://ejohn.org/projects/flexible-javascript-events/
 * Referencia: 2 - http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
 * Referencia: 3 - Livro Professional JavaScript for Web Developer página 292 do livro e 320 do PDF
 * Referencia: 4 - http://www.jsfromhell.com/geral/event-listener
 *
 */

var Event = {

	//adicionar evento dinamicamente, http://www.jsfromhell.com/geral/event-listener
	addEvent: function(o, e, f, s){
		var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
		r[r.length] = [f, s || o], o[e] = function(e){
			try{
				(e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
				e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
				e.target || (e.target = e.srcElement || null);
				e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
			}catch(f){}
			for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
			return e = null, !!d;
			}
	},//fim addEvent
	
	
	//remover evento dinamicamente, http://www.jsfromhell.com/geral/event-listener
	removeEvent: function(o, e, f, s){
		for(var i = (e = o["_on" + e] || []).length; i;)
			if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
				return delete e[i];
		return false;
	}//fim removeEvent

};//fim Event.js
