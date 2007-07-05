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

	//adicionar evento dinamicamente
	addHandle: function(oElement, sType, oFunction) {
		if(oElement.attachEvent) {
			oElement['e' + sType + oFunction] = oFunction;
			oElement[sType + oFunction] = function(){ oElement['e' + sType + oFunction](window.event); };
			oElement.attachEvent('on' + sType, oElement[sType + oFunction]);
		}
		else if(oElement.addEventListener) {
			oElement.addEventListener(sType, oFunction, false);
			return true;
		}
		else return false;
	},
	
	
	//remover evento dinamicamente
	removeHandle: function(oElement, sType, oFunction) {
		if(oElement.detachEvent) {
			oElement.detachEvent('on' + sType, oElement[sType + oFunction]);
			oElement[sType + oFunction] = null;
		}
		else if(oElement.addEventListener) {
			oElement.removeEventListener(sType, oFunction, false);
			return true;
		}
		else return false;
	},


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
	},
	
	
	//remover evento dinamicamente, http://www.jsfromhell.com/geral/event-listener
	removeEvent: function(o, e, f, s){
		for(var i = (e = o["_on" + e] || []).length; i;)
			if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
				return delete e[i];
		return false;
	},
	
	
	//formata o evento no IE
	formatEvent: function(oEvent) {
		if(oEvent.srcElement && window.ActiveXObject) {
    	oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
      oEvent.eventPhase = 2;
      oEvent.isChar = (oEvent.charCode > 0);
      
			oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
      oEvent.pageY = oEvent.clientY + document.body.scrollTop;
      
			oEvent.preventDefault = function () {
      	this.returnValue = false;
      };

      if(oEvent.type == "mouseout") {
      	oEvent.relatedTarget = oEvent.toElement;
      } 
			else if(oEvent.type == "mouseover") {
      	oEvent.relatedTarget = oEvent.fromElement;
      }

			oEvent.stopPropagation = function () {
				this.cancelBubble = true;
			};

			oEvent.target = oEvent.srcElement;
			oEvent.time = (new Date).getTime();
    }//fim do if
		
    return oEvent;
	},
	
	
	//pega o evento formatado para o IE
	getEvent: function() {
		if(window.event) {
    	return Event.formatEvent(window.event);
    } else {
    	return Event.getEvent.caller.arguments[0];
    }
	},//fim getEvent
	
	
	//metodo para adicionar uma função com parâmetros
	getFunction: function(fnFunction, vArguments) {
		return function() {
			try { 
				fnFunction(vArguments); 
			}
			catch(oErr) { 
				var sMessage = "Erro na atribuição do método.\n";
				sMessage += "Descrição: " + oErr.message +"\n";
				alert(sMessage);
			}//fim try catch
		}//fim return function
	}//fim getFunction

};//fim Event.js
