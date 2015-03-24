/**
 * The GameManager controls the flow of the game. It manages objects (ball, paddles, walls, etc.),
    physics (passed through the SimplePhysicsEngine, graphics (using functions from GraphicsManager.js),
    and gameplay (score, win/lose, power-ups, etc.)
 */

 
 var GameManager = function()
 {
    // graphics manager
    var w = window.innerHeight;
    var h = window.innerHeight;
    var gfx = new GraphicsManager(document.getElementById("canvas_container"), w, h, w, h, w, h, 2, 1);

    // physics engine
    var phys = new SimplePhysicsEngine(w, h, 10, 0);

    // controller1
    var con = [
        new Controller(1, 87, 83, 65, 68),
        new Controller(1, 38, 40, 37, 39)
    ];

    // some test objects - these are the same ones that are in index.html
    var objs = [
        new wall("red", 0, 0, 30, w,1), // left
        new wall("green", 0, 0, h, 30,1), // top
        new wall("blue", w - 30, 0, 30, h,1), // right
        new wall("yellow", 0, h - 30, w, 30,1), // bot
        new paddle('black', 40, 40, 15, 120),
        new paddle('black', w - 50, 40, 15, 120),
        new ball('blue', 100, 100, 10, 2, 2, 0, 0, 0.01),
        new ball('green', 200, 100, 10, 2, 2, 0, 0.1),
        new ball('red', 300, 100, 10, 2, 2, 0, -0.1)

    ];

    //Creat teams and assign scores, controllers, and goals (owners)
    var team = [
        new Team("Team 1",0),
        new Team("Team 2",1)
    ];

    team[0].addController(con[0]);
    team[0].addGoal(objs[0]);

    team[1].addController(con[1]);
    team[1].addGoal(objs[2]);

    // update loop set at one update every 10ms
    //It would be intensive to check for every object being a paddle every step, in the future we will implement a one time function taht identifies controllers matching paddle objects
    window.setInterval(function() {
        phys.step(objs, team, 1);
        gfx.draw(objs, team);
        con[0].checkKey(objs[4]);
        con[1].checkKey(objs[5]);
    }, 8);
};
