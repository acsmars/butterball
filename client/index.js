var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stateCache = []

//Serve HTTP requests and parse get params for multiplayer.
app.get('/game.html' ,function(req, res){
	var id = req.param('id');
	res.sendFile(__dirname + '/game.html')
});

app.get('*' ,function(req, res){
	  res.sendFile(__dirname + req.url);
});

//Initiate socket daemon
io.on('connection', function(socket) {

	//Report TCP connection in console log.
	console.log('TCP Connection Established:', socket.request.connection._peername);
	
	//Store received tickEvents
	socket.on('tickEvent', function(tickPkg){
	    pkg = JSON.parse(tickPkg)
	    var paddle = pkg[1];
	    var id = pkg[0];
	    
            //Update cache based on recent tick if object is owned/passed	    
	    stateCache[id] = paddle;
	    for(var i=2; i<=4; i++){
	    	if(pkg[i] !== 'null'){
			stateCache[i+4] = pkg[i];
		}
	    }

	//Push state update to client at 1000ms intervals.    
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
