/*
 * Wall class acts as a generic "wall" object.
 */
function wall (x, y, width, height) {
	
	this.type = "wall";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.width = typeof width !== 'undefined' ? width : 0;
	this.height = typeof height !== 'undefined' ? height : 0;
	this.owner = typeof owner !== 'undefined' ? owner : null;
	//this.direction = typeof direction !== 'undefined' ? direction : "v";
}

