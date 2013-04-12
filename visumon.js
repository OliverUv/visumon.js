// Author: Oliver Uvman (OliverUv @ github)
// Repository: https://github.com/OliverUv/visumon.js
// License: MIT License
//
// Usage:
// Inserts an object named visumon into window. Call visumon.init
// with the canvas tag id as first argument and a list of options
// as the second argument. If {} is passed as second argument,
// sane defaults are used instead.

visumon = (function(global) {

  var defaults = {
    width: 900,
    height: 600,
    cellBorders: {
      width: 5,
      height: 5,
      color: '#FFFFFF'
    },
    cells: {
      height: 15,
      width: 15
    }
  };

  var drawState = function(data) {
  };

  var worker = new Worker('visumon-processing.js');
  worker.onmessage = drawState;

  var init = function(canvas_name, options) {
    var c = $.extend({}, this.defaults, options);
    var canvas = $('#' + canvas_name);

    // Calculate number of grid cells
    var xLimit = c.height / (c.cells.height + c.cellBorders.height * 2);
    var xLimit = Math.floor(xLimit);

    var yLimit = c.width / (c.cells.width + c.cellBorders.width * 2);
    var yLimit = Math.floor(yLimit);

    worker.postMessage({
      'command': 'init',
      'data': {xLimit: xLimit, yLimit: yLimit}});

  };

  // exports
  return {init: init};
}());
