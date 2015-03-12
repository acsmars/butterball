/*
Team manages a team's controllers, goals (and their ownership), and score
*/
var team = function(name) {
    function init() {};

    var name = typeof name !== 'undefined' ? name : "noName";
    var controllers = [];
    var goals = [];
    var score = 0;

    this.addController = function (controller) {
        controllers.push(controller);
    };

    this.addGoal = function(object) {
        goals.push(object);
        object.owner = name;
    };
    init();
};
