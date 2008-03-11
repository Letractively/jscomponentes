/** 
 * 
 * Extendendo o objeto Number do javascript
 *
 * Number-extends.js
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Number-extend.js
 *
 * @author: Edy Segura - edy@segura.eti.br
 *
 */

/**
 *
 * Verifica se o numero e um inteiro
 * @author Edy Segura
 *
 */
Number.prototype.isInt = function() {
 var iValue = parseInt(this);
 if(isNaN(iValue)) return false;
 return (this == iValue && this.toString() == iValue.toString());
}

/**
 *
 * Formata o numero com o padrao especificado
 * Precisa da implementacao do metodo String.pad()
 * em JSExtend/String.js
 *
 * exemplo:
 * 	var numero = 2195440.3517;
 * 	alert(numero.format(2, ",", ".")); //exibe: "2.195.440,35";
 *
 * http://forum.imasters.uol.com.br/index.php?showtopic=144107
 * @author Carlos R. L. Rodrigues, editador por Edy Segura - edy@segura.eti.br
 *
 */
Number.prototype.numberFormat = function(fractionNumber, fractionSeparator, thousandSeparator) {
  var fractionNumber    = fractionNumber    || 0;
  var fractionSeparator = fractionSeparator || ".";
  var thousandSeparator = thousandSeparator || ",";
	
  if((typeof fractionNumber != "number")
    || (typeof fractionSeparator != "string")
    || (typeof thousandSeparator != "string")) {
    throw new Error("Wrong parameters for Number.numberFormat() method.");
  }
	
  var integer = "", decimal = "";
  var number = new String(this).split(/\./), numberLength = number[0].length, i = 0;
  
	if (fractionNumber > 0) {
    number[1] = (typeof number[1] != "undefined") ? number[1].substr(0, fractionNumber) : "";
    decimal = fractionSeparator.concat(number[1].pad(fractionNumber, "0", String.PAD_RIGHT));
  }
  while (numberLength > 0) {
    if ((++i % 3 == 1) && (numberLength != number[0].length)) {
      integer = thousandSeparator.concat(integer);
    }
    integer = number[0].substr(--numberLength, 1).concat(integer);
  }
  return (integer + decimal);
}
