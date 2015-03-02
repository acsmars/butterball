/**
 * The GameManager controls the flow of the game. It manages objects (ball, paddles, walls, etc.),
    physics (passed through the SimplePhysicsEngine, graphics (using functions from GraphicsManager.js),
    and gameplay (score, win/lose, power-ups, etc.)
 */

 // Do we need params for this? Are we creating the objects in the GameManager or just
 // passing them by reference from index.html to each of the scripts?
 var GameManager = function()
 {
    // graphics manager
    var w = window.innerHeight;
    var h = window.innerHeight;
    var gfx = new GraphicsManager(document.getElementById("canvas_container"), w, h, w, h, w, h, 2, 1);

    // physics engine
    var phys = new SimplePhysicsEngine(0);

    // controller1
    var con = [
        new Controller(1, 38, 40, 37, 39),
        new Controller(1, 87, 83, 65, 68)
    ];

    // some test objects - these are the same ones that are in index.html
    var objs = [
        new wall(0, 0, h, 30), // top
        new wall(0, 0, 30, w), // left
        new wall(w - 30, 0, 30, h), // right
        new wall(0, h - 30, w, 30), // bot
        new ball('green', 50, 50, 10, 3, 3),
        new paddle('red', 400, 400, 70, 10),
        new paddle('blue', 200, 400, 70, 10)];

    // The first player will be player number 0 for code purposes
    var scores = [0, 0, 0];

    gfx.draw(objs, scores);

    objs[0].owner = "Team1";
    objs[1].owner = "Team2";
    objs[2].owner = "Team3";

    // update loop set at one update every 10ms
    //It would be intensive to check for every object being a paddle every step, in the future we will implement a one time function taht identifies controllers matching paddle objects
    window.setInterval(function() {
        phys.step(objs, scores, 1);
        gfx.draw(objs, scores);
        con[0].checkKey(objs[5]);
        con[1].checkKey(objs[6]);
    }, 10);
};