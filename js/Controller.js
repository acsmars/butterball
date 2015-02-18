/*
	Controller which listens for key input and controls 
*/
var Controller = function (canvas_container) {
	// key events
	keys = [];

	document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
	document.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});	
	

	function checkKey(e) {
		//Finds a paddle object and applies adjustments from input keys to its position
		//Later versions will have settings for which paddle is bound to which keys
		for (var i in objs) {
            if (objs[i].type == "paddle") {
        		var paddle = objs[i];        
            }
        }

	    if (keys[38]) {
	        paddle.y = paddle.y - 1;
	    }
	    if (keys[40]) {
	        paddle.y = paddle.y + 1;
	    }
	    if (keys[37]) {
	       paddle.x = paddle.x - 1;
	    }
	    if (keys[39]) {
	       paddle.x = paddle.x + 1;
    	}
	}
	//Presently invoked once per millisecond, should be invoked by physics engine later
	//It is important that the physics engine control the controller updates so taht paddles move with the same lag as the ball
	var paddleControlUpdateInterval = setInterval(function () {checkKey()},1);
};
