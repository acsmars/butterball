/**
 * Ball class acts a generic "ball" object and
 * defines get/set methods for default constructors.
 */
function ball () {
	//Default constructors
	this.color = null;
	this.x = null;
	this.y = null;
	this.r = null;
	
	//Get Method for X coordinate
	this.getX = function(){return this.x};
	
	//Get Method for Y coordinate
	this.getY = function(){return this.y};
	
	//Get Method for ball radius
	this.getR = function(){return this.r};
	
	//Get Method for ball color
	this.getColor = function(){return this.color};
	
	//Set Method for X coord
	this.setX = function(newX){this.x = newX};

	//Set Method for Y coord
	this.setY = function(newY){this.y = newY};

	//Set Method for radius
	this.setR = function(newR){this.r = newR};
	
	//Set Method for Ball color
	this.setColor = function(newColor){this.color = newColor};
		
}
