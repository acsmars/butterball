/**
 * SimplePhysicsEngine creates, initializes, and manages a non-raycast enabled
 * physics engine for ButterBall.
 */
var SimplePhysicsEngine = function (physWidth, physHeight, maxSpeed, debug) {

    // Determines number of degrees of accuracy when colliding ball
    // (Number of points to check around perimiter when colliding)
    // May need to be adjusted depending on load
    // Reccomend 8
    var ballRadSteps = 32;

    //TODO: replace gameManager instance with message handler?
    function init(physWidth, physHeight, debug) {
        debug = (typeof debug == 'number' ? debug : 0);
        physWidth = (typeof physWidth == 'number' ? physWidth : 1000);
        physHeight = (typeof physHeight == 'number' ? physHeight : 1000);
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
     var radiusCheckWallCollision = function (radiusPoints, testObject) {

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
     * Check if radius points are inside an area defined by a ball, and update array accordingly
     * @param {Array} radiusPoints Array in the format (float x, float y, bool collision, float angle), ...
     * @param {Object} testObject Object to test collisions with
     * @return {Bool} Returns whether any collision happened
     */
     var radiusCheckBallCollision = function (radiusPoints, testObject) {

        var total = radiusPoints.length
        var collision = false;

        for (i = 0; i < total; i += 4) {
            radiusPoints[i+2] = false;

            //Check if collision point is within testObject radius
            if (Math.sqrt(Math.pow(radiusPoints[i] - testObject.x, 2) +
                Math.pow(radiusPoints[i+1] - testObject.y, 2)) <= testObject.r) {
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

     // Create array of points and angles around a circle for collision detection purposes
     var makeRadiusPoints = function(ball, ballRadSteps, radiusPoints) {
        for (var i = 0; i < ballRadSteps; i++) {
            radiusPoints[i*4] = ball.x + (ball.r) * Math.cos(2*Math.PI * i/ballRadSteps);
            radiusPoints[i*4 + 1] = ball.y + (ball.r) * Math.sin(2*Math.PI * i/ballRadSteps);
            radiusPoints[i*4 + 2] = false;
            radiusPoints[i*4 + 3] = 2*Math.PI * i/ballRadSteps;
        }
     }.bind(this);

    /**
     * Modify boolean array depending on collsions between wall and paddle
     * @param {Array} collisions Array in the format (bool top, bool left, bool bottom, bool right)
     * @param {paddle} paddle Paddle object
     * @param {wall} wall Paddle object
     * @return {Bool} True if collision happened
     */
    var paddleWallCollisions = function (collisions, paddle, wall) {

        //Top
        if (//Upper left corner
            paddle.x > wall.x && paddle.y > wall.y &&
            paddle.x < (wall.x + wall.width) && paddle.y < (wall.y + wall.height) &&
            //Upper right corner
            (paddle.x + paddle.width) > wall.x && paddle.y > wall.y &&
            (paddle.x + paddle.width) < (wall.x + wall.width) && paddle.y < (wall.y + wall.height)) {

            collisions[0] = true;
        }

        //Left
        if (//Upper left corner
            paddle.x > wall.x && paddle.y > wall.y &&
            paddle.x < (wall.x + wall.width) && paddle.y < (wall.y + wall.height) &&
            //Lower left corner
            paddle.x > wall.x && (paddle.y + paddle.height) > wall.y &&
            paddle.x < (wall.x + wall.width) && (paddle.y + paddle.height) < (wall.y + wall.height)) {

            collisions[1] = true;
        }

        //Bottom
        if (//Lower left corner
            paddle.x > wall.x && (paddle.y + paddle.height) > wall.y &&
            paddle.x < (wall.x + wall.width) && (paddle.y + paddle.height) < (wall.y + wall.height) &&
            //Lower right corner
            (paddle.x + paddle.width) > wall.x && (paddle.y + paddle.height) > wall.y &&
            (paddle.x + paddle.width) < (wall.x + wall.width) && (paddle.y + paddle.height) < (wall.y + wall.height)) {

            collisions[2] = true;
        }

        //Right
         if (//Upper right corner
            (paddle.x + paddle.width) > wall.x && paddle.y > wall.y &&
            (paddle.x + paddle.width) < (wall.x + wall.width) && paddle.y < (wall.y + wall.height) &&
            //Lower right corner
            (paddle.x + paddle.width) > wall.x && (paddle.y + paddle.height) > wall.y &&
            (paddle.x + paddle.width) < (wall.x + wall.width) && (paddle.y + paddle.height) < (wall.y + wall.height)) {

            collisions[3] = true;
        }

    }.bind(this);

    /**
     * Step all pasted objects by 'time' physics ticks
     * @param  {Array} objects Array of objects that affect/effect physics simulation
     * @param  {Int} time Amount of time in ticks that will pass in this next step
     */
    this.step = function (objects, team, time) {
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
                    var isBallReset = false;
                    for (index2 = 0, len2 = objects.length; index2 < len2; ++index2) {

                        // Objects don't collide with selves
                        if (index == index2) {
                            continue;
                        }

                        // Determine each point around the radius of the circle
                        var radiusPoints = [];
                        makeRadiusPoints(objects[index], ballRadSteps, radiusPoints);

                        // Check type of object to determine collision function
                        collisionFunction = null;

                        switch (objects[index2].type) {

                            case "paddle":
                            case "wall":
                                collisionFunction = radiusCheckWallCollision;
                            break;

                            case "ball":
                                collisionFunction = radiusCheckBallCollision;
                            break;

                            default:
                                if (debug > 0) {
                                    this.dlog("Ignoring non-collision object " + String(index2), "SimplePhysicsEngine");
                                }
                                break;
                        }

                        // Check if ball colliding
                        // Note: collision functions modify radiusPoints to show where collisions occurred.
                        if (collisionFunction(radiusPoints, objects[index2])) {

                            if (debug > 0) {
                                this.dlog("Ball object " + String(index) + " collided with object " + String(index2), "SimplePhysicsEngine");
                            }

                            // Determine angle of incidence
                            var angle = findAngleOfIncidence(radiusPoints);

                            //Find dot product of velocity and n (normal vector to angle of incidence
                            var dotProduct = objects[index].vx * Math.cos(angle) + objects[index].vy * Math.sin(angle);

                            // Determine new velocities
                            // If object collided with has velocity, determine how ball velocity affected.
                            if(objects[index2].type == "paddle") { //Reflect + velocity transfer
                                newObjects[index].vx = objects[index].vx - 2 * dotProduct * Math.cos(angle) + objects[index2].vx * Math.cos(angle);
                                newObjects[index].vy = objects[index].vy - 2 * dotProduct * Math.sin(angle) + objects[index2].vy * Math.sin(angle);
                            }
                            else if (objects[index2].type == "ball") { //Momentum transfer
                                //Need dot product of other ball
                                var dotProduct2 = objects[index2].vx * Math.cos(angle) + objects[index2].vy * Math.sin(angle);
                                newObjects[index].vx += (dotProduct2 - dotProduct) * Math.cos(angle);
                                newObjects[index].vy += (dotProduct2 - dotProduct) * Math.sin(angle);
                            }
                            else { //Reflect only
                                newObjects[index].vx = objects[index].vx - 2 * dotProduct * Math.cos(angle);
                                newObjects[index].vy = objects[index].vy - 2 * dotProduct * Math.sin(angle);
                            }

                            makeRadiusPoints(newObjects[index], ballRadSteps, radiusPoints);

                            if (collisionFunction(radiusPoints, objects[index2])) {
                                // Move ball until collision is no longer happening
                                // Use binary search to place ball close to edge of the object

                                // Largest adjustment to postion to make
                                var adjustment = 8;
                                var xdirection = Math.sign(newObjects[index].vx);
                                var ydirection = Math.sign(newObjects[index].vy);

                                for (var i = 0; i < 10; i++) {
                                    newObjects[index].x += xdirection * adjustment;
                                    newObjects[index].y += ydirection * adjustment;

                                    makeRadiusPoints(newObjects[index], ballRadSteps, radiusPoints);

                                    if (collisionFunction(radiusPoints, objects[index2])) {
                                        //Colliding, move further away (Original direction of new velocity)
                                        xdirection = Math.sign(newObjects[index].vx);
                                        ydirection = Math.sign(newObjects[index].vy);
                                    }
                                    else {
                                        //Not colliding, move closer (Opposite direction of new velocity)
                                        adjustment = adjustment / 2;
                                        xdirection = -1 * Math.sign(newObjects[index].vx);
                                        ydirection = -1 * Math.sign(newObjects[index].vy);
                                    }
                                }

                                if (collisionFunction(radiusPoints, objects[index2])) {
                                    //Colliding, undo last adjustment
                                    xdirection = Math.sign(newObjects[index].vx);
                                    ydirection = Math.sign(newObjects[index].vy);
                                    newObjects[index].x += xdirection * adjustment;
                                    newObjects[index].y += ydirection * adjustment;
                                }
                            }

                            //Check if object has owner; increment score by the objects value if it does
                            if( objects[index2].value != 0 && objects[index2].hasOwnProperty("owner") &&
                                objects[index2].owner !== null && objects[index2].owner < team.length) {

                                team[objects[index2].owner].incrementScore(-objects[index2].value);
                                isBallReset = true;
                            }

                        }

                    }

                    if(newObjects[index].ax != 1 || newObjects[index].ay != 1) {//If either ball ay or ball ax is not one, do ball acceleration
                        newObjects[index].vx += newObjects[index].ax + (Math.sign(newObjects[index].vx) * newObjects[index].a);
                        newObjects[index].vy += newObjects[index].ay + (Math.sign(newObjects[index].vy) * newObjects[index].a);
                    }

                    if(isBallReset) {
                        //Reset Ball
                        newObjects[index].vx = getRandomVelocity();
                        newObjects[index].vy = getRandomVelocity();
                        if(newObjects[index].vx > 0) {newObjects[index].x = physWidth / 4;}
                        else {newObjects[index].x = physWidth * 3 / 4;}
                        if(newObjects[index].vy > 0) {newObjects[index].y = physHeight / 4;}
                        else {newObjects[index].y = physHeight * 3 / 4;}

                    };
                    break;

                case "paddle":
                    // Check if paddle is colliding with any walls
                    var collisions = [false, false, false, false];

                    // More for loops. Hooray!
                    for (index2 = 0, len2 = objects.length; index2 < len2; ++index2) {
                        if ((index != index2) && (objects[index2].type == "wall")) {
                            paddleWallCollisions(collisions, objects[index], objects[index2])
                        }
                    }

                    // Check top collision
                    if ((Math.sign(newObjects[index].vy) == -1) && collisions[0]) {
                        // Don't move paddle
                    }
                    //Check bottom collision
                    else if ((Math.sign(newObjects[index].vy) == 1) && collisions[2]) {
                        // Don't move paddle
                    }
                    else {
                        // Move paddle according to velocities given
                        newObjects[index].y += newObjects[index].vy * time;
                    }

                    // Check left collision
                    if ((Math.sign(newObjects[index].vx) == -1) && collisions[1]) {
                        // Don't move paddle
                    }
                    //Check right collision
                    else if ((Math.sign(newObjects[index].vx) == 1) && collisions[3]) {
                        // Don't move paddle
                    }
                    else {
                        // Move paddle according to velocities given
                        newObjects[index].x += newObjects[index].vx * time;
                    }

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
            // Limit velocities
            if (newObjects[index].hasOwnProperty("vx") && newObjects[index].vx > maxSpeed) { newObjects[index].vx = maxSpeed }
            if (newObjects[index].hasOwnProperty("vy") && newObjects[index].vy > maxSpeed) { newObjects[index].vy = maxSpeed }

            // Check for outside playing field
            if (newObjects[index].type == "ball" && (newObjects[index].x < 0 || newObjects[index].x > physWidth || newObjects[index].y < 0 || newObjects[index].y > physHeight)) {
                newObjects[index].x = physWidth / 2;
                newObjects[index].y = physHeight / 2;
            }

            // Finally, send JSON-encoded paddle object for this client's paddle
            //TODO: Implement real UUIDs.
            // For now, UUID = index of paddle to send to server (4 and 5)
            /*for (i = 0; i < team.length; i++) {
                if (objects[index].type == "paddle" && objects[index].hasOwnProperty("owner") &&
                    objects[index].owner !== null && objects[index].owner == myTeam) {
                    pushState(JSON.stringify(objects[index]));
                }
            }*/
            pushState(JSON.stringify([UUID, objects[UUID]]));
        }

    };

    init(physWidth, physHeight, debug);
};

function getRandomVelocity() {
  var num = Math.floor(Math.random() * (5 - 2)) + 2;
  if(Math.random() < 0.5) num = num * -1;
  return num;
};
