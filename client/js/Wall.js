/*
 * Wall class acts as a generic "wall" object.
 */
function wall (color, x, y, width, height,value) {
	
	this.type = "wall";
	this.destroyed = false;
	this.color = (color !== '' && color !== "default") ? color: "#8C6542";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.width = typeof width !== 'undefined' ? width : 0;
	this.height = typeof height !== 'undefined' ? height : 0;
	this.owner = typeof owner !== 'undefined' ? owner : null;
	this.value = typeof value !== 'undefined' ? value : 0;
}

