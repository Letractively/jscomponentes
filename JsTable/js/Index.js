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
		tableDespesa.showTable();
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
		var table  = inputCheck.parentNode.parentNode.parentNode.parentNode, check,
		    checks = table.getElementsByTagName('input');
		for(var i=0; i<checks.length; i++) {
			checks[i].checked = inputCheck.checked;
		}
	},
	
	setSelected: function(row) {
		cache[row].selected = !cache[row].selected;
	}
	
};

//inicializacao
window.onload = Index.init;