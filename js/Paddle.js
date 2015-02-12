/*
 * Wall class acts as a generic "wall" object.
 */
function paddle (x, y, width, height) {
	
	this.type = "paddle";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.width = typeof width !== 'undefined' ? width : 0;
	this.height = typeof height !== 'undefined' ? height : 0;
	this.vx = 0;
	this.vy = 0;
}

