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
	    var paddle = JSON.parse(tickPkg)[1];
	    var id = JSON.parse(tickPkg)[0];
	    	    
	    stateCache[id] = paddle;
	    
	    for(var i=2; i<=4; i++){
	    	if(JSON.parse(tickPkg)[i] !== 'null'){
			stateCache[i+4] = JSON.parse(tickPkg)[i];
		}
	    }
	    
	setInterval(function () {
		io.emit('statePush', stateCache);
		console.log(stateCache);		
		}, 1000);
});
	});

//Listen for connections and request on port 8080
http.listen(8080, function(){
	  console.log('Listening on *:8080');
});
