function importDisplay() {
    var Maze = importMaze();
    var Mover = importMover();

    function buildView (player, maze) {
        var wallReport = {};
        var viewGhost = new Mover(player.facing, player.x, player.y);

        function checkWall(dir) {
            wallReport[dir] = maze.isWall(viewGhost.y, viewGhost.x, viewGhost.facing);
        };
        viewGhost.right();     checkWall('close-flat-right');
        viewGhost.left();      checkWall('close-flat-center');
        viewGhost.left();      checkWall('close-flat-left');
        viewGhost.step();      checkWall('mid-flat-left');
        viewGhost.right();     checkWall('mid-flat-center');
        viewGhost.right();     checkWall('mid-flat-right');
        viewGhost.step();      checkWall('far-flat-right');
        viewGhost.left();      checkWall('far-flat-center');
        viewGhost.left();      checkWall('far-flat-left');
        viewGhost.turnRight();  checkWall('far-left');
        viewGhost.step();      checkWall('far-right');
        viewGhost.right();     checkWall('mid-right');
        viewGhost.back();      checkWall('mid-left');
        viewGhost.right();     checkWall('close-left');
        viewGhost.step();      checkWall('close-right');


        return wallReport;
    };

    return buildView;
};
