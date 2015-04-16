var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stateCache = []
//Serve HTTP requests and append console log.
app.get('/game.html' ,function(req, res){
	var id = req.param('id');
	res.sendFile(__dirname + '/game.html')
});

app.get('*' ,function(req, res){
	  res.sendFile(__dirname + req.url);
	  //console.log(__dirname + req.url + ': Served to client.');
});

//Initiate socket daemon
io.on('connection', function(socket) {

	//Report TCP connection in console log.
	console.log('TCP Connection Established:', socket.request.connection._peername);
	
	//Store received tickEvents
	socket.on('tickEvent', function(tickPkg){
	    //console.log(tickPkg);
	    //io.emit('statePush', tickPkg);
	    //console.log('Push');
	    var paddle = JSON.parse(tickPkg)[1]
	    var id = JSON.parse(tickPkg)[0]

	    if(id == 4){
	    	stateCache[0] = paddle;
	    }
	    if(id == 5){
	    	stateCache[1] = paddle;
	    }
	    });

	setInterval(function () {
		io.emit('statePush', JSON.stringify(stateCache));
		console.log(stateCache);		
		}, 100);
});


//Listen for connections and request on port 8080
http.listen(8080, function(){
	  console.log('Listening on *:8080');
});
