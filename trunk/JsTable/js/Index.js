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
		var jsTableProduto = new JsTable ({
			tableId: 'produtos',
			containerId: 'wrapper-produto',
			classNames: 'report',
			itensForPage: 5
		});
		
		var jsTableModel = new JsDefaultTableModel (
			CacheProduto.columns,
			CacheProduto.tableData
		);
		
		jsTableProduto.setTableModel(jsTableModel);
		jsTableProduto.showTable();
	},
	
	showTableProdutosAdvance: function() {
		var jsTableCCusto = new JsTable({
			tableId: 'ccusto',
			containerId: 'wrapper-ccusto'
		});
		
		var jsTableModel = new MyTableModel(cache);
		
		jsTableCCusto.setTableModel(jsTableModel);
		jsTableCCusto.showTable();
	}
	
};

//inicializacao
window.onload = Index.init;