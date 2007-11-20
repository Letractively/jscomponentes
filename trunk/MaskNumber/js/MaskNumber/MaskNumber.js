/**
 * 
 * Mask Currency for input elements
 * @author Marcos Okita, edited by Edy Segura
 *  
 */

/**
 * Currency Format for MaskCurrency
 */
var MaskNumberFormat = {
	FRACTION_SEPARATOR : ",",
	FRACTION_NUMBER    : 2,
	THOUSAND_SEPARATOR : "."
};


var MaskNumber = {
	
	setMaksNumberByClass: function(sClassName, oParentNode) {
		var aInputs = MaskNumber.getInputsByClass(sClassName, oParentNode);
		
		for(var i=0; i<aInputs.length; i++) {
			var oInput = aInputs[i];
			
			oInput.onkeypress = function(oEvent) {
				return MaskNumber.numberOnly(oEvent);
			};
			
			oInput.onkeyup = function() {
				MaskNumber.setMaskInputValue(this);
			};
			
		}//endfor
	},
	

	setMaskInputValue: function(oInput) {
		if(!oInput || oInput.nodeName.toLowerCase() != "input") return false;
		
		var inputValue    = oInput.value;
		var oldInputValue = inputValue;
		
		//remove no-digits
		inputValue = inputValue.replace(/\D/g, "");
		//remove left zeros
		inputValue = inputValue.replace(/^0*/, "");
		
			
		//complete the inputValue with 0
		for(var i=inputValue.length; i<=MaskNumberFormat.FRACTION_NUMBER; i++) {
		  inputValue = '0' + inputValue;
		}
		
		var frac = inputValue.substring(inputValue.length - MaskNumberFormat.FRACTION_NUMBER);
		var int  = inputValue.substring(0, inputValue.length - MaskNumberFormat.FRACTION_NUMBER);
		
		var last   = int.length;
		var newInt = "";
		
		for(var i = last; i > 3; i = i - 3 ) {
		  newInt = MaskNumberFormat.THOUSAND_SEPARATOR + int.substring(i-3,i) + newInt;
		}
		
		newInt = int.substring(0,i) + newInt;
		inputValue = newInt + MaskNumberFormat.FRACTION_SEPARATOR + frac;
		
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
