/**
 *
 * Pager, paginacao client-side com javascript
 * @author Edy Segura, edy@segura.pro.br
 * 
 */

function Pager(tableName, itemsPerPage) {
	this.tableName = tableName;
	this.itemsPerPage = itemsPerPage;
	this.currentPage = 1;
	this.pages = 0;
	this.inited = false;
	
	
	this.init = function() {
		var table = document.getElementById(tableName);
		
		if(table) {
			var rows = table.tBodies[0].rows;
			var records = rows.length;
			this.pages = Math.ceil(records / itemsPerPage);
			this.inited = true;
		}
	}
	
	
	this.showRecords = function(from, to) {    
		var table = document.getElementById(tableName);
		var rows  = table.tBodies[0].rows;
		
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			
			if (i < from || i > to) {
				row.style.display = 'none';
			}
			else {
				row.style.display = '';
			}
		}
	}
	
	
	this.showPage = function(pageNumber) {
		if (!this.inited) {
			alert("Não inicializado!");
			return;
		}
		
		this.currentPage = pageNumber;
		
		var inputPager = document.getElementById('input-' + tableName);
		if (inputPager) {
			inputPager.value = this.currentPage;
		}
		
		var from = (pageNumber - 1) * itemsPerPage;
		var to   = from + itemsPerPage - 1;
		this.showRecords(from, to);
	}
	
	
	this.prev = function() {
		if (this.currentPage > 1) {
			this.showPage(this.currentPage - 1);
		}
	}
	
	
	this.next = function() {
		if (this.currentPage < this.pages) {
			this.showPage(this.currentPage + 1);
		}
	}
	

	this.showPageNav = function(pagerName, positionId) {
		if (! this.inited) {
			alert("not inited");
			return;
		}
		var element = document.getElementById(positionId);
		
		var pagerHtml = '<img class="first" src="images/first.png" onclick="' + pagerName + '.showPage(1);" alt="&#171 Primeiro" /> ';
		pagerHtml += '<img class="prev" src="images/prev.png" onclick="' + pagerName + '.prev();" alt="&#171 Prev" /> '
		pagerHtml += '<input class="pagedisplay" id="input-' + this.tableName + '" type="text" disabled="disabled" value="1" size="1" /> / ' + this.pages + ' ';
		pagerHtml += '<img class="next" src="images/next.png" onclick="'+pagerName+'.next();" alt="Próximo &#187;" /> ';
		pagerHtml += '<img class="last" src="images/last.png" onclick="'+pagerName+'.showPage(' + this.pages +');" alt="Último &#187;" />';
			
		element.innerHTML = pagerHtml;
	}
}

