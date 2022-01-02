var astarDemo = new AStarDemo();
astarDemo.init();

function _keepRunning() {
    astarDemo.doTurn(function() {
        setTimeout(() => {
            _keepRunning();
        }, 100)
    })
}
_keepRunning();