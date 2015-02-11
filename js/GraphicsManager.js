/**
 * GraphicsManager creates, initializes, and manages an HTML5 canvas for ButterBall.
 */
var GraphicsManager = function (canvas_container, width, height) {
    var canvas = null;
    var context = null;

    var wall_color = null;
    var ball_color = null;

    /**
     * Initialize HTML5 canvas
     * @param  {div} canvas_container Div container for the HTML5 canvas
     * @param  {int} width            The width of the canvas. Defaults to 500.
     * @param  {int} height           The height of the canvas. Defaults to 500.
     */
    function init(canvas_container, width, height) {
        // set default values
        width = typeof width !== 'undefined' ? width : 1000;
        height = typeof height !== 'undefined' ? height : 1000;

        // create the canvas
        canvas = document.createElement('canvas');

        // attach the canvas to its container
        canvas_container.appendChild(canvas);

        // get the 2d context
        context = canvas.getContext('2d');

        // resize the canvas
        context.canvas.width = width;
        context.canvas.height = height;
    }

    /**
     * Draw objects to the screen
     * @param  {Array} objects The object to draw on the screen
     */
    this.draw = function (objects, score) {
        // set default values
        score = typeof score !== 'undefined' ? score : 0;

        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i in objects) {
            if (objects[i].type == "wall") {
                drawRectangle(objects[i].x, objects[i].y, objects[i].width, objects[i].height, 'black');
            } else if (objects[i].type == "ball") {
                drawCircle(objects[i].x, objects[i].y, objects[i].color, objects[i].r);
            } else if (objects[i].type == "paddle") {
                drawRectangle(objects[i].x, objects[i].y, objects[i].width, objects[i].height, 'red');
            }
        }

    };

    /**
     * Draw a circle to the canvas
     * @param  {float} x      The x coordinate of the center of the circle
     * @param  {float} y      The y coordinate of the cente of the circle
     * @param  {color} color  The color of the circle. Defaults to the default ball color.
     * @param  {float} radius The radius of the circle. Defaults to 3.0
     */
    function drawCircle(x, y, color, radius) {
        // set default values
        color = typeof color !== 'undefined' ? color : 'green';
        radius = typeof radius !== 'undefined' ? radius : 3.0;

        // create the circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.closePath();

        // color the circle
        context.fillStyle = color;
        context.fill();
    }

    /**
     * Draw a rectangle to the canvas
     * @param  {float} x      The x coordinate of the top left corner of the rectangle
     * @param  {float} y      The y coordinate of the top left corner of the rectangle
     * @param  {float} width  The width of the rectangle
     * @param  {float} height The height of the rectangle
     * @param  {color} color  The color of the rectangle. Defaults to the default wall color.
     */
    function drawRectangle(x, y, width, height, color) {
        // set default values
        color = typeof color !== 'undefined' ? color : 'green';

        // set the rectangle's color
        context.fillStyle = color;

        // create the rectangle
        context.fillRect(x, y, width, height);
    }

    init(canvas_container, width, height);
};