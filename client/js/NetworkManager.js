/**
 * Pushes the statePackage via socket to server as a JSON.
 * @Param {string} Stringified JSON state package to be passed to server
 */
function pushState (statePackage) {
	socket.emit('tickEvent', statePackage);
	}
