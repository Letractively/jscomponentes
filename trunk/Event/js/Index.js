/* 
 * Index.js
 * 
 * Script para teste do Event.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

var Index = {
	
	init: function() {
		Index.setEventHandle();
	},//fim init
	
	
	setEventHandle: function() {
		var oDiv = document.getElementById("handle-test");

		Event.addHandle(oDiv, "mouseover", Index.eventHandleLog);
		Event.addHandle(oDiv, "mouseout",  Index.eventHandleLog);
		Event.addHandle(oDiv, "mousedown", Index.eventHandleLog);
		Event.addHandle(oDiv, "mouseup",   Index.eventHandleLog);
		Event.addHandle(oDiv, "click",     Index.eventHandleLog);
		Event.addHandle(oDiv, "dblclick",  Event.getFunction(Index.eventHandle, "Edy Segura"));

	},//fim addEventHandle
	
	
	eventHandleLog: function() {
		var oEvent = Event.getEvent();
		var oTextArea = document.getElementById("log");

		oTextArea.value += "\n>" + oEvent.type;
		oTextArea.value += "\n target is " + oEvent.target.nodeName;
		
		if(oEvent.relatedTarget) {
			oTextArea.value += "\n relatedTarget is " + oEvent.relatedTarget.nodeName;
		}
		
		oTextArea.value += "\n\n-------------------------------------------------\n";

	}//fim eventHandleLog
	
};//fim Index.js

//inicializacao
window.onload = Index.init;
