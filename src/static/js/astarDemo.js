var listeners = [];

var AStarDemo = function() {

    var TOTAL_ROWS = 9;
    var TOTAL_COLS = 23;

    var grid;
    var astarAlgo;
    // worker
    // watcher
    var renderGrid = function() {
        var table = document.createElement('table');
        table.style = `
        border-spacing: initial;
        border-top: 5px solid rgb(16, 57, 103);
        border-left: 5px solid rgb(16, 57, 103);
    `;

        for(var i = 0; i < grid.length; i++) {
            var row = document.createElement('tr');

            for(var j = 0; j < grid[i].length; j++) {
                var cell = document.createElement('td');

                var rect = document.createElement('div');
                rect.style = `
                width: 96px;
                height: 96px;
            `;
                cell.style = `
                background: #fff;
                border-right: 5px solid #103967;
                border-bottom: 5px solid #103967;
                padding: 0;
            `;

                cell.appendChild(rect);

                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        document.querySelector('table').outerHTML = table.outerHTML;
    }
    var clearGrid = function() {
        renderGrid();
    }
    addOpenedListLayer = function(openedList, nodeGrid) {
        Array.from(Object.keys(openedList)).map((item) => {
            var coords = JSON.parse(item);
            var node = nodeGrid[coords.y][coords.x];

            var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];
            var newRect = document.createElement('div');
            newRect.style = `
            width: 96px;
            height: 96px;
            background: #8fb667;
            opacity: .7;
        `;
            /*
            var costFromStartingNode = node.costFromStartingNode;
            var costToEndNode = node.costToEndNode;

            var expectedTotalCost = node.expectedTotalCost();

            var newCostFromStartingNodeCounter = document.createElement('div');
            newCostFromStartingNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-left: 10px;
                margin-right: 30px;
                margin-top: 15px;
                margin-bottom: 5px;
            `;
            newCostFromStartingNodeCounter.innerHTML = costFromStartingNode;

            var newCostToEndNodeCounter = document.createElement('div');
            newCostToEndNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-top: 15px;
            `;
            newCostToEndNodeCounter.innerHTML = costToEndNode;

            var newExpectedTotalCostCounter = document.createElement('div');
            newExpectedTotalCostCounter.style = `
                font-size: 37px;
                text-align: center;
            `;
            newExpectedTotalCostCounter.innerHTML = expectedTotalCost;

            newRect.appendChild(newCostFromStartingNodeCounter);
            newRect.appendChild(newCostToEndNodeCounter);
            newRect.appendChild(newExpectedTotalCostCounter);
            */

            cell.querySelector('div').outerHTML = newRect.outerHTML;

        })
    }
    addVisitedListLayer = function(visitedList, nodeGrid) {
        Array.from(Object.keys(visitedList)).map((item) => {
            var coords = JSON.parse(item);
            var node = nodeGrid[coords.y][coords.x];

            var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];
            var newRect = document.createElement('div');
            newRect.style = `
            width: 96px;
            height: 96px;
            background: #ff4141;
            opacity: .4;
        `;
            /*
            var costFromStartingNode = node.costFromStartingNode;
            var costToEndNode = node.costToEndNode;

            var expectedTotalCost = node.expectedTotalCost();

            var newCostFromStartingNodeCounter = document.createElement('div');
            newCostFromStartingNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-left: 10px;
                margin-right: 30px;
                margin-top: 15px;
                margin-bottom: 5px;
            `;
            newCostFromStartingNodeCounter.innerHTML = costFromStartingNode;

            var newCostToEndNodeCounter = document.createElement('div');
            newCostToEndNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-top: 15px;
            `;
            newCostToEndNodeCounter.innerHTML = costToEndNode;

            var newExpectedTotalCostCounter = document.createElement('div');
            newExpectedTotalCostCounter.style = `
                font-size: 37px;
                text-align: center;
            `;
            newExpectedTotalCostCounter.innerHTML = expectedTotalCost;

            newRect.appendChild(newCostFromStartingNodeCounter);
            newRect.appendChild(newCostToEndNodeCounter);
            newRect.appendChild(newExpectedTotalCostCounter);
            */
            cell.querySelector('div').outerHTML = newRect.outerHTML;
        });
    }

    addPathLayer = function(path, nodeGrid) {
        path.map((node) => {
            var coords = {x: node.x, y: node.y};

            var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];
            var newRect = document.createElement('div');
            newRect.style = `
            width: 96px;
            height: 96px;
            background: #19aeff;
            opacity: .7;
        `;

            var costFromStartingNode = node.costFromStartingNode;
            var costToEndNode = node.costToEndNode;

            var expectedTotalCost = node.expectedTotalCost();
            /*
            var newCostFromStartingNodeCounter = document.createElement('div');
            newCostFromStartingNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-left: 10px;
                margin-right: 30px;
                margin-top: 15px;
                margin-bottom: 5px;
            `;
            newCostFromStartingNodeCounter.innerHTML = costFromStartingNode;

            var newCostToEndNodeCounter = document.createElement('div');
            newCostToEndNodeCounter.style = `
                float: left;
                font-size: 25px;
                margin-top: 15px;
            `;
            newCostToEndNodeCounter.innerHTML = costToEndNode;

            var newExpectedTotalCostCounter = document.createElement('div');
            newExpectedTotalCostCounter.style = `
                font-size: 37px;
                text-align: center;
            `;
            newExpectedTotalCostCounter.innerHTML = expectedTotalCost;

            newRect.appendChild(newCostFromStartingNodeCounter);
            newRect.appendChild(newCostToEndNodeCounter);
            newRect.appendChild(newExpectedTotalCostCounter);
            */
            cell.querySelector('div').outerHTML = newRect.outerHTML;
        });
    }
    addWallLayer = function(listWall) {
        listWall.map((coords) => {
            var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];

            var newRect = document.createElement('div');
            newRect.style = `
            width: 96px;
            height: 96px;
            position: relative;
            background: #fff;
        `;
            var innerRect = document.createElement('div');
            innerRect.style = `
            position: absolute;
            top: 0px;
            left: 0px;
            width: 48px;
            height: 48px;
            background: #615957;
            margin: 24px;
            border-radius: 10px;
        `;
            newRect.appendChild(innerRect);
            cell.querySelector('div').outerHTML = newRect.outerHTML;
        });
    }

    var addStartCell = function(startCell, nodeGrid) {
        var coords = {x: startCell.x, y: startCell.y};

        var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];

        var newRect = document.createElement('div');
        newRect.style = `
        width: 96px;
        height: 96px;
        position: relative;
        background: rgb(40, 157, 224);
    `;
        var snakeHead = document.createElement('div');
        snakeHead.style = `
        position: absolute;
        top: 0px;
        left: 0px;
        width: 48px;
        height: 48px;
        background: #07496e;
        margin: 24px;
        border-radius: 10px;
    `;
        newRect.appendChild(snakeHead);
        cell.querySelector('div').outerHTML = newRect.outerHTML;
    };
    var addEndCell = function(endCell, nodeGrid) {
        var coords = {x: endCell.x, y: endCell.y};

        var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];
        var newRect = document.createElement('div');
        newRect.style = `
        width: 96px;
        height: 96px;
        position: relative;
        background: #19aeff;
    `;
        var goalCell = document.createElement('div');
        goalCell.style = `
        position: absolute;
        top: 0px;
        left: 0px;
        margin: 18px;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 50px solid rgb(252, 213, 53);
        border-radius: 100px;
    `;
        newRect.appendChild(goalCell);
        cell.querySelector('div').outerHTML = newRect.outerHTML;
    };

    var addTailLayer = function(tailList, nodeGrid) {
        tailList.map((node) => {
            var coords = {x: node.x, y: node.y};
            var cell = document.querySelectorAll('table tr')[coords.y].querySelectorAll('td')[coords.x];

            var newRect = document.createElement('div');
            newRect.style = `
            width: 96px;
            height: 96px;
            position: relative;
            background: rgb(40, 157, 224);
            opacity: .7l
        `;
            var snakeHead = document.createElement('div');
            snakeHead.style = `
            position: absolute;
            top: 0px;
            left: 0px;
            width: 48px;
            height: 48px;
            background: #07496e;
            margin: 24px;
            border-radius: 10px;
        `;
            newRect.appendChild(snakeHead);
            cell.querySelector('div').outerHTML = newRect.outerHTML;
        })
    };

    var assignEvents = function(astarAlgo) {
        Array.from(document.querySelectorAll('table tr')).map((row, rowI) => {
            Array.from(row.querySelectorAll('td > div')).map((rect, colI) => {
                var listenerRectangleClick = rect.onclick = function(event) {
                    var res = astarAlgo.openNode(rowI, colI, (path) => {
                        var nodeGrid = astarAlgo.getNodeGrid();
                        addPathLayer(path, nodeGrid);
                    });
                    if(res && res['status'] && res['status'] === "have_not_active_node") {
                        return;
                    }
                    var node = astarAlgo.getNode(rowI, colI);
                    clearGrid();

                    var nodeGrid = astarAlgo.getNodeGrid();
                    var openedList = astarAlgo.getOpenedList();
                    addOpenedListLayer(openedList, nodeGrid);

                    var visitedList = astarAlgo.getVisitedList();
                    addVisitedListLayer(visitedList, nodeGrid);

                    assignEvents(astarAlgo);
                }
                listeners.push(listenerRectangleClick);
            });
        })
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var generateGoalCoords = function() {
        var newCoords;
        var attempts = 0;
        MAX_ATTEMPTS = 100000;
        while(true) {
            newCoords = {y: getRandomInt(0, TOTAL_ROWS-1), x: getRandomInt(0, TOTAL_COLS-1)};
            var isSameCell = false;
            var listWall = astarAlgo.getListWall();
            var startCell = astarAlgo.getStartCell();

            isSameCell = [isSameCell].concat(listWall).concat([startCell]).reduce((prev, item) => {
                return prev || (newCoords.y === item.y && newCoords.x === item.x);
            })
            if(attempts === MAX_ATTEMPTS) {
                return;
            }
            if(isSameCell) {
                attempts++;
                continue;
            }
            break;
        }

        return newCoords;

    };
    var checkCellIsTaken = function(newCoords) {
        var isSameCell = false;
        var listWall = astarAlgo.getListWall();
        var startCell = astarAlgo.getStartCell();
        isSameCell = [isSameCell].concat(listWall).concat([startCell]).reduce((prev, item) => {
            return prev || (newCoords.y === item.y && newCoords.x === item.x) || (newCoords.y >= TOTAL_ROWS || newCoords.x >= TOTAL_COLS);
        })
        return isSameCell;

    }
    var generateHorizontalWallCoords = function() {
        var startNewCoords;
        var centerNewCoords;
        var endNewCoords;
        var attempts = 0;
        MAX_ATTEMPTS = 100000;
        while(true) {
            startNewCoords = {y: getRandomInt(0, TOTAL_ROWS-1-2), x: getRandomInt(0, TOTAL_COLS-1)};
            if(attempts === MAX_ATTEMPTS) {
                return;
            }
            var cellIsTaken = checkCellIsTaken(startNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }
            centerNewCoords = {y: startNewCoords.y, x: startNewCoords.x+1}
            var cellIsTaken = checkCellIsTaken(centerNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }
            endNewCoords = {y: startNewCoords.y, x: startNewCoords.x+2}
            var cellIsTaken = checkCellIsTaken(endNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }

            break;
        }

        return [startNewCoords, centerNewCoords, endNewCoords];
    };
    var generateVerticalWallCoords = function() {
        var startNewCoords;
        var centerNewCoords;
        var endNewCoords;
        var attempts = 0;
        MAX_ATTEMPTS = 10000;
        while(true) {
            startNewCoords = {y: getRandomInt(0, TOTAL_ROWS-1-2), x: getRandomInt(0, TOTAL_COLS-1)};
            if(attempts === MAX_ATTEMPTS) {
                return;
            }
            var cellIsTaken = checkCellIsTaken(startNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }
            centerNewCoords = {y: startNewCoords.y+1, x: startNewCoords.x}
            var cellIsTaken = checkCellIsTaken(centerNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }
            endNewCoords = {y: startNewCoords.y+2, x: startNewCoords.x}
            var cellIsTaken = checkCellIsTaken(endNewCoords);
            if(cellIsTaken) {
                attempts++;
                continue;
            }

            break;
        }

        return [startNewCoords, centerNewCoords, endNewCoords];
    };
    var doTurn = function(startY, startX, endY, endX, cb) {
        astarAlgo.putEndCell(endY, endX);
        astarAlgo.putStartCell(startY, startX);

        /*
        var listWall = astarAlgo.getListWall();
        listWall.map((item) => {
            astarAlgo.putWallCell(item.y, item.x);
        })*/

        renderGrid();
        assignEvents(astarAlgo);


        astarAlgo.findPath(startX, startY, endX, endY, function(path) {
            var nodeGrid = astarAlgo.getNodeGrid();

            var openedList = astarAlgo.getOpenedList();
            addOpenedListLayer(openedList, nodeGrid);

            var visitedList = astarAlgo.getVisitedList();
            addVisitedListLayer(visitedList, nodeGrid);

            var listWall = astarAlgo.getListWall();
            addWallLayer(listWall);

            var nodeGrid = astarAlgo.getNodeGrid();
            addPathLayer(path.slice(1).slice(0, -1), nodeGrid);

            var startCell = astarAlgo.getStartCell();
            addStartCell(startCell, nodeGrid);

            var endCell = astarAlgo.getEndCell();
            addEndCell(endCell, nodeGrid);

            cb();
        });
    }
    this.doTurn = function(cb) {
        var path = astarAlgo.getFoundPath();
        var startCoords = {y: path.slice(1)[0].y, x: path.slice(1)[0].x};
        var endCoords = {y: path.slice(-1)[0].y, x: path.slice(-1)[0].x};

        if(startCoords.y === endCoords.y && startCoords.x === endCoords.x) {
            endCoords = generateGoalCoords();
        }
        doTurn(startCoords.y, startCoords.x, endCoords.y, endCoords.x, cb);
    }

    this.init = function() {

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

        /*
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
        */


        try {
            var horizontalWallCoords = generateHorizontalWallCoords();
            astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
            astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
            astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);
        } catch (err) {
        }

        try {
            var horizontalWallCoords = generateHorizontalWallCoords();
            astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
            astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
            astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);
        } catch (err) {
        }

        try {
            var verticalWallCoords = generateVerticalWallCoords();
            astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
            astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
            astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);
        } catch (err) {
        }


        try {
            var verticalWallCoords = generateVerticalWallCoords();
            astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
            astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
            astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);
        } catch (err) {
        }



        try {
            var horizontalWallCoords = generateHorizontalWallCoords();
            astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
            astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
            astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);
        } catch (err) {
        }

        try {
            var horizontalWallCoords = generateHorizontalWallCoords();
            astarAlgo.putWallCell(horizontalWallCoords[0].y, horizontalWallCoords[0].x);
            astarAlgo.putWallCell(horizontalWallCoords[1].y, horizontalWallCoords[1].x);
            astarAlgo.putWallCell(horizontalWallCoords[2].y, horizontalWallCoords[2].x);
        } catch (err) {
        }

        try {
            var verticalWallCoords = generateVerticalWallCoords();
            astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
            astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
            astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);
        } catch (err) {
        }


        try {
            var verticalWallCoords = generateVerticalWallCoords();
            astarAlgo.putWallCell(verticalWallCoords[0].y, verticalWallCoords[0].x);
            astarAlgo.putWallCell(verticalWallCoords[1].y, verticalWallCoords[1].x);
            astarAlgo.putWallCell(verticalWallCoords[2].y, verticalWallCoords[2].x);
        } catch (err) {
        }


        renderGrid();
        assignEvents(astarAlgo);


        astarAlgo.findPath(startX, startY, endX, endY, function(path) {
            var nodeGrid = astarAlgo.getNodeGrid();

            var openedList = astarAlgo.getOpenedList();
            addOpenedListLayer(openedList, nodeGrid);

            var visitedList = astarAlgo.getVisitedList();
            addVisitedListLayer(visitedList, nodeGrid);

            var listWall = astarAlgo.getListWall();
            addWallLayer(listWall);

            var nodeGrid = astarAlgo.getNodeGrid();
            addPathLayer(path.slice(1).slice(0, -1), nodeGrid);

            var startCell = astarAlgo.getStartCell();
            addStartCell(startCell, nodeGrid);

            var endCell = astarAlgo.getEndCell();
            addEndCell(endCell, nodeGrid)
        });
    }
}