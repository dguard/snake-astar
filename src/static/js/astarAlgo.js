var AStarAlgo = {};
AStarAlgo.js = function() {

    var TOTAL_ROWS = 6;
    var TOTAL_COLS = 11;

    var collisionGrid;
    var nodeGrid;

    var DIAGONAL_DISTANCE = 14;
    var NORMAL_DISTANCE = 10;

    var startY;
    var startX;
    var foundPath;

    var endY;
    var endX;

    var instance = {};
    var solutions = {};

    var attachToNodeGrid = function(nodeGrid, neighbours) {
        for(var i = 0; i < neighbours.length; i++) {
            nodeGrid[neighbours[i].y][neighbours[i].x] = neighbours[i];
        }
    }

    this.setGrid = function(grid) {
        collisionGrid = grid;

        nodeGrid = [];
        for(var i = 0; i < collisionGrid.length; i++) {
            nodeGrid[i] = [];
            for(var j = 0; j < collisionGrid[i].length; j++) {
                nodeGrid[i].push(null);
            }
        }
        instance.listWall = [];
    }
    this.getFoundPath = function() {
        return foundPath;
    }
    this.putStartCell = function(_startY, _startX) {
        instance.openList = {};
        instance.visitedList = {};


        startY = _startY;
        startX = _startX;

        var costToEndNode = (Math.abs(endY - startY) + Math.abs(endX - startX)) * 10;
        var startingNode = new Node(null, startX, startY, 0, costToEndNode);
        instance.openList[JSON.stringify({x: startingNode.x, y: startingNode.y})] = startingNode;


        nodeGrid = [];
        for(var i = 0; i < collisionGrid.length; i++) {
            nodeGrid[i] = [];
            for(var j = 0; j < collisionGrid[i].length; j++) {
                nodeGrid[i].push(null);
            }
        }
        nodeGrid[startingNode.y][startingNode.x] = startingNode;
    }
    this.putEndCell = function(_endY, _endX) {
        endY = _endY;
        endX = _endX;
    }
    this.openNode = function(nodeY, nodeX, callback) {
        var openListHasCell = [false].concat(Array.from(Object.keys(instance.openList))).reduce((prev, key) => {
            return prev || instance.openList[key].y === nodeY && instance.openList[key].x === nodeX;
        });
        if(openListHasCell) {
            // keep
        } else {
            return {"status": "have_not_active_node"};
        }

        var searchNode = this.getNode(nodeY, nodeX);

        if(searchNode.x === endX && searchNode.y === endY) {
            var foundNode = searchNode;
            var path = [foundNode];
            while(foundNode.parent !== null) {
                foundNode = foundNode.parent;
                path.push(foundNode);
            }
            path = path.reverse();
            callback(path);
            return;
        }
        this._openNode(searchNode.y, searchNode.x);
    }
    var addNeighbour = function(parent, diffX, diffY, neighbours, endX, endY) {
        if(parent.x + diffX < 0 || parent.y + diffY < 0
            || parent.x + diffX > collisionGrid[0].length-1
            || parent.y + diffY > collisionGrid.length-1) {
            return;
        }
        const isDiagonal = (diffX === -1 && diffY === -1) || (diffX === -1 && diffY === 1)
            || (diffX === 1 && diffY === 1) || (diffX === 1 && diffY === -1);
        const newDistance = isDiagonal ? DIAGONAL_DISTANCE : NORMAL_DISTANCE;
        var costFromStartingNode = parent.costFromStartingNode + newDistance;
        var costToEndNode = (Math.abs(endY - (parent.y + diffY)) + Math.abs(endX - (parent.x + diffX))) * 10;

        var node = new Node(parent, parent.x + diffX, parent.y + diffY, costFromStartingNode, costToEndNode);
        return neighbours.push(node);
    }
    this.getNode = function(nodeY, nodeX) {
        return nodeGrid[nodeY][nodeX];
    }
    this._openNode = function(nodeY, nodeX) {
        var searchNode = nodeGrid[nodeY][nodeX];
        var neighbours = [];
        addNeighbour(searchNode, 0, -1, neighbours, endX, endY);
        addNeighbour(searchNode, -1, -1, neighbours, endX, endY);
        addNeighbour(searchNode, -1, 0, neighbours, endX, endY);
        addNeighbour(searchNode, -1, 1, neighbours, endX, endY);
        addNeighbour(searchNode, 0, 1, neighbours, endX, endY);
        addNeighbour(searchNode, 1, 1, neighbours, endX, endY);
        addNeighbour(searchNode, 1, 0, neighbours, endX, endY);
        addNeighbour(searchNode, 1, -1, neighbours, endX, endY);

        for(var i = 0; i < neighbours.length; i++) {
            var node = neighbours[i];

            var isWall = [false].concat(Array.from(instance.listWall)).reduce((prev, coords) => {
                return prev || coords.y === nodeY && coords.x === nodeX;
            });
            if(instance.visitedList[JSON.stringify({x: node.x, y: node.y})] !== undefined || isWall) {
                continue;
            }
            nodeGrid[node.y][node.x] = node;

            if(searchNode.expectedTotalCost() < neighbours[i].expectedTotalCost()
                || instance.visitedList[JSON.stringify({x: node.x, y: node.y})] === undefined) {
                neighbours[i].parent = searchNode;
                nodeGrid[node.y][node.x] = node;

                if(instance.openList[JSON.stringify({x: node.x, y: node.y})] === undefined) {
                    instance.openList[JSON.stringify({x: node.x, y: node.y})] = node;
                }
            }
        }

        delete instance.openList[JSON.stringify({x: searchNode.x, y: searchNode.y})]
        instance.visitedList[JSON.stringify({x: searchNode.x, y: searchNode.y})] = searchNode;
    }
    this.putWallCell = function(posY, posX) {
        instance.listWall.push({y: posY, x: posX});
    }
    this.getListWall = function() {
        return instance.listWall;
    }
    this.getNodeGrid = function() {
        return nodeGrid;
    }
    this.getOpenedList = function() {
        return instance.openList;
    }
    this.getVisitedList = function() {
        return instance.visitedList;
    }
    this.getStartCell = function() {
        return {y: startY, x: startX};
    }
    this.getEndCell = function() {
        return {y: endY, x: endX};
    }
    var getLowestCostNode = function() {
        var lowestNode = Array.from(Object.keys(instance.openList)).map((item) => {
            var coords = JSON.parse(item);
            return nodeGrid[coords.y][coords.x];
        }).sort((nodeA, nodeB) => {
            if(nodeB === null) return -1;
            if(nodeA === null) return 1;

            return nodeA.expectedTotalCost() - nodeB.expectedTotalCost();
        }).shift();
        return lowestNode;
    }

    this.findPath = function(startX, startY, _endX, _endY, callback) {
        // check startX, startY and endX and endY inside board

        endY = _endY;
        endX = _endX;

        /*
        instance.openList = {};
        instance.visitedList = {};
        instance.listWall = [];
        */

        var costToEndNode = Math.abs(endY - startY) + Math.abs(endX - startX) * 10;
        var startingNode = new Node(null, startX, startY, 0, costToEndNode);
        instance.openList[JSON.stringify({x: startingNode.x, y: startingNode.y})] = startingNode;


        nodeGrid = [];
        for(var i = 0; i < collisionGrid.length; i++) {
            nodeGrid[i] = [];
            for(var j = 0; j < collisionGrid[i].length; j++) {
                nodeGrid[i].push(null);
            }
        }
        nodeGrid[startingNode.y][startingNode.x] = startingNode;

        var iterationsPerCalculation = 100;
        for(var iterationSoFar = 0; iterationSoFar < iterationsPerCalculation; iterationSoFar++) {
            var searchNode = getLowestCostNode();

            if(searchNode.x === endX && searchNode.y === endY) {
                var foundNode = searchNode;
                var path = [foundNode];
                while(foundNode.parent !== null) {
                    foundNode = foundNode.parent;
                    path.push(foundNode);
                }
                path = path.reverse();
                foundPath = path;

                // begin avoiding repeating region
                var tmpPath = path.slice(0).reverse();
                var usedSolution;
                while(tmpPath.length > 1) {
                    if(!usedSolution) {
                        if(!solutions[`_${tmpPath[0].y}_${tmpPath[0].x}`]) {
                            solutions[`_${tmpPath[0].y}_${tmpPath[0].x}`] = {
                                time: Number(new Date())
                            };
                        }

                        usedSolution = solutions[`_${tmpPath[0].y}_${tmpPath[0].x}`];
                    } else {
                        //
                    }

                    if (usedSolution && !usedSolution[`_${tmpPath[1].y}_${tmpPath[1].x}`]) {
                        usedSolution[`_${tmpPath[1].y}_${tmpPath[1].x}`] = {
                            time: Number(new Date())
                        };
                    }
                    usedSolution = usedSolution[`_${tmpPath[1].y}_${tmpPath[1].x}`];


                    tmpPath.shift();
                }
                // console.log(JSON.stringify(solutions));

                var commonPath = [Object.keys(solutions)[0]];
                var usedSolution = solutions;
                while(Object.keys(usedSolution).length > 0) {
                    var keys = Object.keys(usedSolution);
                    if(keys.length > 1) {
                        var sortedKeys = keys.sort((keyA, keyB) => {
                            if(typeof usedSolution[keyB] !== Object(usedSolution[keyB])) {
                                return -1;
                            }
                            if(typeof usedSolution[keyA] !== Object(usedSolution[keyA])) {
                                return 1;
                            }

                            return usedSolution[keyA]['time'] - usedSolution[keyB]['time'];
                        });
                        // console.log('sorted keys:' + JSON.stringify(sortedKeys));
                        if(sortedKeys[0] === 'time') {
                            sortedKeys = sortedKeys.slice(1);
                        }
                        if(sortedKeys.length > 0) {
                            var firstRecord = sortedKeys[0];
                            usedSolution = usedSolution[firstRecord];
                            commonPath.push(firstRecord)
                        }
                    } else {
                        usedSolution = usedSolution[keys[0]];

                        if(typeof usedSolution === Object(usedSolution)) {
                            commonPath.push(keys[0])
                        }
                    }

                }
                // end avoiding repeating region
                console.log(commonPath);
                // nextTurn from commonPath already in solutions tree and endY, endX same

                // console.log(commonPath.reverse(), `_${path[1].y}_${path[1].x}`, commonPath.reverse().indexOf(`_${path[1].y}_${path[1].x}`));

                // next turn found in list
                //
                // console.log(instance.listWall);
                // console.log(startY, startX);
                // console.log(endY, endX);


                if(path.length > 1 && commonPath.reverse().indexOf(`_${path[1].y}_${path[1].x}`) > 0) {
                    var foundIndex = commonPath.indexOf(`_${path[0].y}_${path[0].x}`);

                    var tmpCommonPath = commonPath.slice(foundIndex);

                    path = path.filter((item) => {
                        return tmpCommonPath.indexOf(`_${item.y}_${item.x}`) > 0;
                    });
                    if(path.length === 1) {
                        path = [path[0], path[0]];
                    }

                    foundPath = path;
                }
                // // fix bug
                // if(!path) {
                // }
                // console.log(JSON.stringify(path));
                //
                // // release memory
                // if(path[1].y === endY && path[1].x === endX) {
                //     Object.keys(solutions).map((key) => {
                //         delete solutions[key];
                //     });
                // }




                // console.log(JSON.stringify(solutions));

                callback(path);

                // path has same endY, endX
                // remember startX, startY
                // path has common innerPath but different startX, startY
                // first time remember
                // second time common inner path found and have option to move from startX, startY to innerPath[0]

                // previous turn
                // current turn has different endY, endX
                // remove previous turn
                return;
            }
            this._openNode(searchNode.y, searchNode.x);
        }

    }

}