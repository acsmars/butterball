/**
 * SimplePhysicsEngine creates, initializes, and manages a non-raycast enabled
 * physics engine for ButterBall.
 */
var SimplePhysicsEngine = function (managerObject, debug) {
    
    // Determines number of degrees of accuracy when colliding ball
    // (Number of points to check around perimiter when colliding)
    // May need to be adjusted depending on load
    // Reccomend 8
    var ballRadSteps = 16;
    
    //TODO: replace gameManager instance with message handler?
    function init(managerObject, debug) {
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
     * Check if radius points are inside an area defined by a wall/paddle, and update array accordingly
     * @param {Array} radiusPoints Array in the format (float x, float y, bool collision, float angle), ...
     * @param {Object} testObject Object to test collisions with
     * @return {Bool} Returns whether any collision happened
     */
     var radiusCheckCollision = function (radiusPoints, testObject) {
     
        var total = radiusPoints.length
        var collision = false;
        
        for (i = 0; i < total; i += 4) {
            radiusPoints[i+2] = false;
        
            if (   (radiusPoints[i] >= testObject.x) &&
            (radiusPoints[i] <= testObject.x + testObject.width) &&
            (radiusPoints[i+1] >= testObject.y) &&
            (radiusPoints[i+1] <= testObject.y + testObject.height)) {
                radiusPoints[i+2] = true;
                collision = true;
                if (debug > 2) {
                    this.dlog("Radius at point " + radiusPoints[i] + "," + radiusPoints[i+1] + " collided.", "SimplePhysicsEngine")
                }
            }
            
        } 
        return collision;
     }.bind(this);
     
     /**
     * Using radiusPoints array, get angle of incidence for collision point(s)
     * @param {Array} radiusPoints Array in the format (float x, float y, bool collision, float angle), ...
     * @return {Int} Returns radian angle of approximate incidence (0-2pi)
     */
     var findAngleOfIncidence = function (radiusPoints) {
        var collideAngles = [];
        var total = radiusPoints.length
        var j = 0;
        
        for (i = 0; i < total; i += 4) {
            // For all collided points
            if (radiusPoints[i+2]) {
                // Add angles to new array
                collideAngles[j] = radiusPoints[i+3]
                j++;
            }
        }
        
        //Found sample for computing average angle at: http://rosettacode.org/wiki/Averages/Mean_angle#Java
        
        var x_component = 0.0;
        var y_component = 0.0;
        var avg_r;
 
        for (var i = 0; i < collideAngles.length; i++) {
          x_component += Math.cos(collideAngles[i]);
          y_component += Math.sin(collideAngles[i]);
        }
        x_component /= collideAngles.length;
        y_component /= collideAngles.length;
        avg_r = Math.atan2(y_component, x_component);
        
        if (debug > 1) {
            this.dlog("Final collision angle: " + avg_r, "SimplePhysicsEngine")
        }
        
        return avg_r;
        
     }.bind(this);
     
     var makeRadiusPoints = function(ball, ballRadSteps, radiusPoints) {
        for (var i = 0; i < ballRadSteps; i++) {
            radiusPoints[i*4] = ball.x + (ball.r) * Math.cos(2*Math.PI * i/ballRadSteps);
            radiusPoints[i*4 + 1] = ball.y + (ball.r) * Math.sin(2*Math.PI * i/ballRadSteps);
            radiusPoints[i*4 + 2] = false;
            radiusPoints[i*4 + 3] = 2*Math.PI * i/ballRadSteps;
        }
     }.bind(this);

    /**
     * Step all pasted objects by 'time' physics ticks
     * @param  {Array} objects Array of objects that affect/effect physics simulation
     * @param  {Int} time Amount of time in ticks that will pass in this next step
     */
    this.step = function (objects, time) {
        // Iterate through objects and determine future positions
        // will need to be improved for odd shapes/momentums in future
        var index, len;
        if (debug > 0) {
                this.dlog("Iterating across " + String(objects.length) + " objects.", "SimplePhysicsEngine");
        }
        
        for (index = 0, len = objects.length; index < len; ++index) {
            // Determine new positions
            // Done here so that new positions are copied to second array
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
            
            switch (objects[index].type) {
                case "ball":
                    for (index2 = 0, len2 = objects.length; index2 < len2; ++index2) {
                        
                        // Objects don't collide with selves
                        if (index == index2) {
                            continue;
                        }
                        
                        // Determine each point around the radius of the circle
                        var radiusPoints = [];
                        makeRadiusPoints(objects[index], ballRadSteps, radiusPoints);
                        
                        // Check type of object
                        switch (objects[index2].type) {
                        
                            case "paddle":
                            case "wall":
                                // Check if ball inside wall bounds
                                // Note: radiusCheckCollision modifies radiusPoints to show where collisions occurred.
                                if (radiusCheckCollision(radiusPoints, objects[index2])) {
                                
                                    if (debug > 0) {
                                        this.dlog("Ball object " + String(index) + " collided with object " + String(index2), "SimplePhysicsEngine");
                                    }
                                    
                                    // Determine angle of incidence
                                    var angle = findAngleOfIncidence(radiusPoints);
                                    
                                    //Find dot product of velocity and n (normal vector to angle of incidence
                                    var dotProduct = objects[index].vx * Math.cos(angle) + objects[index].vy * Math.sin(angle);
                                    
                                    // Determine new velocities
                                    newObjects[index].vx = objects[index].vx - 2 * dotProduct * Math.cos(angle);
                                    newObjects[index].vy = objects[index].vy - 2 * dotProduct * Math.sin(angle);
                                    
                                    // Move ball until collision is no longer happening
                                    makeRadiusPoints(newObjects[index], ballRadSteps, radiusPoints);
                                    while (radiusCheckCollision(radiusPoints, objects[index2])) {
                                        newObjects[index].x += newObjects[index].vx * time;
                                        newObjects[index].y += newObjects[index].vy * time;
                                        makeRadiusPoints(newObjects[index], ballRadSteps, radiusPoints);
                                    }
                                }
                            break;
                            
                            default:
                                if (debug > 0) {
                                    this.dlog("Ignoring non-collision object " + String(index2), "SimplePhysicsEngine");
                                }
                                break;
                        }
                    }
                    break;
                
                case "paddle":
                    // Move paddle according to velocities given
                    newObjects[index].x += newObjects[index].vx * time;
                    newObjects[index].y += newObjects[index].vy * time;
                    break;
                
                default:
                    // Ignore static objects
                    if (debug > 0) {
                        this.dlog("Ignoring static object " + String(index), "SimplePhysicsEngine");
                    }
                break;
            }
        }
        // Copy new elements back into passed-in array
        // Have do do by index because JavaScript is dumb when handling array references >:(
        for (index = 0, len = objects.length; index < len; ++index) {
            objects[index] = newObjects[index];
        }
    };

    init(managerObject, debug);
};
