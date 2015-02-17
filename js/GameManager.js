/** 
 * The GameManager controls the flow of the game. It manages objects (ball, paddles, walls, etc.), 
	physics (passed through the SimplePhysicsEngine, graphics (using functions from GraphicsManager.js), 
	and gameplay (score, win/lose, power-ups, etc.)
 */
 
 // Do we need params for this? Are we creating the objects in the GameManager or just 
 // passing them by reference from index.html to each of the scripts?
 var GameManager = function()
 {
	// some test objects - these are the same ones that are in index.html
	var objects = [new wall(300, 300, 50, 50), new ball('green', 200, 200, 10), new paddle(200, 400, 70, 10)];
	
	// test physics engine - what are pxWidth, pxHeight, debug in more practical terms?
	//var phys = new SimplePhysicsEngine(...);
	
	// graphics manager from index.html
	var gfx = new GraphicsManager(document.getElementById("canvas_container"), window.innerHeight, window.innerHeight);
	
	//controller from index.html
	var con = new Controller(document.getElementById("canvas_container"));

	// The first player will be player number 0 for code purposes
	var scores = [0, 0, 0]
	
	function getScore(playerNum)
	{
		return scores[playerNum];
	}
	function setScore(playerNum, val)
	{
		scores[playerNum] = val;
	}
	
	// Continually pass data to physics engine and graphics manager
	while(1)
	{
		// Send data to the physics engine (pass by reference)
		// TODO: call phys function 
		
		// Send data to the graphics manager (pass by reference)
		gfx.draw(objs, scores);
		// TODO: needs testing and input by team members
	}
}
	