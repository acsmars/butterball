var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Serve HTTP requests and append console log.
app.get('*' ,function(req, res){
	  res.sendFile(__dirname + '/http/' + req.url);
	  console.log(__dirname + '/http/' + req.url + ': Served to client.');
});

//Initiate socket daemon
io.on('connection', function(socket) {

	//Report TCP connection in console log.
	console.log('TCP Connection Established:', socket.request.connection._peername);
	
	//Push connection notification to all connected clients.    
	io.emit('debug msg', socket.request.connection._peername.address);
	
	//Report debug msg in console log.
	socket.on('debug msg', function(msg){
	    console.log(msg);
	      });

});

//Listen for connections and request on port 8080
http.listen(8080, function(){
	  console.log('listening on *:8080');
});
