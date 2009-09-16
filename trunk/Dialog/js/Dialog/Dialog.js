/**
 *  
 * Objeto Literal Dialog. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Dialog
 *
 * Dialog.js
 * http://jscomponentes.googlecode.com/svn/trunk/Dialog/js/Dialog/Dialog.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Dialog = {
	
	timerID    : null,
	divOverlay : null,
	winParent  : (self.location != top.location) ? top : self,
	
	init: function() {
		Dialog.setDialogs();
	},
	
	
	setDialogs: function() {
		window.oldAlert = window.alert;
		window.alert = Dialog.alert;
	},
	
	
	createDivOverlay: function() {
		var oWindow = Dialog.winParent;
		if(oWindow.$('dialog-overlay')) return;
		
		var oDivOverlay   = oWindow.$create('div', 'id:dialog-overlay');
		var oFirstElement = oWindow.document.body.firstChild;
		
		oDivOverlay.style.height = (Browser.getPageSize()).pageHeight + "px";
		
		Dialog.divOverlay = oDivOverlay;
		EventUtils.addHandle(window, 'resize', Dialog.resizeDivOverlay);
		
		if(Browser.isIE6) Dialog.showHideElementsForIE('hidden');
		$before(oDivOverlay, oFirstElement);
		
		return oDivOverlay;
	},
	
	
	showHideElementsForIE: function(sStatus) {
		var aSelects = document.body.getElementsByTagName('select');
		var aObjects = document.body.getElementsByTagName('object');
		var aEmbeds  = document.body.getElementsByTagName('embed');
		var aIframes = document.body.getElementsByTagName('iframe');
		
		for(var i=0; i != aSelects.length; i++) {
			aSelects[i].style.visibility = sStatus;
		}
		
		for(var i=0; i != aObjects.length; i++) {
			aObjects[i].style.visibility = sStatus;
		}
				
		for(var i=0; i != aEmbeds.length; i++) {
			aEmbeds[i].style.visibility = sStatus;
		}
		
		for(var i=0; i != aIframes.length; i++) {
			aIframes[i].style.visibility = sStatus;
		}
	},
	
	
	resizeDivOverlay: function() {
		if(Dialog.divOverlay) 
			Dialog.divOverlay.style.height = (Browser.getPageSize()).pageHeight + "px";
		else 
			EventUtils.removeHandle(window, 'resize', Dialog.resizeDivOverlay);
	},
	

	alert: function(sMessage) {
		var oWindow = Dialog.winParent;
		if(oWindow.$('dialog-alert')) return;
		
		var oDivAlert = oWindow.$create('div', 'id:dialog-alert', 'className:dialog');
		var oDivTitle = oWindow.$create('h3');
		var oContent  = oWindow.$create('p', 'className:content');
		var oCButton  = oWindow.$create('p', 'className:botoes');
		var oButton   = oWindow.$create('input', 'type:button', 'value:OK');
		
		oDivTitle.innerHTML = document.title;
		oContent.innerHTML  = sMessage;
		oCButton.appendChild(oButton);
		
		oButton.onclick = function() {
			oWindow.$remove('dialog-alert');
			Dialog.removeDivOverlay();
		};
		
		Dialog.createDivOverlay();
		oDivAlert.appendChild(oDivTitle);
		oDivAlert.appendChild(oContent);
		oDivAlert.appendChild(oCButton);
		
		$before(oDivAlert, Dialog.divOverlay);
		Dialog.positionDialog(oDivAlert);
		
		oButton.focus();
	},
	
	
	positionDialog: function(oDivDialog) {
		var iHeight = oDivDialog.offsetHeight;
		var sTopPxl = "-" + iHeight + "px";
		
		oDivDialog.style.marginTop = sTopPxl;
	},
	
	
	popup: function(sURL, sWinName, iWidth, iHeight, sParams) {
		if(sURL) {
			var oWinPopup  = null;
			var sWinSize   = "", sPosition = "";
			var iPositionX = 0, iPositionY = 0;
			
			sWinName  = (sWinName) ? sWinName : 'popup';
			iWidth    = (iWidth)   ? iWidth   : 500;
			iHeight   = (iHeight)  ? iHeight  : 400;
			
			iPositionX = (screen.width  / 2) - (iWidth  / 2);
			iPositionY = (screen.height / 2) - (iHeight / 2);
			
			sWinSize  = 'width=' + iWidth + ',height=' + iHeight + ',';
			sPosition = 'top=' + iPositionY + ',left=' + iPositionX + ',';
			sParams   = (sParams) ? sWinSize + sPosition + sParams : 
			            sWinSize + sPosition + 'scrollbars=yes';
			
			oWinPopup = window.open(sURL, sWinName, sParams);
			
			if(oWinPopup) { 
			
				var fnCheckIsClosed = function() {
					Dialog.checkPopupIsClosed(oWinPopup);
				};
				
				Dialog.createDivOverlay();
				Dialog.timerID = window.setInterval(fnCheckIsClosed, 500);
				
				if(Dialog.divOverlay) {
					EventUtils.addHandle(Dialog.divOverlay, 'click', function(){ oWinPopup.focus(); });
				}
				
				oWinPopup.focus();
			}
			else {
				alert("Por favor, desabilite o seu anti-popup para esta aplicação.");
			}
			
			return oWinPopup;
		}
		else {
			alert("O endereço para popup não foi especificado.");
		}

		return false;
	},//fim popup
	
	
	removeDivOverlay: function() {
		if(Dialog.divOverlay) {
			EventUtils.removeHandle(window, 'resize', Dialog.resizeDivOverlay);
			if(Browser.isIE6) Dialog.showHideElementsForIE('visible');
			$remove(Dialog.divOverlay);
			Dialog.divOverlay = null;
		}
	},
	
	
	checkPopupIsClosed: function(oWinPopup) {
		if(oWinPopup.closed) {
			clearInterval(Dialog.timerID);
			Dialog.removeDivOverlay();
		}
	}
	
};

//inicializacao
EventUtils.addHandle(window, 'load', Dialog.init);
