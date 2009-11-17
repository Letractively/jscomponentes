/**
 * JsTable
 * Componente para criar e manipular uma 
 * tabela a partir de um table model JSON
 */
var JsTable = function(params) {

	//atributos
	this.tableId      = (params.tableId) ? params.tableId : null;
	this.containerId  = (params.containerId) ? params.containerId : null;
	this.classNames   = (params.classNames) ? params.classNames : null;
	this.itensForPage = (params.itensForPage) ? params.itensForPage : 10;
	this.currentPage  = 1;
	this.errors       = [];
	
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
	
	this.setColumnRenderer = function(renderer) {
		this.columnRenderer = renderer;
	};
	
	//--------- renderers ----------------------------------------------------
	
	this.rowRenderer = function(row) {
		var rowString = "<tr>",
		    columns   = this.model.getColumns();
				
		for(var col = 0; col < columns.length; col++) {
			rowString += this.columnRenderer(row, col);
		}
		
		rowString += "</tr>";
		return rowString;
	};
	
	this.rowHeaderRenderer = function(columns) {
		var rowString = "<tr>", renderer;
		for(var index in columns) {
			if(typeof columns[index].renderer ===  'function') {
				renderer = columns[index].renderer;
				rowString += renderer(columns[index]);
			}
			else {
				rowString += this.cellHeaderRenderer(columns[index]);
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
	
	this.columnRenderer = function(row, col) {
		var cellString = "";
		cellString = "<td>" + this.model.getData(row, col) + "</td>";
		return cellString;
	};
	
	this.setTableModel = function(tableModel) {
		if(tableModel) {
			this.model = tableModel;
			
			if(!this.model.getColumns) {
				this.errors.push("tableModel.getColumns is not defined!");
			}
			
			if(!this.model) {
				this.errors.push("tableModel.model is not defined!");
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
		for(var i=0; i<this.model.getNumRows() && i<this.itensForPage; i++) {
			tbody += this.rowRenderer(i);
		}
		tbody += "</tbody>";
		return tbody;
	};
	
	//--------- métodos para paginação ------------------------------------
	
	this.setPagination = function() {
	};
	
	this.setControllsPagination = function() {
	};
	
	this.setStatusPagination = function() {
	};

}