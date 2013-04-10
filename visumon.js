// Author: Oliver Uvman (OliverUv @ github)
// Repository: https://github.com/OliverUv/visumon.js
// License: MIT License

(function(global) {
  var visumon = {
    cellBorders: {
      width: 5,
      height: 5,
      color: '#FFFFFF'
    },

    cells: {
      height: 15,
      width: 15
    },

    init: function(canvas_name) {
      var canvas = $('#' + canvas_name);
    }
  };

  global['visumon'] = visumon;
})(window);
