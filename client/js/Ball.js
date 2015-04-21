/**
 * Ball class acts a generic "ball" object.
 */
function ball (color, x, y, r, vx, vy, ax, ay, a, owner) {

	this.type = "ball";
	this.color = typeof color !== 'undefined' ? color: "white";
	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
    this.r = typeof r !== 'undefined' ? r : 1;
    this.vx = typeof vx !== 'undefined' ? vx : 0;
    this.vy = typeof vy !== 'undefined' ? vy : 0;
    this.ax = typeof ax !== 'undefined' ? ax : 0; // Acceleration value of 0 is no acceleration. Acceleration values are added to velocities every physics tick
    this.ay = typeof ay !== 'undefined' ? ay : 0;
    this.a = typeof a !== 'undefined' ? a : 0;
    this.owner = typeof owner !== 'undefined' ? owner : 5;
};

