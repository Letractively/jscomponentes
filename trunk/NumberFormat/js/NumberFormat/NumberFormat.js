/**
 * 
 * Format number for input elements
 * @author Marcos Okita, edited by Edy Segura - edy@segura.eti.br
 * 
 * NumberFormat.setMaksNumberByClass({
 * 	className   : "number",
 *	parent      : document.getElementById('elementId'),
 *	maskOptions : {
 *		FRACTION_SEPARATOR : ".",
 *		FRACTION_NUMBER    : 3,
 *		THOUSAND_SEPARATOR : ","
 *	}
 * });
 *
 */


/**
 * Currency Format for MaskCurrency
 */
var oMaskOptionDefault = {
	FRACTION_SEPARATOR : ",",
	FRACTION_NUMBER    : 2,
	THOUSAND_SEPARATOR : "."
};

var NumberFormat = {
	
	setNumberFormatByClass: function(oParams) {
		oParams.className   = (oParams.className)   ? oParams.className   : null;
		oParams.parent      = (oParams.parent)      ? oParams.parent      : null;
		oParams.maskOptions = (oParams.maskOptions) ? oParams.maskOptions : null;
		
		var aInputs = NumberFormat.getInputsByClass(oParams.className, oParams.parentNode);
		
		for(var i=0; i<aInputs.length; i++) {
			var oInput = aInputs[i];
			
			oInput.onkeypress = function(oEvent) {
				return NumberFormat.numberOnly(oEvent);
			};
			
			oInput.onkeyup = function() {
				NumberFormat.setMaskInputValue(this, oParams.maskOptions);
			};
			
		}//endfor
	},
	

	setMaskInputValue: function(oInput, oMaskOption) {
		if(!oInput || oInput.nodeName.toLowerCase() != "input") return false;
		if(!oMaskOption) oMaskOption = oMaskOptionDefault;
		
		var inputValue    = oInput.value;
		var oldInputValue = inputValue;
		
		//remove no-digits
		inputValue = inputValue.replace(/\D/g, "");
		//remove left zeros
		inputValue = inputValue.replace(/^0*/, "");
		
			
		//complete the inputValue with 0
		for(var i=inputValue.length; i<=oMaskOption.FRACTION_NUMBER; i++) {
		  inputValue = '0' + inputValue;
		}
		
		var frac = inputValue.substring(inputValue.length - oMaskOption.FRACTION_NUMBER);
		var int  = inputValue.substring(0, inputValue.length - oMaskOption.FRACTION_NUMBER);
		
		var last   = int.length;
		var newInt = "";
		
		for(var i = last; i > 3; i = i - 3 ) {
		  newInt = oMaskOption.THOUSAND_SEPARATOR + int.substring(i-3,i) + newInt;
		}
		
		newInt = int.substring(0,i) + newInt;
		inputValue = newInt + oMaskOption.FRACTION_SEPARATOR + frac;
		
		if(oldInputValue != inputValue) {
			oInput.value = inputValue;
		}
	},
	
	
	numberOnly: function(e) {
		var keynum;
		var keychar;
		var numCheck = /\d/;
		var acceptKeyNum = /8|3[5-9]|46/;
		var acceptKeyNumWithCtrlKey = /3[5-9]|46|118/;
		
		//IE
		if(window.event) {
			try {
				keynum = window.event.keyCode;
			}
			catch(eError){}
		}
		//Netscape/Firefox/Opera
		else if(e.which) {
		  keynum = e.which
		} 
		else {
		  try {
				keynum = e.keyCode;
			}
			catch(eError){}
		}
		
		keychar = String.fromCharCode(keynum);

		if(numCheck.test(keychar) || acceptKeyNum.test(keynum)) {
		   return true;
		}
		else if(e.ctrlKey && acceptKeyNumWithCtrlKey.test(keynum)) {
		   return true;
		}
		
		return false;
	},
	
	
	getFunction: function(fnFunction, vArguments) {
		return function() {
			try { 
				fnFunction(vArguments); 
			}
			catch(oErr) { 
				var sMessage = "Error!\n";
				sMessage += "Message: " + oErr.message + "\n";
				alert(sMessage);
			}//fim try catch
		}//fim return function
	},//fim getFunction
	
	
	getInputsByClass: function(sClassName, oParentNode) {
		var aAllElements = (oParentNode || document.body).getElementsByTagName('*');
		var aElements    = new Array;
		var rePattern    = new RegExp("(^|\\s)" + sClassName + "(\\s|$)");
		
		for(var i=0; i<aAllElements.length; i++) {
			if(rePattern.test(aAllElements[i].className)) {
				aElements.push(aAllElements[i]);
			}
		}//fim for
		
		return aElements;
	}
	
};
