/*
Controller which listens for key input and controls 
*/
var Controller = function (id) {
    // paddle Controller
    function init() {};
    // key events
    keys = [];
    var controllerID = id;

    document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
    document.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});
    
    var up = 38;
    var down = 40;
    var left = 37;
    var right = 39;

    this.checkKey = function (paddle) {
        //Finds a paddle object and applies adjustments from input keys to its position
        //Later versions will have settings for which paddle is bound to which keys
        console.log("paddle| vx:" + paddle.vx + " | vy:"+ paddle.vy);

        if (keys[up] && keys[down]) paddle.vy = 0;
        else if (keys[up]) paddle.vy = -4;
        else if (keys[down]) paddle.vy = 4;
        else paddle.vy = 0;
        
        if (keys[left] && keys[right]) paddle.vx = 0;
        else if (keys[left]) paddle.vx = -4;
        else if (keys[right]) paddle.vx = 4;
        else paddle.vx = 0;

    }
    init(paddle);
};
