/**
 *   KeepRunning.js
 *   github.com/dguard/snake-astar
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/

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