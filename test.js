var Maze = importMaze();
var Mover = importMover();
var view = importDisplay();
var myMaze = new Maze(5,5);
var player = new Mover('n',0,0);
view(player, myMaze);
