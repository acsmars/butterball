/**
 * SimplePhysicsEngine creates, initializes, and manages a non-raycast enabled
 * physics engine for ButterBall.
 */
var SimplePhysicsEngine = function (pxWidth, pxHeight, debug) {
    
    function init(pxWidth, pxHeight, debug) {
        // set default values
        // pxWidth and pxHeight currently do nothing; waiting to implement scaling functionality.
        pxWidth = (typeof pxWidth == 'number' ? pxWidth : 1000);
        phHeight = (typeof pxHeight == 'number' ? pxHeight : 1000);
        debug = (typeof debug == 'number' ? debug : 0);
    }
    
    /**
     * Log debug output to console with information detailing debug source
     * @param {Object} message Object to be printed to console
     * @param {String} cclass Passthrough for class currently calling dlog
     */
    this.dlog = function (message, cclass) {
        var now = new Date();
        var header = "[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds() + "] " + cclass + ": ";
        console.log(header + message);
    }

    /**
     * Step all pasted objects by 'time' physics ticks
     * @param  {Array} objects Array of objects that affect/effect physics simulation
     * @param  {Int} time Amount of time in ticks that will pass in this next step
     */
    this.step = function (objects, time) {
        // Iterate through objects and determine future positions
        // TODO: For now, this will only handle ball/wall collisions (i.e. simple reflections only)
        // will need to be improved for odd shapes/momentums in future
        var index, len;
        if (debug > 0) {
                this.dlog("Iterating across " + String(objects.length) + " objects.", "SimplePhysicsEngine");
        }
        
        for (index = 0, len = objects.length; index < len; ++index) {
            // Determine new positions
            if (objects[index].type == "ball") {
                objects[index].x += objects[index].vx * time;
                objects[index].y += objects[index].vy * time;
            }
        }
        
        // Create clone destination array for holding new attributes
        // (Prevents ignoring collision with 2 objects simultaneously)
        var newObjects = JSON.parse(JSON.stringify(objects));
        
        // Check for collisions in new positions
        var index2, len2;
        
        for (index = 0, len = objects.length; index < len; ++index) {
            if (debug > 0) {
                this.dlog("Iterating object " + String(index), "SimplePhysicsEngine");
            }
            if (debug > 1) {
                this.dlog("Object " + String(index) + " started iteration at [" + String(objects[index].x) + "," + String(objects[index].y) + "]", "SimplePhysicsEngine");
            }
            // TODO: Determine wall side hit as opposed to declaring wall direction
            if (objects[index].type == "ball") {
                for (index2 = 0, len2 = objects.length; index2 < len2; ++index2) {
                    // Objects don't collide with selves
                    if (index == index2) {
                        continue;
                    }
                    // Ignore ball/ball collisions
                    // TODO: Do not ignore in future
                    else if (objects[index2].type == "ball") {
                        if (debug > 0) {
                            this.dlog("Ignoring second ball object " + String(index2), "SimplePhysicsEngine");
                        }
                        continue;
                    }
                    // Check if ball inside wall bounds
                    // TODO: Only 2 physics types
                    // TODO: Ball is currently 1px collision-wise
                    else if (   (objects[index].x >= objects[index2].x) &&
                                (objects[index].x <= objects[index2].x + objects[index2].width) &&
                                (objects[index].y >= objects[index2].y) &&
                                (objects[index].y <= objects[index2].y + objects[index2].height)) {
                        if (debug > 0) {
                            this.dlog("Ball object " + String(index) + " collided with Wall object " + String(index2), "SimplePhysicsEngine");
                        }
                        // Determine wall direction
                        // TODO: Relapce with angle in radians?
                        if (objects[index2].direction == "v") {
                            // Negate original X velocity
                            newObjects[index].vx = -1 * objects[index].vx;
                            // Move to true X position from guessed position
                            // See physics calculation document for example diagrams
                            if (Math.sign(objects[index].vx) == -1) {
                                newObjects[index].x += 1 * (objects[index].r + Math.abs(objects[index2].x + objects[index2].width - objects[index].x));
                            }
                            else {
                                newObjects[index].x += -1 * (objects[index].r + Math.abs(objects[index2].x - objects[index].x));
                            }
                            if (debug > 1) {
                                this.dlog("Moved Ball object " + String(index) + " along X axis by " + String(newObjects[index].x - objects[index].x) + " units", "SimplePhysicsEngine");
                            }
                        }
                        else {
                            // Negate original Y velocity
                            newObjects[index].vy = -1 * objects[index].vy;
                            // Move to true Y position from guessed position
                            // See physics calculation document for example diagrams
                            if (Math.sign(objects[index].vy) == -1) {
                                newObjects[index].y += 1 * (objects[index].r + Math.abs(objects[index2].y + objects[index2].height - objects[index].y));
                            }
                            else {
                                newObjects[index].y += -1 * (objects[index].r + Math.abs(objects[index2].y - objects[index].y));
                            }
                            if (debug > 1) {
                                this.dlog("Moved Ball object " + String(index) + " along Y axis by " + String(newObjects[index].y - objects[index].y) + " units", "SimplePhysicsEngine");
                            }
                        }
                    }
                }
            }
            else {
                // Ignore static objects
                if (debug > 0) {
                    this.dlog("Ignoring static object " + String(index), "SimplePhysicsEngine");
                }
            }
        }
        // Copy new elements back into passed-in array
        // Have do do by index because JavaScript is dumb when handling array references >:(
        for (index = 0, len = objects.length; index < len; ++index) {
            objects[index] = newObjects[index];
        }
    };

    init(pxWidth, pxHeight);
};
