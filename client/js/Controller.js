/*
Controller which listens for key input and controls 

UP, DOWN, LEFT, RIGHT: 38,40,37,39
WASD: 87, 83, 65, 68
*/
var Controller = function (id,up,down,left,right) {
    // paddle Controller
    function init() {};
    // key events
    keys = [];
    var controllerID = id;

    document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
    document.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});

    this.checkKey = function (paddle) {
        //Finds a paddle object and applies adjustments from input keys to its position
        //Later versions will have settings for which paddle is bound to which keys
        
        if (keys[up] && keys[down]) paddle.vy = 0;
        else if (keys[up]) paddle.vy = -5;
        else if (keys[down]) paddle.vy = 5;
        else paddle.vy = 0;
        
        if (keys[left] && keys[right]) paddle.vx = 0;
        else if (keys[left]) paddle.vx = -5;
        else if (keys[right]) paddle.vx = 5;
        else paddle.vx = 0;

    }
    init(paddle);
};
