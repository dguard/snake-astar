
describe('astarAlgo', () => {


    it('it should avoid repeating on this turn', ()=> {

        var TOTAL_ROWS = 9;
        var TOTAL_COLS = 23;

        grid = [];
        for(var i = 0; i < TOTAL_ROWS; i++) {
            grid.push([]);
            for(var j = 0; j < TOTAL_COLS; j++) {
                grid[i][j] = 0;
            }
        }

        astarAlgo = new AStarAlgo.js();
        astarAlgo.setGrid(grid);


        var startY = 4;
        var startX = 7;

        var endY = 1;
        var endX = 4;



        /*
        var startY = 6;
        var startX = 14;

        var endY = 8;
        var endX = 20;
        */



        var startY = 2;
        var startX = 14;

        var endY = 7;
        var endX = 14;


        /*
        var startY = 6;
        var startX = 15;

        var endY = 7;
        var endX = 14;
        */

        astarAlgo.putEndCell(endY, endX);
        astarAlgo.putStartCell(startY, startX);


        /*
        var wallStartY = 2;
        var wallStartX = 6;
        astarAlgo.putWallCell(wallStartY, wallStartX);
        var wallStartY = 2;
        var wallStartX = 7;
        astarAlgo.putWallCell(wallStartY, wallStartX);
        */

        var horizontalWallCoords = [{y:2,x:9}, {y:2,x:10}, {y:2,x:11}];
        astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
        astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
        astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);

        var horizontalWallCoords = [{y:5,x:13}, {y:5,x:14}, {y:5,x:15}];
        astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
        astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
        astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);

        var verticalWallCoords = [{y:2,x:13}, {y:3,x:13}, {y:4,x:13}];
        astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
        astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
        astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);

        var verticalWallCoords = [{y:6,x:19}, {y:7,x:19}, {y:8,x:19}];
        astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
        astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
        astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);

        var firstTurn = (cb) => {
            astarAlgo.findPath(startX, startY, endX, endY, function(path) {

                console.log("Found path: " + path.map((item) => {return item.toString()}));

                cb();
            });
        }

        var secondTurn = (cb) => {
            var path = astarAlgo.getFoundPath();
            var startCoords = {y: path.slice(1)[0].y, x: path.slice(1)[0].x};
            var endCoords = {y: path.slice(-1)[0].y, x: path.slice(-1)[0].x};

            var startY = startCoords.y;
            var startX = startCoords.x;

            var endY = endCoords.y;
            var endX = endCoords.x;

            astarAlgo.putEndCell(startY, startX);
            astarAlgo.putStartCell(endY, endX);

            astarAlgo.findPath(startX, startY, endX, endY, function(path) {

                console.log("Found path: " + path.map((item) => {return item.toString()}));

                cb();
            });
        }

        var thirdTurn = (cb) => {
            var path = astarAlgo.getFoundPath();
            var startCoords = {y: path.slice(1)[0].y, x: path.slice(1)[0].x};
            var endCoords = {y: path.slice(-1)[0].y, x: path.slice(-1)[0].x};

            var startY = startCoords.y;
            var startX = startCoords.x;

            var endY = endCoords.y;
            var endX = endCoords.x;

            astarAlgo.putEndCell(startY, startX);
            astarAlgo.putStartCell(endY, endX);

            astarAlgo.findPath(startX, startY, endX, endY, function(path) {

                console.log("Found path: " + path.map((item) => {return item.toString()}));

                cb();
            });
        }

        var fourthTurn = (cb) => {
            var path = astarAlgo.getFoundPath();
            var startCoords = {y: path.slice(1)[0].y, x: path.slice(1)[0].x};
            var endCoords = {y: path.slice(-1)[0].y, x: path.slice(-1)[0].x};

            var startY = startCoords.y;
            var startX = startCoords.x;

            var endY = endCoords.y;
            var endX = endCoords.x;

            astarAlgo.putEndCell(startY, startX);
            astarAlgo.putStartCell(endY, endX);

            astarAlgo.findPath(startX, startY, endX, endY, function(path) {

                console.log("Found path: " + path.map((item) => {return item.toString()}));
            });
        }


        firstTurn(() => {
           secondTurn(() => {
               thirdTurn(() => {
                   fourthTurn()
               })
           })
        });

    });

})