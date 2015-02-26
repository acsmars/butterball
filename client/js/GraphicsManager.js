/**
 * GraphicsManager creates, initializes, and manages an HTML5 canvas for ButterBall.
 */
var GraphicsManager = function (canvas_container, width, height, phys_width, phys_height, gfx_window_width, gfx_window_height, player_position) {
    // html5 canvas objects
    var canvas = null;
    var context = null;

    // the width and height of the actual playing field
    var pw = null;
    var ph = null;

    // default colors
    var default_border_color = "#402E27"; // dark brown
    var default_background_color = "#F2DEA0"; // wheat
    var default_ball_color = "#8C6542"; // brown
    var default_wall_color = "#8C6542"; // brown
    var default_paddle_color = "#8C6542"; // brown
    var default_text_color = "#D9AB80"; // tan

    // border and scoring information
    var border_width = 30;
    this.border_color = default_border_color;
    this.score_color = default_text_color;

    /**
     * Initialize HTML5 canvas
     * @param  {div} canvas_container Div container for the HTML5 canvas
     * @param  {int} width            The width of the canvas. Defaults to 500.
     * @param  {int} height           The height of the canvas. Defaults to 500.
     */
    function init() {
        // set default values
        width = typeof width !== 'undefined' ? width : 1000;
        height = typeof height !== 'undefined' ? height : 1000;
        pw = typeof phys_width !== 'undefined' ? phys_width : width;
        ph = typeof phys_height !== 'undefined' ? phys_height : height;
        gfx_window_width = typeof gfx_window_width !== 'undefined' ? gfx_window_width : width;
        gfx_window_height = typeof gfx_window_height !== 'undefined' ? gfx_window_height : height;

        // create the canvas
        canvas = document.createElement('canvas');

        // attach the canvas to its container
        canvas_container.appendChild(canvas);

        // get the 2d context
        context = canvas.getContext('2d');

        // resize the canvas
        context.canvas.width = gfx_window_width;
        context.canvas.height = gfx_window_height;
    }

    /**
     * Draw objects to the screen
     * @param  {Array} objects The object to draw on the screen
     * @param {Array} score An array of score for the current game with team 1's score first, and so on
     */
    this.draw = function (objects, score) {
        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // fill the background
        drawRectangle(0, 0, pw, ph, default_background_color);

        // undo rotation
        undoRot(player_position);

        // draw all game objects
        for (var i in objects) {
            if (objects[i].type == "wall") {
                drawRectangle(objects[i].x, objects[i].y, objects[i].width, objects[i].height, default_wall_color);
            } else if (objects[i].type == "ball") {
                drawCircle(objects[i].x, objects[i].y, objects[i].r, objects[i].color);
            } else if (objects[i].type == "paddle") {
                drawRectangle(objects[i].x, objects[i].y, objects[i].width, objects[i].height, default_paddle_color);
            }
        }

        // rotate the canvas into position
        rotateDown(player_position);

        // draw the border and score
        this.drawBorder();
        this.drawScore(score);

    };

    /**
     * Draw a circle to the canvas
     * @param  {float} x      The x coordinate of the center of the circle
     * @param  {float} y      The y coordinate of the cente of the circle
     * @param  {color} color  The color of the circle. Defaults to the default ball color.
     * @param  {float} radius The radius of the circle. Defaults to 3.0
     */
    function drawCircle(x, y, radius, color) {
        // set default values
        color = color !== null ? color : default_ball_color;
        radius = typeof radius !== 'undefined' ? radius : 3.0;

        // scale the objects to pixels
        x = scaleX(x);
        y = scaleY(y);
        radius = (scaleX(radius) + scaleY(radius))/2;

        // create the circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.closePath();

        // color the circle
        context.fillStyle = color;
        context.fill();
    }

    /**
     * Draw the border of the playing field to the screen
     */
    this.drawBorder = function () {
        drawRectangle(0, 0, pw, border_width, this.border_color);                                            // top
        drawRectangle(0, ph-border_width, pw, border_width, this.border_color);      // bottom
        drawRectangle(0, 0, border_width, ph, this.border_color);                                           // left
        drawRectangle(pw-border_width, 0, border_width, ph, this.border_color);      // right
    };

    /**
     * Draw the score over the border of the playing field
     */
    this.drawScore = function (score) {
        context.fillStyle = this.score_color;
        context.font = "bold " + scaleX(border_width)*0.75 + "px Arial";
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        for (var i =0; i<score.length; i++) {
            context.fillText("Team " + (i + 1) + ": " + score[i], scaleX(border_width)*1.1 + scaleX(border_width)*(5*i), scaleX(border_width)/2);
        }
    };

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
        color = typeof color !== 'undefined' ? color : default_wall_color;

        // scale the real coordinates to pixel coordinates
        x = scaleX(x);
        y = scaleY(y);
        width = scaleX(width);
        height = scaleY(height);

        // set the rectangle's color
        context.fillStyle = color;

        // create the rectangle
        context.fillRect(x, y, width, height);
    }

    /**
     * scale an actual x position to a graphical y position
     * @param  {float} x The real world coordinate
     * @return {float}   The pixel world coordinate
     */
    scaleX = function (x) {
        return context.canvas.width*(x/pw);
    };

    /**
     * scale an actual y position to a graphical y position
     * @param  {float} y The real world coordinate
     * @return {float}   The pixel world coordinate
     */
    scaleY = function (y) {
        return context.canvas.height*(y/ph);
    };

    /**
     * scale an actual y position to a graphical y position. USE ONLY FOR TESTING!
     * @param  {float} y The real world coordinate
     * @return {float}   The pixel world coordinate
     */
    this.testScaleY = function (y) {
        return scaleY(y);
    };

    /**
     * scale an actual x position to a graphical x position. USE ONLY FOR TESTING!
     * @param  {float} x The real world coordinate
     * @return {float}   The pixel world coordinate
     */
    this.testScaleX = function (x) {
        return scaleX(x);
    };

    /**
     * Set the border width of the playing field
     * @param {int} w The new width
     */
    this.setBorderWidth = function (w) {
        border_width = w;
    };

    /**
     * Rotate the playing field so that the player always sees his/her goal
     * at the bottom of the screen
     * @param  {char} player_position The position of the player. t = top, b = bot, u = up, d = down
     */
    function rotateDown(player_position) {
        switch (player_position) {
            case 'd':
                return;
            case 'u':
                context.translate(context.canvas.width, context.canvas.height);
                context.rotate(Math.PI);
                return;
            case 'l':
                context.translate(0, context.canvas.height);
                context.rotate(Math.PI * 1.5);
                return;
            case 'r':
                context.translate(context.canvas.width, 0);
                context.rotate(Math.PI * 0.5);
                return;
        }
    }

    /**
     * Undoes the rotate down function
     * @param  {char} player_position The position of the player. t = top, b = bot, u = up, d = down
     */
    function undoRot(player_position) {
        switch (player_position) {
            case 'd':
                return;
            case 'u':
                rotateDown('u');
                return;
            case 'l':
                rotateDown('r');
                return;
            case 'r':
                rotateDown('l');
                return;
        }
    }

    // initialize the oject
    init(canvas_container, width, height, phys_width, phys_height);
};