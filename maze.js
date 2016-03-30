function importMaze() {
    /*maze datatype is a nested array filled with objects with
     four properties, n, s, e, w that can have true or false values
     true means a wall is in that direction in that cell
     also a 'visited' property for the backtracker*/

    function Maze(height, width) {
        this.matrix = initMaze(height, width);
        digMaze(this.matrix, 0,0);
        this.isWall = function(y, x, facing) {
            if (this.matrix[y][x])
                return this.matrix[y][x][facing];
            return false;
        }
    }

    function initMaze (height, width) {
        var result = [];
        //build a maze of walled-in 1x1 cells
        for (var y = 0; y < height; y++){
            var thisRow = [];
            for (var x = 0; x < width; x++)
                thisRow.push( { 'n':true, 's':true, 'e':true, 'w':true, 'visited':false} );
            result.push(thisRow);
        }
        return result;
    }

    //Knuth shuffle for arrays
    function shuffleArr (arr) {
        var curIdx = arr.length - 1;
        var swap;
        var randIdx;
        while (curIdx !== 0){
            randIdx = Math.floor(Math.random() * (curIdx + 1));
            swap = arr[curIdx];
            arr[curIdx] = arr[randIdx];
            arr[randIdx] = swap;
            curIdx--;
        }
        return arr;
    };

    //use a recursive backtracker to dig out the maze
    function digMaze (maze, y, x) {
        //first, mark the current cell as having been visited
        maze[y][x]['visited'] = true;

        //create a shuffled list of the directions to try digging
        var directions = [[1, 0, 's', 'n'], [-1,0, 'n', 's'], [0, -1, 'w', 'e'], [0, 1, 'e', 'w']];
        directions = shuffleArr(directions);

        //now test each direction and recurse if valid
        for (var i = 0; i < directions.length; i ++) {
            var nextY = y + directions[i][0];
            var nextX = x + directions[i][1];
            var target = (maze[nextY]) ? maze[nextY][nextX] : undefined;
            //if target exists and isn't dug into
            if (target && !(target['visited']) ) {
                maze[y][x][directions[i][2]] = false;
                maze[nextY][nextX][directions[i][3]] = false;
                digMaze(maze, nextY, nextX);
            }
        }
    }

    return Maze;
}
