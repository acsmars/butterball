var socket = io();

socket.on('debug msg', function(msg){
	    $('#debug').append($('<li>').text(msg));
	      });
 
