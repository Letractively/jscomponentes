/**
 * Index.js
 * Script para teste do JsTable.js
 */
var Index = {

	init: function() {
		Index.showTableProdutos();
		//Index.showTableProdutosAdvance();
	},
	
	showTableProdutos: function() {
		var jsTableProduto = new JsTable ({
			tableId: 'produtos',
			containerId: 'wrapper-produto',
			classNames: 'report',
			itensForPage: 10
		});
		
		var jsTableModel = new JsDefaultTableModel (
			CacheProduto.columns,
			CacheProduto.tableData
		);
		
		jsTableProduto.setTableModel(jsTableModel);
		jsTableProduto.showTable();
	},
	
	showTableProdutosAdvance: function() {
		var jsTableProdutoAdvance = new JsTable();
		
		jsTableProdutoAdvance.setTableModel({
			tableId: 'produtos'
		});
		
		jsTableProdutoAdvance.showTable();
	}
	
};

//inicializacao
window.onload = Index.init;