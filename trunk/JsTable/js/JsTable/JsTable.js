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
	this.classNameForOdd = (params.classNameForOdd) ? params.classNameForOdd : "odd";
	this.classNameForEven = (params.classNameForEven) ? params.classNameForEven : "even";
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
	
	this.setRowNoItemRenderer = function(renderer) {
		this.rowNoItemRenderer = renderer;
	};
	
	this.setHeaderRenderer = function(renderer) {
		this.getHeader = renderer;
	};
	
	this.setFooterRenderer = function(renderer) {
		this.getFooter = renderer;
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
				'<table id="'+ this.tableId +'"'+ this.addClass() +'>'
					+ this.getTagsCol()
					+ this.getHeader()
					+ this.getFooter()
					+ this.getBody()
			+ '</table>';
			
			jQuery('#' + this.containerId).html(tableString);
			
			if(this.pagingContainerId) {
				this.initPaging();
			}
			
			this.setSorter();
			this.stripedTable();
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
		var tbody = "<tbody>", numCols;
		
		if(this.model.getNumRows() > 0) {
			for(var i=0; i<this.model.getNumRows() && i<this.itemsPerPage; i++) {
				tbody += this.rowRenderer(i);
			}
		}
		else {
			tbody  += this.rowNoItemRenderer(this.model);
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
			if(column) {
				if(typeof column.columnRenderer === 'function') {
					rowString += column.columnRenderer(row, col, this.model);
				}
				else {
					rowString += this.columnRenderer(row, col, this.model);
				}
			}
		}
		
		rowString += "</tr>";
		return rowString;
	};
	
	this.rowNoItemRenderer = function() {
		var numCols = this.model.getNumCols();
		return '<td colspan="' + numCols +'" class="'+ this.classNameForOdd +'">Nenhum item foi encontrado.</td>';;
	};
	
	this.rowHeaderRenderer = function(columns) {
		var rowString = "<tr>", column, columnNumber = 0;
		
		for(var index in columns) {
			column = columns[index];
			if(column) {
				if(typeof column.cellHeaderRenderer ===  'function') {
					rowString += column.cellHeaderRenderer(column, columnNumber, this.model);
				}
				else {
					rowString += this.cellHeaderRenderer(column, columnNumber);
				}
			}
			columnNumber++;
		}
		
		rowString += "</tr>";
		return rowString;
	};
	
	this.cellHeaderRenderer = function(cell, columnNumber) {
		var cellString = "";
		cellString = '<th class="' + this.cellIsSorteable(cell) + 'column-'+ columnNumber +'">' + cell.text + '</th>';
		return cellString;
	};
	
	this.cellIsSorteable = function(cell) {
		if(cell.sort != false) {
			return "sortby-" + cell.className + " ";
		}
		return "";
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
			jQuery(this.pagingContainer)
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
			var total = (this.itemsPerPage <= this.model.getNumRows()) ? this.itemsPerPage : this.model.getNumRows();
			jQuery(this.itemsPerPageControl).val(total);
		}
	}
	
	this.setStatusPaging = function() {
		if(this.totalPageControl) {
			this.totalPageControl.innerHTML = "/" + this.totalPages;
		}
		if(this.currentPageControl) {
			this.currentPageControl.value =
			this.currentPageControl.defaultValue = this.currentPage;
		}
	};
	
	this.setPagingControls = function() {
		var begin = 0;
		
		//ir para primeira página
		jQuery(this.firstPageControl).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage = 1;
				jsTable.showPagingRows(0, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página anterior
		jQuery(this.prevPageControl).click(function() {
			if(jsTable.currentPage > 1) {
				jsTable.currentPage--;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para próxima página
		jQuery(this.nextPageControl).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage++;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para última página
		jQuery(this.lastPageControl).click(function() {
			if(jsTable.currentPage < jsTable.totalPages) {
				jsTable.currentPage = jsTable.totalPages;
				begin = (jsTable.currentPage-1) * jsTable.itemsPerPage;
				jsTable.showPagingRows(begin, jsTable.itemsPerPage);
				jsTable.setStatusPaging();
			}
		});
		
		//ir para página informada
		jQuery(this.currentPageControl).keydown(function(e) {
			if(e.keyCode == 13) {
				var numPage = 1;
				
				if(this.value != "") {
					numPage = parseInt(this.value);
				}
				if(isNaN(numPage)) {
					this.value = this.defaultValue;
					return false;
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
		jQuery(this.itemsPerPageControl).keydown(function(e) {
			if(e.keyCode == 13) {
				var numItems = 1;
		
				if(this.value != "") {
					numItems = parseInt(this.value);
				}
				
				if(isNaN(numItems)) {
					this.value = this.defaultValue;
					return false;
				}
				
				if(numItems > 100) {
					numItems = 100;
				} 
				else if(numItems <= 0) {
					numItems = 1;
				}
				
				this.value = numItems;
				
				jsTable.setPaging(numItems);
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
			
			jQuery(tbody).html("");
			
			for(var index=begin, i=0; index<this.model.getNumRows() && i<n; index++, i++) {
				jQuery(tbody).append(this.rowRenderer(index));
			}
			
			this.stripedTable();
		}
	};
	
	//------------------ componentes para paginação --------------------------------------
	
	this.createFirstPageControl = function() {
		var pageControl = jQuery('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-first.png',
			'id': jsTable.tableId + "-first",
			'class' : 'first',
			'alt' : 'Início',
			'title' : 'Início'
		}).get(0);
		return pageControl;
	};
	
	this.createPrevPageControl = function() {
		var pageControl = jQuery('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-prev.png',
			'id': jsTable.tableId + "-prev",
			'class' : 'prev',
			'alt' : 'Anterior',
			'title' : 'Anterior'
		}).get(0);
		return pageControl;
	};
	
	this.createCurrentPageControl = function() {
		var pageControl = jQuery('<input />').attr({
			'type': 'text',
			'id': jsTable.tableId + "-currentPage",
			'class' : 'currentPage',
			'maxlength' : 3,
			'value' : 1,
			'defaultValue': 1
		}).get(0);
		return pageControl;
	};
	
	this.createTotalPageControl = function() {
		var pageControl = jQuery('<span />').attr({
			'id': jsTable.tableId + "-totalPages",
			'class' : 'totalPages'
		})
		.text('/ ' + jsTable.totalPages)
		.get(0);
		return pageControl;
	};
	
	this.createNextPageControl = function() {
		var pageControl = jQuery('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-next.png',
			'id': jsTable.tableId + "-next",
			'class' : 'next',
			'alt' : 'Próximo',
			'title' : 'Próximo'
		}).get(0);
		return pageControl;
	};
	
	this.createLastPageControl = function() {
		var pageControl = jQuery('<img />').attr({
			'src': jsTable.contextpath + 'images/pag-last.png',
			'id': jsTable.tableId + "-last",
			'class' : 'last',
			'alt' : 'Último',
			'title' : 'Último'
		}).get(0);
		return pageControl;
	};
	
	this.createItemsPerPageControl = function() {
		var pageControl = jQuery('<input />').attr({
			'type': 'text',
			'id': jsTable.tableId + "-itemsPerPage",
			'class' : 'itemsPerPage',
			'maxlength' : 3,
			'value' : jsTable.itemsPerPage,
			'defaultValue' : jsTable.itemsPerPage
		}).get(0);
		return pageControl;
	};
	
	this.createTotalItemsControl = function() {
		var pageControl = jQuery('<span />').attr({
			'id': jsTable.tableId + "-totalItems",
			'class' : 'totalItems'
		})
		.text(0)
		.get(0);
		return pageControl;
	};
	
	this.createInputSearch = function() {
		var input = jQuery('<input />').attr({
			'type': 'text',
			'id': jsTable.tableId + "-inputSearch",
			'class' : 'search'
		})
		.get(0);
		return input;
	};
	
	//-------------------- stripedTable --------------------------------
	
	this.stripedTable = function() {
		var table = document.getElementById(this.tableId),
		    tbody = table.tBodies[0],
				rows  = tbody.rows, className, row;
				
		for(var i=0; i<rows.length; i++) {
			row = rows[i];
			if(i%2) {
				className = this.classNameForOdd;
			}
			else {
				className = this.classNameForEven;
			}
			jQuery(row).addClass(className);
		}
	};

	//-------------------- controles para ordenação --------------------------------
	
	this.setSorter = function() {
		var table = document.getElementById(this.tableId),
		    thead = table.tHead,
				ths   = thead.rows[thead.rows.length-1].cells,
				th, columnName, columnNumber, factor,
				columns = this.model.getColumns();
		
		for(var i=0; i<ths.length; i++) {
			th = ths[i];
			if(columns[i].sort != false) {
				th.asc = true;
				if(th.className.indexOf('sortby-') > -1) {
					jQuery(th).click(function(){
						columnName   = this.className.match(/sortby-(\w+)/)[1];
						columnNumber = this.className.match(/column-(\d+)/)[1];
						
						if(this.asc) {
							factor = 1;
							this.asc = false;
						}
						else {
							factor = -1;
							this.asc = true;
						}
						
						if(typeof columns[columnNumber].sortBy == 'function') {
							columns[columnNumber].sortBy(columnName, columnNumber, jsTable.model, factor);
						}
						else {
							jsTable.sortBy(columnName, columnNumber, jsTable.model, factor);
						}
						
						jsTable.showPagingRows(0, jsTable.itemsPerPage);
						jsTable.currentPage = 1;
						jsTable.setStatusPaging();
					});
				}
			}
		}
	};
	
	this.sortBy = function(columnName, columnNumber, model, factor) {
		if(model.getNumRows() > 0) {
			var rawData = model.getRawData(), valor1, valor2
					index   = (rawData[0].length) ? columnNumber : columnName;
			
			rawData.sort(function(a, b) {
				valor1 = jsTable.removeEspecialChars(a[index]);
				valor2 = jsTable.removeEspecialChars(b[index]);
				
				if(valor1 > valor2) return  1 * factor;
				if(valor1 < valor2) return -1 * factor;
				
				return 0;
			});
		}
	};
	
	this.removeEspecialChars = function(text) {
		var result = "";
		if(text) {
			text = text.toString().toLowerCase();
			text = text.replace(/[ÁÀÂÃ]/g, "A");
			text = text.replace(/[áàâã]/g, "a");
			text = text.replace(/[ÉÈÊ]/g, "E");
			text = text.replace(/[éèê]/g, "e");
			text = text.replace(/[ÍÌÎ]/g, "I");
			text = text.replace(/[íìî]/g, "i");
			text = text.replace(/[ÓÒÔÕ]/g, "O");
			text = text.replace(/[óòôõ]/g, "o");
			text = text.replace(/[ÚÙÛÜ]/g, "U");
			text = text.replace(/[úùûü]/g, "u");
			text = text.replace(/Ç/g, "C");
			text = text.replace(/ç/g, "c");
			result = text;
		}
		return result;
	}
	
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