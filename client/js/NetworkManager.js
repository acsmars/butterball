var socket = io();

socket.on('tickBroadcast', function(msg){
	$('#pushLog').append($('<li>').text(msg));
	});

$(document).ready(function(){
	$('#push').click(function(){
		socket.emit('tickEvent', 'JSON STRING HERE');
		});
});
