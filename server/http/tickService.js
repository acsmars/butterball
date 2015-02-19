var socket = io();

socket.on('debug msg', function(msg){
	$('#connectionLog').append($('<li>').text(msg));
	});

socket.on('push msg', function(msg){
	$('#pushLog').append($('<li>').text(msg));
	});

$(document).ready(function(){
	$('#push').click(function(){
		socket.emit('push msg', 'Push from: ');
		});
});
