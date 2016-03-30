function importMover() {
    //a class that has a position and facing and
    //methods to change them
    function Mover (facing, x, y) {
        this.facing = facing;
        this.x = x;
        this.y = y;
        this.go = function(dir) {
            var newXY = move(dir, this.facing, this.x, this.y);
            this.x = newXY[0];
            this.y = newXY[1];
        };
        this.spin = function(dir) {
            this.facing = turn(dir, this.facing);
        };

        //movement methods
        this.step = function() {this.go('forward')};
        this.back = function() {this.go('back')};
        this.turnLeft = function() {this.spin('left')};
        this.turnRight = function() {this.spin('right')};
        this.left = function() {this.turnLeft(); this.step(); this.turnRight()};
        this.right = function() {this.turnRight(); this.step(); this.turnLeft()};

    }

    //returns new facing after turning in moveDir
    function turn (moveDir, facing) {
        var turn = ['n', 'e', 's', 'w'];
        facing = turn.indexOf(facing);

        if (moveDir === 'left') facing--;
        else if (moveDir === 'right') facing++;
        else return false;

        if (facing === 4) facing = 0;
        if (facing === -1) facing = 3;
        return turn[facing];
    }

    //returns the new [x, y], after stepping forwards or backwards
    function move (moveDir, facing, x, y) {
        var moves = {'forward' : {'s' : [x, y + 1],
                                  'w' : [x + 1, y],
                                  'e' : [x - 1, y],
                                  'n' : [x, y - 1]},
                     'back' :    {'s' : [x, y - 1],
                                  'w' : [x - 1, y],
                                  'e' : [x + 1, y],
                                  'n' : [x, y + 1]}};

        return moves[moveDir][facing];
    }

    return Mover;
}
