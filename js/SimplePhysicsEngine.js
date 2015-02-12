/**
 * SimplePhysicsEngine creates, initializes, and manages a non-raycast enabled
 * physics engine for ButterBall.
 */
var SimplePhysicsEngine = function (pxWidth, pxHeight, debug) {
    
    var d = 0;
    
    function init(pxWidth, pxHeight, debug) {
        // set default values
        // pxWidth and pxHeight currently do nothing; waiting to implement scaling functionality.
        pxWidth = (typeof pxWidth == 'number' ? pxWidth : 1000);
        phHeight = (typeof pxHeight == 'number' ? pxHeight : 1000);
        d = (typeof debug == 'number' ? debug : 0);
    }
    
    /**
     * Log debug output to console with information detailing debug source
     * @param {String} message Message to be printed to console
     */
    this.dlog = function (message) {
        var header = "[" + Date.getHours() + ":" + Date.getMinutes() + ":" + Date.getSeconds() + ":" + Date.getMilliseconds() + "] " + this.constructor.name + ": ";
        console.log(header + String(message));
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
        if (d > 0) {
                dlog("Iterating across " + String(objects.length) + " objects.");
            }
        for (index = 0, len = objects.length; index < len; ++index) {
            // Determine new positions
            // TODO: Correct accessor for physics object properties?
            objects[index].x += objects[index].vx * time;
            objects[index].y += objects[index].vy * time;
        }
        // Check for collisions in new positions
        var index2, len2;
        var newObjects = [];
        for (index = 0, len = objects.length; index < len, ++index) {
            if (d > 0) {
                dlog("Iterating object " + String(index));
            }
            if (d > 1) {
                dlog("Object " String(index) + " started iteration at [" String(objects[index].x) + "," + String(objects[index].y) + "]");
            }
            // TODO: Correct accessor for physics object properties?
            // TODO: Determine wall side hit as opposed to declaring wall direction
            // TODO: Instanceof vs. object.type declaration
            if (objects[index2] instanceof Ball) {
                for (index2 = 0, len2 = objects.length; index2 < len2, ++index2) {
                    // Objects don't collide with selves
                    if (index == index2) {
                        continue;
                    }
                    // Ignore ball/ball collisions
                    // TODO: Do not ignore in future
                    else if (objects[index2] instanceof Ball) {
                        if (d > 0) {
                            dlog("Ignoring second ball object " + String(index2));
                        }
                        continue;
                    }
                    // Check if ball inside wall bounds
                    // TODO: Only 2 physics types
                    // TODO: Ball is currently 1px collision-wise
                    else if (   (objects[index].x >= objects[index2].x) && \
                                (objects[index].x <= objects[index2].width) && \
                                (objects[index].y >= objects[index2].y) && \
                                (objects[index].y <= objects[index2].height)) {
                        if (d > 0) {
                            dlog("Ball object " + String(index) + " collided with Wall object " + String(index2);
                        }
                        // Move to new array (if haven't already) for holding new attributes
                        // (Prevents ignoring collision between 2 objects)
                        newObjects[index] = (typeof newObjects[index] == "undefined" ? objects[index] : newObjects[index]);
                        // Determine wall direction
                        // TODO: Relapce with angle in radians?
                        if (objects[index2].direction == "v") {
                            // Negate original X velocity
                            newObjects[index].xv = -(objects[index].xv);
                            // Move to true X position from guessed position
                            // See physics calculation document for example diagrams
                            if (Math.sign(objects[index].xv) == -1) {
                                newObjects[index].x += 2 * (objects[index].r + abs(objects[index2].x + objects[index2].width - objects[index].x));
                            }
                            else {
                                newObjects[index].x += 2 * (objects[index].r + abs(objects[index2].x - objects[index].x));
                            }
                            if (d > 1) {
                                dlog("Moved Ball object " String(index) + " along X axis by " String(newObjects[index].x - objects[index].x) + " units" );
                            }
                        }
                        else {
                            // Negate original Y velocity
                            newObjects[index].yv = -(objects[index].yv);
                            // Move to true Y position from guessed position
                            // See physics calculation document for example diagrams
                            if (Math.sign(objects[index].yv) == -1) {
                                newObjects[index].y += 2 * (objects[index].r + abs(objects[index2].y + objects[index2].height - objects[index].y));
                            }
                            else {
                                newObjects[index].y += 2 * (objects[index].r + abs(objects[index2].y - objects[index].y));
                            }s[index].y));
                            if (d > 1) {
                                dlog("Moved Ball object " String(index) + " along Y axis by " String(newObjects[index].y - objects[index].y) + " units" );
                            }
                        }
                    }
                }
            }
            else {
                // Copy other objects over directly
                if (d > 0) {
                    dlog("Copying static object " + String(index));
                }
                newObjects[index] = objects[index];
            }
        }
        // Now that collisions are done, place new objects back in passed array
        objects = newObjects;
    };

    init(pxWidth, pxHeight);
};
