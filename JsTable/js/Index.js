/**
 * Index.js
 * Script para teste do JsTable.js
 */
var Index = {

	init: function() {
		Index.showTableProdutos();
		Index.showTableProdutosAdvance();
		Index.showTableDespesa();
	},
	
	showTableProdutos: function() {
		var tableProduto = new JsTable ({
			tableId: 'produtos',
			containerId: 'wrapper-produto',
			pagingContainerId: 'page-produto',
			classNames: 'report',
			itemsPerPage: 2
		});
		
		tableProduto.setTableModel(Index.getProdutoTableModel());
		tableProduto.showTable();
	},
	
	showTableProdutosAdvance: function() {
		var tableCCusto = new JsTable ({
			tableId: 'ccusto',
			containerId: 'wrapper-ccusto',
			pagingContainerId: 'page-ccusto',
			itemsPerPage: 2
		});
		
		tableCCusto.setTableModel(new MyTableModel(cache));
		tableCCusto.showTable();
	},

	showTableDespesa: function() {
		var tableDespesa = new JsTable ({
			tableId: 'despesa',
			containerId: 'wrapper-despesa',
			pagingContainerId: 'page-despesa',
			itemsPerPage: 8
		});
		
		tableDespesa.setTableModel(new DespesaTableModel(cacheDespesa));
		tableDespesa.setFooterRenderer(Index.getFooter);
		tableDespesa.showTable();
	},

	
	
	getFooter: function() {
		var footer = '<tfoot>', model = this.model;
		footer += 
			'<tr>'
				+ '<td colspan="5">&nbsp;</td>'
				+ '<td class="label-total">Total</td>'
				+ '<td class="number">' + model.getTotal(6) + '</td>'
				+ '<td colspan="3">&nbsp;</td>'
		+ '</tr>'
		footer += '</tfoot>'
		return footer;
	},
	
	
	getProdutoTableModel: function() {
		var tableModel = new JsDefaultTableModel (
			CacheProduto.columns,
			CacheProduto.tableData
		);
		return tableModel;
	},
	
	setSelectedAll: function(inputCheck) {
		for(var index in cache) {
			cache[index].selected = inputCheck.checked;
		}
		Index.setInputsChecked(inputCheck);
	},
	
	setInputsChecked: function(inputCheck) {
		var table = $(inputCheck).parents('table').get(0);
		if(table) {
			$('input[name=produtoIds]', table).each(function() {
				this.checked = inputCheck.checked;
			});
		}
	},
	
	setSelected: function(row) {
		cache[row].selected = !cache[row].selected;
	}
	
};

//inicializacao
window.onload = Index.init;