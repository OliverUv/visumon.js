// Build your own state transition machine! Hooray :D

// Each state is represented by an integer.
// - Dead, inactive cells are in state 0. All cells start in this state.
// - Cells touched by mouse cursor are changed to state 1.
// Other states and all state change behaviour is defined by you.
// Whenever a cell is changed, its changes may propagate to other cells.

// To build a rule set, you need to supply an object with two functions:
//  - Affected: Helps the system propagate changes.
//  - Transition: Tells the system if a cell should change, and to what.

// Affected takes a coordinate and expects a list of coordinates to other
// possibly affected cells. This will be used whenever a cell changes in order
// to figure out which other cells should have your transition function run
// on them.
//
// For Conway's Game of Life, this would look like:
//   affected(4,4) -> [[3,3], [3,4], [3,5], [4,3], [4,5], [5,3], [5,4], [5,5]]
// This can include negative coordinates, though they will be ignored

// Your transition function takes the following arguments:
//  - The position of the subject cell, the surroundings of which
//    changed recently. The transition function decides whether this
//    cell should change to a different state or not.
//  - A list of positions and states of all cells possibly affecting
//    the subject. These are supplied in the exact same order as in the
//    list your Affected function returns for that coordinate.
// Your function should return the next state for this cell.
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
