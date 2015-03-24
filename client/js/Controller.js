/*
Controller which listens for key input and controls 

UP, DOWN, LEFT, RIGHT: 38,40,37,39
WASD: 87, 83, 65, 68
*/
var Controller = function (id,upKey,downKey,leftKey,rightKey) {
    // paddle Controller
    function init() {};
    // key events
    keys = [];
    var controllerID = id;
    var up = upKey, down = downKey, left = leftKey, right = rightKey;

    document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
    document.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});

    this.rotate = function (orientation) {
        switch(orientation) {
            case 'd':
                return;
            case 'u':
                up = downKey;
                down = upKey;
                left = rightKey;
                right = leftKey;
                break;
            case 'r':
                up = leftKey;
                down = rightKey;
                left = downKey;
                right = upKey;
                break;
            case 'l':
                up = rightKey;
                down = leftKey;
                left = upKey;
                right = downKey;
                break;
            default:
                break;
        }
    };


    this.checkKey = function (paddle) {
        //Finds a paddle objecat and applies adjustments from input keys to its position
        //Later versions will have settings for which paddle is bound to which keys
        
        if (keys[up] && keys[down]) paddle.vy = 0;
        else if (keys[up]) paddle.vy = -6;
        else if (keys[down]) paddle.vy = 6;
        else paddle.vy = 0;
        
        if (keys[left] && keys[right]) paddle.vx = 0;
        else if (keys[left]) paddle.vx = -6;
        else if (keys[right]) paddle.vx = 6;
        else paddle.vx = 0;

    };
    init(paddle);
};
