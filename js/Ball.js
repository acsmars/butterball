/**
 * Ball class acts a generic "ball" object.
 */
function ball (color, x, y, r, vx, vy) {

	this.type = "ball";
	this.color = typeof color !== 'undefined' ? color: "white";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
    this.r = typeof r !== 'undefined' ? r : 1;
    this.vx = typeof vx !== 'undefined' ? vx : 0;
    this.vy = typeof vy !== 'undefined' ? vy : 0;
}

