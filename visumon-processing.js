importScripts('jshashtable-2.1/jshashtable_src.js', 'visumon-transitions.js');


// -----------------------------------------------
// Create virtual table (2 dimensional hashtables)
// to store all the datas in.
var xLimit = 900;
var yLimit = 600;
var userChangeQueue = [];
var changeQueue = [];

var grid = [];


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
  var xvals = grid[x];
  if (xvals == null) {
    return 0;
  }
  var state = xvals[y];
  if (state == null) {
    return 0;
  }
  return state;
}

function setState(x, y, state) {
  if (forbiddenState(x, y)) {
    return;
  }
  var xVector = grid[x];
  if (xVector == null) {
    var yVector = [];
    yVector[y] = state;
    grid[x] = yVector;
  } else {
    xVector[y] = state;
  }
}


// ---------------
// Deal with shit.
function limits(data) {
  xLimit = data.xLimit;
  yLimit = data.yLimit;
}

function pushActivation(data) {
  var x = data.x;
  var y = data.y;
  userChangeQueue.push([x, y, 1]);
}

function onmessage(message) {
  if (message.command == 'limits') {
    limits(message.data);
  } else if (message.command == 'queue') {
    pushActivation(message.data);
    processStack();
  } else if (messsage.command == 'update') {
    processStack();
  }
}
