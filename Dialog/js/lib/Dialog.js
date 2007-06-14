/*
 * Dialog.js
 *
 * Objeto literal para manipulação de dialogs como
 * alert() e window.open
 *
 * @author: Edy Segura - infoedy@gmail.com
 * Dependencia 1: dom-kit.js
 * Dependencia 2: Método Common.getPageSize()
 * Dependencia 3: Event.js
 * Dependencia 4: Dialog.css
 *
 * metodos
 *
 * @name: init()
 * @name: setDialogs()
 * @name: createDivOverlay()
 * @name: showHideElementsForIE()
 * @name: resizeDivOverlay()
 * @name: positionDialog()
 * @name: popup()
 * @name: removeDivOverlay()
 * @name: checkPopupIsClosed()
 *
 */

var Dialog = {
	
	timerID    : "",
	divOverlay : "",
	winParent  : (self.location != top.location) ? top : self,
	
	
	/*
	 * metodo para inicialização do objeto
	 * @name: init
	 */
	init: function() {
		Dialog.setDialogs();
	},//fim init
	
	
	/*
	 * sobrescrevendo os metodos do javascript core
	 * @name: setDialogs
	 */
	setDialogs: function() {
		window.oldAlert = window.alert;
		window.alert = Dialog.alert;
	},//fim setWindowAlert
	
	
	/*
	 * div para o congelamento da tela
	 * @name: createDivOverlay
	 */
	createDivOverlay: function() {
		var oWindow = Dialog.winParent;
		if(oWindow.$('dialog-overlay')) return;
		
		var oDivOverlay   = oWindow.$create('div', 'id:dialog-overlay');
		var oFirstElement = oWindow.document.body.firstChild;
		
		oDivOverlay.style.height = (Common.getPageSize()).pageHeight + "px";
		
		Dialog.divOverlay = oDivOverlay;
		Event.addHandle(window, 'resize', Dialog.resizeDivOverlay);
		
		if(window.ActiveXObject) Dialog.showHideElementsForIE('hidden');
		$before(oDivOverlay, oFirstElement);
		
		return oDivOverlay;
	},//fim createDivOverlay
	
	
	/*
	 * esconde/exibe elementos no IE
	 * @name: showHideElementsForIE
	 */
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
	},//fim showHideElementsForIE
	
	
	/*
	 * redimensiona a div-overlay se a janela for redimensionada
	 * @name: resizeDivOverlay
	 */
	resizeDivOverlay: function() {
		if(Dialog.divOverlay) 
			Dialog.divOverlay.style.height = (Common.getPageSize()).pageHeight + "px";
		else 
			Event.removeHandle(window, 'resize', Dialog.resizeDivOverlay);
	},//fim resizeDivOverlay
	
	
	/*
	 * metodo alert para exibir informações como uma dialog
	 * @name: alert
	 */
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
	},//fim alert
	
	
	/*
	 * metodo para posicionar a dialog
	 * @name: positionDialog
	 */
	positionDialog: function(oDivDialog) {
		var iHeight = oDivDialog.offsetHeight;
		var sTopPxl = "-" + iHeight + "px";
		
		oDivDialog.style.marginTop = sTopPxl;
	},//fim positionDialogAlert
	
	
	/*
	 * metodo para manipulação do window.open
	 * @name: popup
	 */
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
					Event.addHandle(Dialog.divOverlay, 'click', function(){ oWinPopup.focus(); });
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
	
	
	/*
	 * metodo para verificar se a popup foi fechada
	 * @name: removeDivOverlay
	 */
	removeDivOverlay: function() {
		if(Dialog.divOverlay) {
			Event.removeHandle(window, 'resize', Dialog.resizeDivOverlay);
			if(window.ActiveXObject) Dialog.showHideElementsForIE('visible');
			$remove(Dialog.divOverlay);
			Dialog.divOverlay = null;
		}//fim if
	},//fim removeDivOverlay
	
	
	/*
	 * metodo para verificar se a popup foi fechada
	 * @name: checkPopupIsClosed
	 */
	checkPopupIsClosed: function(oWinPopup) {
		if(oWinPopup.closed) {
			clearInterval(Dialog.timerID);
			Dialog.removeDivOverlay();
		}//fim if
	}//fim winClosed
	
};//fim Dialog

//inicialização
Event.addHandle(window, 'load', Dialog.init);

