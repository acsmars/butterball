/**
 * Pushes the statePackage via socket to server as a JSON.
 * @Param {string} Stringified JSON state package to be passed to server
 */
function pushState (statePackage) {
	socket.emit('tickEvent', statePackage);
	}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
	function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
	
	return uuid;
};
