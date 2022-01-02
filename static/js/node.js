var Node = function(parent, positionX, positionY, costFromStartingNode, costToEndNode) {

    this.parent = parent;
    this.x = positionX;
    this.y = positionY;
    this.costFromStartingNode = costFromStartingNode;
    this.costToEndNode = costToEndNode;

    this.toString = () => {
        return `{y: ${this.y}, x: ${this.x}}`
    }

    this.expectedTotalCost = function() {
        return this.costFromStartingNode + this.costToEndNode;
    }
}
