// Build your own state transition machine! Hooray :D

// Dead, inactive cells are in state 0. All cells start in this state.
// Cells touched by mouse cursor are changed to state 1.
// Other states and all state behaviour is defined by you.
// Whenever a cell is changed, its changes propagate to other cells.

// You need to supply an object with two functions, affected and transition.

// Affected takes a coordinate and expects a list of coordinates to other
// possibly affected cells. This will be used whenever a cell changes in order
// to figure out which other cells should have your transition function run
// on them.
//
// For Conway's Game of Life, this would look like:
//   affected(4,4) -> [[3,3], [3,4], [3,5], [4,3], [4,5], [5,3], [5,4], [5,5]]
// This can include negative coordinates, though they will be ignored

// Your transition function takes the position of a cell who's surroundings
// have changed in a way it might care about. It takes that cell's state,
// and a list with the positions & states of all cells that could affect it.
// These other cells are called affectors, and are supplied in the exact same
// order as in the list of your affected function. Your function should return
// the next state for this cell.
//
// Cells outside of the grid will always be reported as having state 0.


function radius(x, y, r) {
  var affected_states = [];

  for (var i = -r; i <= r; i++) {
    for (var j = -r; i <= r; j++) {
      if (i == x && j == y)
        continue;
      affected_states.push([x + i, y + i];
    }
  }
  return affected_states;
}

var conway = {
  affected: function(x, y) {
    return radius(x, y, 1);
  },
  transition: function(x, y, state, affectors) {
    living_neighbours = 0;
  }
};

var machines = {
  'conway': conway
};
