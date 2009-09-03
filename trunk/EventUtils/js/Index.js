/**
 * 
 * Script para teste do EventUtils.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.setEventHandle();
	},
	
	
	setEventHandle: function() {
		var div = document.getElementById("handle-test");

		EventUtils.add(div, "mouseover", Index.eventLog);
		EventUtils.add(div, "mouseout",  Index.eventLog);
		EventUtils.add(div, "mousedown", Index.eventLog);
		EventUtils.add(div, "mouseup",   Index.eventLog);
		EventUtils.add(div, "click",     Index.eventLog);
		EventUtils.add(div, "dblclick",  EventUtils.getFunction(Index.eventHandle, "Edy Segura"));
	},
	
	
	eventLog: function() {
		var event = EventUtils.getEvent();
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
