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

		Event.addHandle(div, "mouseover", Index.eventHandleLog);
		Event.addHandle(div, "mouseout",  Index.eventHandleLog);
		Event.addHandle(div, "mousedown", Index.eventHandleLog);
		Event.addHandle(div, "mouseup",   Index.eventHandleLog);
		Event.addHandle(div, "click",     Index.eventHandleLog);
		Event.addHandle(div, "dblclick",  Event.getFunction(Index.eventHandle, "Edy Segura"));
	},
	
	
	eventHandleLog: function() {
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
