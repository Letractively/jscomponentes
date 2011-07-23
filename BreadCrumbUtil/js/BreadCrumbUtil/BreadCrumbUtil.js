/**
 *
 * Objeto Literal BreadCrumbUtil
 * This script is for tracking bread crumb in portal
 * 
 */
var BreadCrumbUtil = {
	
	ID: 'breadCrumbStack',
	stack: [],
	current: null,
	
	addToStack: function(breadCrumb) {
		if(breadCrumb instanceof BreadCrumb) {
			this.stack.push(breadCrumb);
		}
	},
	
	retriveStack: function() {
		// TODO: make ajax call here from back end
		var jsonText = Cookie.get(BreadCrumbUtil.ID);
		if(jsonText) {
			BreadCrumbUtil.stack = JSON.parse(jsonText);
			var bc = BreadCrumbUtil.getLastBC();
			if(bc && bc.url == document.location.href) {
				BreadCrumbUtil.current = BreadCrumbUtil.stack.pop();
			}
		}
	},
	
	addCurrentUrl: function() {
		var bc = new BreadCrumb();
		BreadCrumbUtil.addToStack(bc);
	},
	
	reset: function() {
		this.stack = [];
		this.current = null;
	},
	
	saveStack: function() {
		try {
			var jsonText = JSON.stringify(BreadCrumbUtil.stack);
			// TODO: make ajax call here for save sack in back end
			Cookie.set(BreadCrumbUtil.ID, jsonText, null, contextpath);
		}
		catch(e) {
			throw "Don't possible to save the bread crumb stack, error: " + e.message;
		}
	},
	
	getLastBC: function() {
		var stack = BreadCrumbUtil.stack;
		if(stack.length > 0) {
			return stack[stack.length - 1];
		}
		return null;
	},
	
	goToPreviousPage: function() {
		var bc = BreadCrumbUtil.getLastBC();
		if(bc) {
			document.location.href = bc.url;
		}
		else {
			document.location.href = contextpath + '/start';
		}
	}
	
};


/**
 * Transfer Object for BreadCrumb
 */
var BreadCrumb = function(url) {
	this.url = (url == null) ? document.location.href : url;
	this.params = null;
}

//inicialization
$(function(){
	BreadCrumbUtil.retriveStack();
});

//update bread crumb
$(window).unload(function(){
	BreadCrumbUtil.saveStack();
});