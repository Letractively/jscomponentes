# Objetivo #

Usar a metodologia AJAX sem complicações e sem se preocupar com as diferenças dos vários navegadores existentes no mercado.

Abaixo uma breve explicação do uso do objeto literal Ajax.

## Instruções para uso do objeto Ajax ##
```
Ajax.request({
  url      : this.href,
  callback : function(response){},
});
```

## Instruções avançadas ##
```
Ajax.request({
  method   : "POST",
  url      : "action.php",
  async    : true,
  response : "xml",
  callback : fnReferencia,
  callerro : fnReferenciaErro,
  params   : oDivContent,
  loading  : true,
  send     : urlEncodedValues
});
```