/**
 * Index.js
 * Script para teste do JsTable.js
 */
var Index = {

	init: function() {
		Index.showTableProdutos();
		Index.showTableProdutosAdvance();
	},
	
	showTableProdutos: function() {
		var tableProduto = new JsTable ({
			tableId: 'produtos',
			containerId: 'wrapper-produto',
			pagingContainerId: 'page-produto',
			classNames: 'report',
			itemsPerPage: 4
		});
		
		tableProduto.setTableModel(Index.getProdutoTableModel());
		tableProduto.showTable();
	},
	
	showTableProdutosAdvance: function() {
		var tableCCusto = new JsTable ({
			tableId: 'ccusto',
			containerId: 'wrapper-ccusto',
			pagingContainerId: 'page-ccusto',
			itemsPerPage: 8
		});
		
		tableCCusto.setTableModel(new MyTableModel(cache));
		tableCCusto.showTable();
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