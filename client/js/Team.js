/*
Team manages a team's controllers, goals (and their ownership), and score
number is the teams numerical identifier
*/
var Team = function(name, number, manager, lives) {
    this.init = function (name, number) {
        this.name = typeof name !== 'undefined' ? name : "noName";
        this.number = typeof number !== 'undefined' ? number : 0;
        this.score = typeof lives !== 'undefined' ? lives : 10;
    };

    var controllers = [];
    var goals = [];

    this.addController = function (controller) {
        controllers.push(controller);
    };

    this.getControllers = function () {
        return controllers;
    };

    this.addGoal = function(object) {
        object.owner = this.number;
        goals.push(object);

    };

    this.getGoals = function () {
        return goals;
    };

    this.getName = function() {
        return this.name;
    };

    this.getScore = function() {
        return this.score;
    };

    this.incrementScore = function(amount) {
        amount = typeof amount !== 'undefined' ? amount : -1;
        this.score += amount;

        if (this.score <= 0) {
            manager.teamEliminated(number);
        }
    };

    this.init(name, number);
};
