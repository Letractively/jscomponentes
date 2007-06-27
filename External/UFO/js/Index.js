/* 
 * Index.js
 * 
 * Exemplo do uso do objeto UFO
 * @author: Edy Segura - infoedy@gmail.com
 *
 */

var Index = {

  showSWFs: function() {
    UFO.create({
      movie: "swf/test8.swf",
    	width: "300",
    	height: "120",
    	majorversion: "8",
    	build: "0",
    	xi: "true"}, 
			"ufoDemo"
		);
  }

};//fim Index.js

//inicializacao
Index.showSWFs();
