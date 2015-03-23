var socket = io();

/**
 * Pushes the statePackage via socket to server as a JSON.
 * @Param {string} Stringified JSON state package to be passed to server
 */
var pushState = function (statePackage) {
	socket.emit('tickEvent', statePackage);
	});
});
