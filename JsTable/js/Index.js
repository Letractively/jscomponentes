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
			pagingId: 'page-produto',
			classNames: 'report',
			itemsPerPage: 3
		});
		
		tableProduto.setTableModel(Index.getProdutoTableModel());
		tableProduto.showTable();
	},
	
	showTableProdutosAdvance: function() {
		var jsTableCCusto = new JsTable({
			tableId: 'ccusto',
			pagingId: 'page-ccusto',
			containerId: 'wrapper-ccusto',
			itemsPerPage: 9
		});
		
		jsTableCCusto.setTableModel(new MyTableModel(cache));
		jsTableCCusto.showTable();
	},
	
	getProdutoTableModel: function() {
		var tableModel = new JsDefaultTableModel (
			CacheProduto.columns,
			CacheProduto.tableData
		);
		return tableModel;
	}
	
};

//inicializacao
window.onload = Index.init;