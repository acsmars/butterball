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
	var gfx = new GraphicsManager(document.getElementById("canvas_container"), window.innerHeight, window.innerHeight);
	
	// physics engine
	var phs = new SimplePhysicsEngine(window.innerHeight, window.innerHeight, 0);

	// some test objects - these are the same ones that are in index.html
    var objs = [new wall(100, 100, 300, 20), new wall(100, 100, 20, 300), new wall(100, 380, 300, 20), new wall(380, 100, 20, 300), new ball('green', 200, 200, 10), new paddle(200, 400, 70, 10)];
	
	// The first player will be player number 0 for code purposes
	var scores = [0, 0, 0]
	
	// Functions to get and set the score externally (possibly unneeded) 
	function getScore(playerNum)
	{
		return scores[playerNum];
	}
	function setScore(playerNum, val)
	{
		scores[playerNum] = val;
	}
	
	gfx.draw(objs, scores);
	
	var dir = 2;
    
    objs[4].vx = 5;
    objs[4].vy = 6;
    objs[0].direction = "h";
    objs[1].direction = "v";
    objs[2].direction = "h";
    objs[3].direction = "v";

    window.setInterval(function() {
        scores[0] += 1;
        gfx.draw(objs, scores);
    }, 1000);

    window.setInterval(function() {
        scores[1] += 1;
        gfx.draw(objs, scores);
    }, 2400);

    window.setInterval(function() {
        scores[2] += 1;
        gfx.draw(objs, scores);
    }, 23421);

    window.setInterval(function() {
        phs.step(objs, 1);
        gfx.draw(objs, scores);
    }, 10);

    window.setInterval(function() {
        dir = -dir;
    }, 1250);
	
	// Continually pass data to physics engine and graphics manager
	// TODO: implement time-step instead of (1)
	/*
	while(1)
	{
		// Send data to the physics engine (pass by reference)
		// TODO: call phys function 
		
		// Send data to the graphics manager (pass by reference)
		gfx.draw(objs, scores);
		// TODO: needs testing and input by team members
	}
	*/
}
	