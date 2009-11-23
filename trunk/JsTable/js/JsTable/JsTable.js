/**
 * JsTable
 * Componente para criar e manipular uma 
 * tabela a partir de um table model JSON
 */
var JsTable = function(params) {

	//atributo privado
	var jsTable = this;
	
	//atributos
	this.tableId = (params.tableId) ? params.tableId : null;
	this.containerId = (params.containerId) ? params.containerId : null;
	this.pagingContainerId = (params.pagingContainerId) ? params.pagingContainerId : null;
	this.classNames = (params.classNames) ? params.classNames : null;
	this.contextpath = (params.contextpath) ? (params.contextpath + "/") : "";
	this.model = {};
	this.errors = [];
	
	//atributos para paginação
	this.itemsPerPage = (params.itemsPerPage) ? params.itemsPerPage : 10;
	
	
	//tratamento de erros
	if(!this.tableId) {
		this.errors.push("tableId is not defined!");
	}
	
	if(!this.containerId) {
		this.errors.push("containerId is not defined!");
	}
	
	if(this.errors.length) {
		alert("Errors: \n" + this.errors.join('\n'));
		return null;
	}
	
	//--------- set renderers -------------------------------------------------
	
	this.setRowRenderer = function(renderer) {
		this.rowRenderer = renderer;
	};
	
	//---------- métodos para construção da tabela -----------------------------
	
	this.setTableModel = function(tableModel) {
		if(tableModel) {
			this.model = tableModel;
			
			if(!this.model) {
				this.errors.push("tableModel.model is not defined!");
			}
			
			if(!this.model.getColumns) {
				this.errors.push("tableModel.getColumns is not defined!");
			}
			
			if(this.errors.length) {
				alert("Errors: \n" + this.errors.join('\n'));
			}
		}
	};
	
	this.showTable = function() {
		if(this.errors.length === 0) {
			var tableString = 
				'<table border="1" id="'+ this.tableId +'"'+ this.addClass() +'>'
					+ this.getTagsCol()
					+ this.getHeader()
					+ this.getFooter()
					+ this.getBody()
			+ '</table>';
			
			$('#' + this.containerId).html(tableString);
			
			if(this.pagingContainerId) {
				this.initPaging();
			}
		}
	};
	
	this.addClass = function() {
		if(this.classNames && this.classNames != "") {
			return ' class="'+ this.classNames +'"';
		}
		return '';
	};
	
	this.getTagsCol = function() {
		var colString = "", col, columns = this.model.getColumns();
		for(var index in columns) {
			col = columns[index];
			colString += '<col class="'+ col.className +'" />';
		}
		return colString;
	};
	
	this.getHeader = function() {
		var thead = "<thead>";
		thead += this.rowHeaderRenderer(this.model.getColumns());
		thead += "</thead>";
		return thead;
	};
	
	this.getFooter = function() {
		return "";
	};
	
	this.getBody = function() {
		var tbody = "<tbody>";
		for(var i=0; i<this.model.getNumRows() && i<this.itemsPerPage; i++) {
			tbody += this.rowRenderer(i);
		}
		tbody += "</tbody>";
		return tbody;
	};
	
	//--------- renderers ----------------------------------------------------
	
	this.rowRenderer = function(row) {
		var rowString = "<tr>", column
		    columns   = this.model.getColumns();
				
		for(var col = 0; col < columns.length; col++) {
			column = columns[col];
			if(typeof column.columnRenderer === 'function') {
				rowString += column.columnRenderer(row, col, this.model);
			}
			else {
				rowString += this.columnRenderer(row, col, this.model);
			}
		}
		
		rowString += "</tr>";
		return rowString;
	};
	
	this.rowHeaderRenderer = function(columns) {
		var rowString = "<tr>", column;
		
		for(var index in columns) {
			column = columns[index];
			if(typeof column.cellHeaderRenderer ===  'function') {
				rowString += column.cellHeaderRenderer(column);
			}
			else {
				rowString += this.cellHeaderRenderer(column);
			}
		}
		
		rowString += "</tr>";
		return rowString;
	};
	
	this.cellHeaderRenderer = function(cell) {
		var cellString = "";
		cellString = "<th>" + cell.text + "</th>";
		return cellString;
	};
	
	this.columnRenderer = function(row, col, model) {
		var cellString = "", 
		    modelData  = model.getData(row, col);
				data = (modelData) ? modelData : "&nbsp;";
		cellString = "<td>" + data + "</td>";
		return cellString;
	};
	
	//--------- métodos para paginação ------------------------------------
	
	this.initPaging = function() {
		this.createPagingControls();
		this.setPaging(this.itemsPerPage);
		this.setPagingControls();
		this.showTotalItens();
	};
	
	this.createPagingControls = function() {
		if(this.pagingContainer) {
			$(this.pagingContainer)
			 .append(this.firstPageControl)
			 .append(" ")
			 .append(this.prevPageControl)
			 .append(" ")
			 .append(this.currentPageControl)
			 .append(" ")
			 .append(this.totalPageControl)
			 .append(" ")
			 .append(this.nextPageControl)
			 .append(" ")
			 .append(this.lastPageControl)
			 .append(" | Itens por página: ")
			 .append(this.itemsPerPageControl)
			 .append(" | Total: ")
			 .append(this.totalItemsControl)
		}
	}
	
	this.setPaging = function(itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
		var totalPages = Math.ceil(this.model.getNumRows() / this.itemsPerPage);
		if(totalPages === 0) {
			totalPages = 1;
		}
		this.totalPages = totalPages;
		this.setStatusPaging();
		this.showItemsPerPage();
	};
	
	this.showTotalItens = function() {
		if(this.totalItemsControl) {
			this.totalItemsControl.innerHTML = this.model.getNumRows();
		}
	};
	
	this.showItemsPerPage = function() {
		if(this.itemsPerPageControl) {
			$(this.itemsPerPageControl).val(this.itemsPerPage);
		}
	}
	
	this.setStatusPaging = function() {
		if(this.totalPageControl) {
			this.totalPageControl.innerHTML = "/" + this.totalPages;
		}
		if(this.currentPageControl) {
			$(this.currentPageControl).val(this.currentPage);
		}
	};
	
	this.setPagingControls = function() {
		var begin = 0;
		
		//ir para primeira página
		$(this.firstPageControl).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage = 1;
				jsTable.showPagingRows(0, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página anterior
		$(this.prevPageControl).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage--;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para próxima página
		$(this.nextPageControl).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage++;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para última página
		$(this.lastPageControl).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage = jsTable.totalPages;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página informada
		$(this.currentPageControl).keydown(function(e) {
			if(e.keyCode == 13) {
				var numPage = 1;
				
				if(this.value != "") {
					numPage = parseInt(this.value);
				}
				if(numPage > jsTable.totalPages) {
					numPage = jsTable.totalPages;
				} 
				else if(numPage <= 0) {
					numPage = 1;
				}
				
				this.value = numPage;			
				jsTable.currentPage = numPage;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//lista número de itens informado por página
		$(this.itemsPerPageControl).keydown(function(e) {
			if(e.keyCode == 13) {
				var numItens = 1;
				
				if(this.value != "") {
					numItens = parseInt(this.value);
				}
				
				if(numItens > 100) {
					numItens = 100;
				} 
				else if(numItens <= 0) {
					numItens = 1;
				}
				
				this.value = numItens;
				
				jsTable.setPaging(numItens);
				jsTable.showPagingRows(0, jsTable.itemsPerPage);
				jsTable.currentPage = 1;
				jsTable.setStatusPaging();
			}
		});
	};
	
	this.showPagingRows = function (begin, n) {
		if ( this.model.getNumRows() ) {
			var table  = document.getElementById(this.tableId),
			    rowStr = "", 
					tbody  = table.getElementsByTagName('tbody')[0];
			
			$(tbody).html("");
			
			for(var index=begin, i=0; index<this.model.getNumRows() && i<n; index++, i++) {
				$(tbody).append(this.rowRenderer(index));
			}
			
		}
	};
	
	//------------------ componentes para paginação --------------------------------------
	
	this.createFirstPageControl = function() {
		var pageControl = $('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-first.png',
			'id': jsTable.tableId + "-first",
			'class' : 'first',
			'alt' : 'Início',
			'title' : 'Início'
		}).get(0);
		return pageControl;
	};
	
	this.createPrevPageControl = function() {
		var pageControl = $('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-prev.png',
			'id': jsTable.tableId + "-prev",
			'class' : 'prev',
			'alt' : 'Anterior',
			'title' : 'Anterior'
		}).get(0);
		return pageControl;
	};
	
	this.createCurrentPageControl = function() {
		var pageControl = $('<input />').attr({
			'type': 'text',
			'id': jsTable.tableId + "-currentPage",
			'class' : 'number currentPage',
			'maxlength' : 3,
			'value' : 1
		}).get(0);
		return pageControl;
	};
	
	this.createTotalPageControl = function() {
		var pageControl = $('<span />').attr({
			'id': jsTable.tableId + "-totalPages",
			'class' : 'totalPages'
		})
		.text('/ ' + jsTable.totalPages)
		.get(0);
		return pageControl;
	};
	
	this.createNextPageControl = function() {
		var pageControl = $('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-next.png',
			'id': jsTable.tableId + "-next",
			'class' : 'next',
			'alt' : 'Próximo',
			'title' : 'Próximo'
		}).get(0);
		return pageControl;
	};
	
	this.createLastPageControl = function() {
		var pageControl = $('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-last.png',
			'id': jsTable.tableId + "-last",
			'class' : 'last',
			'alt' : 'Último',
			'title' : 'Último'
		}).get(0);
		return pageControl;
	};
	
	this.createItemsPerPageControl = function() {
		var pageControl = $('<input />').attr({
			'type': 'text',
			'id': jsTable.tableId + "-itemsPerPage",
			'class' : 'number itemsPerPage',
			'maxlength' : 3,
			'value' : jsTable.itemsPerPage
		}).get(0);
		return pageControl;
	};
	
	this.createTotalItemsControl = function() {
		var pageControl = $('<span />').attr({
			'id': jsTable.tableId + "-totalItems",
			'class' : 'totalItems'
		})
		.text(0)
		.get(0);
		return pageControl;
	};

	//-------------------- controles para paginação --------------------------------
	
	if(this.pagingContainerId) {
		this.currentPage = 1;
		this.totalPages  = 0;
		this.pagingContainer = document.getElementById(this.pagingContainerId);
		
		this.firstPageControl = this.createFirstPageControl();
		this.prevPageControl = this.createPrevPageControl();
		this.currentPageControl = this.createCurrentPageControl();
		this.totalPageControl = this.createTotalPageControl();
		this.nextPageControl = this.createNextPageControl();
		this.lastPageControl = this.createLastPageControl();
		this.itemsPerPageControl = this.createItemsPerPageControl();
		this.totalItemsControl = this.createTotalItemsControl();
	}
	
}