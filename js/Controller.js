/*
	Controller which listens for key input and controls 
*/
var Controller = function (paddle) {
	// key events
	keys = [];


	document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
	document.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});	
	
	var up = 38;
	var down = 40;
	var left = 37;
	var right = 39;
	var vx, vy;

	function checkKey(e) {
		//Finds a paddle object and applies adjustments from input keys to its position
		//Later versions will have settings for which paddle is bound to which keys

	    if (keys[up]) paddle.vy = -1;
	    else paddle.vy = 0;
	    if (keys[down]) paddle.vy = 1;
	    else paddle.vy = 0;
	    if (keys[left]) paddle.vx = -1;
	    else paddle.vx = 0;
	    if (keys[right]) paddle.vx = 1;
	    else paddle.vx = 0;
	}
	//Presently invoked once per millisecond, should be invoked by physics engine later
	//It is important that the physics engine control the controller updates so taht paddles move with the same lag as the ball
	var paddleControlUpdateInterval = setInterval(function () {checkKey()},10);
};
