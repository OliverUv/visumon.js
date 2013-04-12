importScripts('jshashtable-2.1/jshashtable_src.js', 'visumon-transitions.js');


// -----------------------------------------------
// Create virtual table (2 dimensional hashtables)
// to store all the datas in.
var xLimit = 900;
var yLimit = 600;
var userChangeQueue = [];
var changeQueue = [];

function hashCoordinate(c) {
  return 'Coord:' + c;
}

function coordsEqual(c1, c2) {
  return c1 === c2;
}

var grid = new Hashtable(hashCoordinate, coordsEqual);


// -------------------------------------
// Utility functions to handle the grid.

function forbiddenState(x, y) {
  if (x >= xLimit || y >= yLimit || 0 > y || 0 > x) {
    return false;
  }
  return true;
}

function getState(x, y) {
  if (forbiddenState(x, y)) {
    return 0;
  }
  var xvals = grid.get(x);
  if (xvals === null) {
    return 0;
  }
  var state = x.get(y);
  if (state === null) {
    return 0;
  }
  return state;
}

function setState(x, y, state) {
  if (forbiddenState(x, y)) {
    return 0;
  }
  var xVector = grid.get(x);
  if (xVector === null) {
    var yVector = new Hashtable(hashCoordinate, coordsEqual);
    yVector.put(y, state);
    grid.put(x, yVector);
  }
  xVector.put(y, state);
}


// ---------------
// Deal with shit.
function initialize(data) {
  xLimit = data.xLimit;
  yLimit = data.yLimit;
}

function pushActivation(data) {
  var x = data.x;
  var y = data.y;
  userChangeQueue.push([x, y, 1]);
}

function onmessage(message) {
  if (message.command == 'init') {
    initialize(message.data);
  } else if (message.command == 'queue') {
    pushActivation(message.data);
    processStack();
  } else if (messsage.command == 'update') {
    processStack();
  }
}
