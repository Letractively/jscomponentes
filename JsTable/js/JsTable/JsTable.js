/**
 * JsTable
 * Componente para criar e manipular uma 
 * tabela a partir de um table model JSON
 */
var JsTable = function(params) {

	//atributo privado
	var jsTable = this;
	
	//atributos
	this.tableId      = (params.tableId) ? params.tableId : null;
	this.containerId  = (params.containerId) ? params.containerId : null;
	this.pagingId     = (params.pagingId) ? params.pagingId : null;
	this.classNames   = (params.classNames) ? params.classNames : null;
	this.model        = {};
	this.errors       = [];
	
	//atributos para paginação
	this.itemsPerPage = (params.itemsPerPage) ? params.itemsPerPage : 10;
	
	if(this.pagingId) {
		this.currentPage = 1;
		this.totalPages  = 0;
		this.pagingContainer = document.getElementById(this.pagingId);
		this.showTotalPage = $('.totalPages', this.pagingContainer).get(0);
		this.showTotalItems = $('.totalItems', this.pagingContainer).get(0);
		this.inputCurrentPage = $('.currentPage', this.pagingContainer).get(0);
		this.inputItemsPerPage = $('.itemsPerPage', this.pagingContainer).get(0);
	}	
	
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
			
			if(this.pagingId) {
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
		this.setPaging(this.itemsPerPage);
		this.setPagingControls();
		this.showTotalItens();
	};
	
	this.setPaging = function(itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
		var totalPages = Math.ceil(this.model.getNumRows() / this.itemsPerPage);
		if(totalPages === 0) {
			totalPages = 1;
		}
		this.totalPages = totalPages;
		this.setStatusPaging();
	};
	
	this.showTotalItens = function() {
		if(this.showTotalItems) {
			this.showTotalItems.innerHTML = this.model.getNumRows();
		}
	};
	
	this.setStatusPaging = function() {
		if(this.showTotalPage) {
			this.showTotalPage.innerHTML = "/" + this.totalPages;
		}
		if(this.currentPage) {
			this.currentPage.value =
			this.currentPage.defaultValue = this.currentPage;
		}
	};
	
	this.setPagingControls = function() {
		var divPagination = this.pagingContainer,
		    begin = 0;
		
		//ir para primeira página
		$('.first', divPagination).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage = 1;
				jsTable.showPagingRows(0, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página anterior
		$('.prev', divPagination).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage--;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para próxima página
		$('.next', divPagination).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage++;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para última página
		$('.last', divPagination).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage = jsTable.totalPages;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página informada
		$(this.inputCurrentPage).keydown(function(e) {
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
		$(this.inputItemsPerPage).keydown(function(e) {
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
				rowStr += this.rowRenderer(i);
				$(tbody).append(rowStr);
			}
			
		}
	};

}