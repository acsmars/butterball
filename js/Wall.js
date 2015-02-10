/*
 * Wall class acts as a generic "wall" object and defines get/set
 * methods for default constructors.
 */
function wall () {
	//Default constructors
	this.x = null;
	this.y = null;
	this.width = null;
	this.height = null;

	//Get Method for X corner
	this.getX = function(){return this.x};

	//Get Method for Y corner
	this.getY = function(){return this.y};
	
	//Get Method for width
	this.getWidth = function(){return this.width};

	//Get Method for height
	this.getHeight = function(){return this.height};

	//Set Method for X corner
	this.setX = function(newX){this.x = newX};

	//Set Method for Y corner
	this.setY = function(newY){this.y = newY};

	//Set Method for width
	this.setWidth = function(newWidth){this.width = newWidth};

	//Set Method for height
	this.setHeight = function(newHeight){this.height = newHeight};

}

