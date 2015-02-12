/**
 * Ball class acts a generic "ball" object.
 */
function ball (color, x, y, r) {
	
	this.type = "ball";
	this.color = typeof color !== 'undefined' ? color: "white";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.r = typeof r !== 'undefined' ? r : 0;
	this.vx = 0;
	this.vy = 0;
}

