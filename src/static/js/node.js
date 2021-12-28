var Node = function(parent, positionX, positionY, costFromStartingNode, costToEndNode) {

    this.parent = parent;
    this.x = positionX;
    this.y = positionY;
    this.costFromStartingNode = costFromStartingNode;
    this.costToEndNode = costToEndNode;

    this.expectedTotalCost = function() {
        return this.costFromStartingNode + this.costToEndNode;
    }
}
