/*
 * Paddle class acts as a generic "wall" object.
 */
function paddle (color, x, y, width, height, owner) {
	
	this.owner = typeof owner !== 'undefined' ? owner : 0;
	this.value = typeof value !== 'undefined' ? value : 0;
    this.destroyed = false;
	this.type = "paddle";
	this.color = typeof color !== 'undefined' ? color: "white";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.width = typeof width !== 'undefined' ? width : 0;
	this.height = typeof height !== 'undefined' ? height : 0;
	this.vx = 0;
	this.vy = 0;
}

