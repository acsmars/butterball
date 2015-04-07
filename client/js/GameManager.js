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

    // controller1
    var con = [
        new Controller(4, objs, 87, 83, 65, 68),
        new Controller(5, objs, 38, 40, 37, 39)
    ];

    //Creat teams and assign scores, controllers, and goals (owners)
    var team = [
        new Team("Team 1", 0, this, 100),
        new Team("Team 2", 1, this, 100)
    ];

    team[0].addController(con[0]);
    team[0].addGoal(objs[0]);

    team[1].addController(con[1]);
    team[1].addGoal(objs[2]);

    this.teamEliminated = function (number) {
        index = -1;
        for (var i=0; i<team.length; i++) {
            console.log(team[i].number);
            console.log(number);
            if (team[i].number == number) {
                index = i;
            }
        }

        if (index == -1) {
            throw "Unable to find team with number " + number.toString();
        }

        var goals = team[index].getGoals();
        var controllers = team[index].getControllers();
        for (var g in goals) {
            objs.remove(g);
        }

        team.splice(index, 1);

        victory();
    };

    function victory() {
        if (team.length === 1) {
            alert(team[0].name + " is the winner!");
            window.location.href = "index.html";
        }
    }

    // from http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };


    // update loop set at one update every 10ms
    //It would be intensive to check for every object being a paddle every step, in the future we will implement a one time function taht identifies controllers matching paddle objects
    window.setInterval(function() {
        phys.step(objs, team, 1);
        gfx.draw(objs, team);
        con[0].checkKey();
        con[1].checkKey();
    }, 8);
};
