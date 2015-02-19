var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('*' ,function(req, res){
	  res.sendFile(__dirname + '/http/' + req.url);
	  console.log(__dirname + '/http/' + req.url + ': Served to client.');
});

io.on('connection', function(socket) {
	    console.log('TCP Connection Established:', socket.request.connection._peername);
});

http.listen(8080, function(){
	  console.log('listening on *:8080');
});
