/*
Team manages a team's controllers, goals (and their ownership), and score
*/
var Team = function(name,number) {
    function init(name,number) {
        name = typeof name !== 'undefined' ? name : "noName";
        number = typeof number !== 'undefined' ? number : 0;
    };

    var name;
    var number;
    var controllers = [];
    var goals = [];
    var score = 0;

    this.addController = function (controller) {
        controllers.push(controller);
    };
    this.addGoal = function(object) {
        object.owner = number;
        goals.push(object);

    };
    this.getName = function() {
        return name;
    };
    this.getScore = function() {
        return score;
    };
    this.incrementScore = function(amount) {
        var addition = typeof amount !== 'undefined' ? amount : 1;
        score += addition;
    };
    init();
};
