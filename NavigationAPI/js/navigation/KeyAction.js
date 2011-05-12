/**
 * Class Key Navigation
 */
var KeyAction = function(key) {

	//TODO relate more than one key
	if(!key || key == null) {
		var message = 'Please, inform the Key for this action.';
		alert(message);
		throw new Error(message);
		return false;
	}
	
	//public members
	this.key = key;
	
	this.setBefore = function(beforeCallback) {
		this.before = beforeCallback;
	}
	
	this.setExecute = function(executeCallback) {
		this.execute = executeCallback;
	}
	
	this.setAfter = function(afterCallback) {
		this.after = afterCallback;
	}
	
};