/**
 *
 * Objeto Literal Index para uso do canvas
 * @author: Edy Segura - edy@segura.pro.br
 *
 */

var Index = {
	
	init: function() {
		Index.drawCicle();
	},
	
	
	drawCicle: function() {
		var jg = new jsGraphics("ringviewer");
		
		jg.setStroke(4);
		jg.setColor("rgb(8,206,8)");
		jg.drawEllipse(140, 40, 300, 300); //drawEllipse(X, Y, width, height);
		jg.paint();
	}
	
};

//inicializacao
window.onload = Index.init;
