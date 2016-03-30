document.addEventListener('DOMContentLoaded', function main() {
    //imports
    var Maze = importMaze();
    var Mover = importMover();
    var view = importDisplay();

    //dict of elements by wall name
    var walls = document.getElementsByClassName('wall');
    var elements = {};
    for (var i = 0; i < walls.length; i++)
        elements[walls[i].id] = walls[i];
    //console.log(Object.keys(elements));


    var maze = new Maze(15,15);
    var player = new Mover('n',5,5);

    makeView();

    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
        case 37:
            player.turnLeft();
            break;
        case 38:
            player.step();
            break;
        case 40:
            player.back();
            break;
        case 39:
            player.turnRight();
            break;
        default:
            return;
        }

        makeView();
    }

    function makeView() {
        console.log('location : (' + player.x + ', ' + player.y + ')');
        console.log('facing : ' + player.facing);
        var currentView = view (player, maze);
        var viewKeys = Object. keys (currentView);
        for (var i = 0; i < viewKeys.length; i++) {
            key = viewKeys[i];
            elements[key].style.visibility = (currentView[key]) ? 'visible' : 'hidden';
        }
    }

});
