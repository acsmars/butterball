/**
 * SimplePhysicsEngine creates, initializes, and manages a non-raycast enabled
 * physics engine for ButterBall.
 */
var SimplePhysicsEngine = function (pxWidth, pxHeight, debug) {
    
    function init(pxWidth, pxHeight, debug) {
        // set default values
        pxWidth = (typeof pxWidth == 'number' ? pxWidth : 1000);
        phHeight = (typeof pxHeight == 'number' ? pxHeight : 1000);
        // TODO: debugging printout?
        debug = (typeof pxHeight == 'number' ? debug : 0);
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
            // TODO: Correct accessor for physics object properties?
            // TODO: Determine wall side hit as opposed to stating which direction wall 
            if (objects[index].type == "ball") {
                var x = objects[index].x;
                var y = objects[index].y;   // TODO: Ball is currently 1px collision-wise
                for (index2 = 0, len2 = objects.length; index2 < len2, ++index2) {
                    // Objects don't collide with selves
                    if (index == index2) {
                        continue;
                    }
                    // Ignore ball/ball collisions
                    // TODO: Do not ignore in future
                    else if (objects[index2].type == "ball") {
                        continue;
                    }
                    // Check if inside wall bounds
                    // TODO: Only 2 physics types
                    else if (   (x >= (objects[index2].x - objects[index2].xl)) && \
                                (x <= (objects[index2].x + objects[index2].xl)) && \
                                (y <= (objects[index2].y - objects[index2].yl)) && \
                                (y <= (objects[index2].y + objects[index2].yl))) {
                        // Move to new array (if haven't already) for holding new attributes
                        // (Prevents ignoring collision between 2 objects)
                        newObjects[index] = (typeof newObjects[index] == "undefined" ? objects[index] : newObjects[index]);
                        // Determine wall direction
                        if (objects[index2].direction == "v") {
                            // Negate original X velocity
                            newObjects[index].xv += -2 * (objects[index].xv);
                            // Move to true X position from guessed position
                            newObjects[index].x += newObjects[index].xv * time;
                        }
                        else {
                            // Negate original Y velocity
                            newObjects[index].yv += -2 * (objects[index].yv);
                            // Move to true Y position from guessed position
                            newObjects[index].y += newObjects[index].yv * time;
                        }
                    }
                }
            }
            else {
                // Copy other objects over directly
                newObjects[index] = objects[index];
            }
        }
        // Now that collisions are done, place new objects back in passed array
        objects = newObjects;
    };

    init(pxWidth, pxHeight);
};
