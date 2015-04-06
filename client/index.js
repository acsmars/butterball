var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Serve HTTP requests and append console log.
app.get('*' ,function(req, res){
	  res.sendFile(__dirname + req.url);
	  //console.log(__dirname + req.url + ': Served to client.');
});

//Initiate socket daemon
io.on('connection', function(socket) {

	//Report TCP connection in console log.
	console.log('TCP Connection Established:', socket.request.connection._peername);
	
	//Report debug msg in console log.
	socket.on('tickEvent', function(tickPkg){
	    console.log(tickPkg);
	    io.emit('statePush', tickPkg);
	    console.log('Push');
	    });
});

//Listen for connections and request on port 8080
http.listen(8080, function(){
	  console.log('Listening on *:8080');
});
