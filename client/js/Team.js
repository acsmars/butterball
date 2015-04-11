/*
Team manages a team's controllers, goals (and their ownership), and score
number is the teams numerical identifier
*/
var Team = function(name, number, manager, lives) {
    this.init = function () {
        this.name = typeof name !== 'undefined' ? name : "noName";
        this.number = typeof number !== 'undefined' ? number : 0;
        this.lives = typeof lives !== 'undefined' ? lives : 10;
    };

    this.defeated = false;

    this.addGoal = function(object) {
        object.owner = this.number;
    };

    this.eliminate = function() {
        this.defeated = true;
        manager.victory();
    };

    this.decrementLives = function(amount) {
        amount = typeof amount !== 'undefined' ? amount : -1;
        this.lives -= amount;

        if (this.lives <= 0) {
            this.eliminate();
        }

    };

    this.init(name, number);
};
