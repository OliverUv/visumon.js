importScripts('visumon-transitions.js');


// -----------------------------------------------
// Create virtual table (2 dimensional hashtables)
// to store all the datas in.
var xLimit = 900;
var yLimit = 600;
var model = null;
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
function init(data) {
  xLimit = data.xLimit;
  yLimit = data.yLimit;
  model = machines[data.model];
}

function updateUI(x, y, state) {
  postMessage({x: x, y: y, state: state});
}

function activateCell(data) {
  var x = data.x;
  var y = data.y;
  setState(x, y, 1);
  updateUI(x, y, 1);
  queueUpdates(x, y);
}

// Ensure cells affected by [x, y] are updated next tick.
function queueUpdates(x, y) {
  affectedCells = model.affected(x, y);
  changeQueue = changeQueue.concat(affectedCells);
}

function queueSpecificUpdates(cells) {
  changeQueue = changeQueue.concat(cells);
}

// Process all queued updates.
function tick() {
  // Clear changeQueue so that all cascading effects become
  // part of the next tick instead of this one.
  var toUpdate = changeQueue;
  changeQueue = [];
  for (var i = toUpdate.length - 1; i >= 0; i--) {
    x = toUpdate[i][0];
    y = toUpdate[i][1];
    if (forbiddenState(x, y))
      continue;
    currentState = getState(x, y);
    affectedCells = model.affected(x, y);
    affectors = appendStates(affectedCells);
    newState = model.transition(x, y, currentState, affectors);
    if (newState != currentState) {
      setState(x, y, newState);
      updateUI(x, y, newState);
      queueSpecificUpdates(affectedCells);
    }
  }
}

function onmessage(message) {
  if (message.command == 'init') {
    init(message.data);
  } else if (message.command == 'activate_cell') {
    activateCell(message.data);
  } else if (messsage.command == 'tick') {
    tick();
  }
}
