/**
 * 
 * Script para teste do Event.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setEventHandle();
	},
	
	
	setEventHandle: function() {
		var div = document.getElementById("handle-test");

		Event.add(div, "mouseover", Index.eventLog);
		Event.add(div, "mouseout",  Index.eventLog);
		Event.add(div, "mousedown", Index.eventLog);
		Event.add(div, "mouseup",   Index.eventLog);
		Event.add(div, "click",     Index.eventLog);
		Event.add(div, "dblclick",  Event.getFunction(Index.eventHandle, "Edy Segura"));
	},
	
	
	eventLog: function() {
		var event = Event.getEvent();
		var textarea = document.getElementById("log");
		
		textarea.value += "\n>" + event.type;
		textarea.value += "\n target is " + event.target.nodeName;
		
		if(event.relatedTarget) {
			textarea.value += "\n relatedTarget is " + event.relatedTarget.nodeName;
		}
		
		textarea.value += "\n\n-------------------------------------------------\n";
	}
	
};

//inicializacao
window.onload = Index.init;
