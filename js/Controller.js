/*
	Controller which listens for key input and controls 
*/
var Controller = function (canvas_container) {
	document.onkeydown = checkKey;
	function checkKey(e) {

		//Finds a paddle object and applies adjustments from input keys to its position
		for (var i in objs) {
            if (objs[i].type == "paddle") {
        		var paddle = objs[i];        
            }
        }

	    if (e.keyCode == '38') {
	        console.log("up pressed \n");
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	    }
	    else if (e.keyCode == '37') {
	       console.log("left pressed \n");
	       paddle.x = paddle.x - 8;
	    }
	    else if (e.keyCode == '39') {
	       console.log("left pressed \n");
	       paddle.x = paddle.x + 8;
    }

}
};