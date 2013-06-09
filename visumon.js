// Author: Oliver Uvman (OliverUv @ github)
// Repository: https://github.com/OliverUv/visumon.js
// License: MIT License
//
// Usage:
// Inserts an object named visumon into window. Call visumon.init
// with the canvas tag id as first argument and its height and width
// as second and third arguments. If {} is passed as fourth argument,
// sane defaults are used. If you want to override any of them, simply
// look at its structure below and send an object containing that which
// you wish to adjust.

visumon = (function(global) {

  var defaults = {
    cellBorders: {
      width: 5,
      height: 5
    },
    cells: {
      height: 15,
      width: 15
    },
    model: 'conway',
    effects: 'brownblue'
  };

  var composer;
  var renderer;
  var scene;

  var worker = new Worker('visumon-processing.js');
  worker.onmessage = pushStateAnimation;

  // Update the visual representation of a grid cell's state.
  var pushStateAnimation = function(data) {
  };

  var initRenderer = function(c) {
    var viewAngle = 45;
    var aspectRatio = c.width / c.height;
    var near = 0.1;
    var far = 10000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(c.width, c.height);

    // Shader effect composition
    composer = new THREE.EffectComposer(renderer);
    var renderPass = new THREE.RenderPass(scene, camera,
              scene.overrideMaterial, BG_COLOR, 0.5);

    // renderPass must be first pass
    // Last pass must have renderToScreen = true;
    composer.addPass(renderPass);
    renderPass.renderToScreen = true;

    scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        viewAngle,
        aspectRatio,
        near,
        far);

    camera.position.z = 500;

    // add static things to scene


    // Render function
    var rendr = function() {
      // Do animation stuff
      composer.render(scene, camera);
      requestAnimationFrame(rendr);
    };

    requestAnimationFrame(rendr);

  };

  var init = function(canvas_name, canvas_width, canvas_height, options) {
    var c = $.extend({}, this.defaults, options);
    c.width = canvas_width;
    c.height = canvas_height;
    c.canvas = $('#' + canvas_name);


    // Calculate number of grid cells
    var xLimit = c.height / (c.cells.height + c.cellBorders.height * 2);
    c.xLimit = Math.floor(xLimit);

    var yLimit = c.width / (c.cells.width + c.cellBorders.width * 2);
    c.yLimit = Math.floor(yLimit);

    initRenderer(c);

    // Start model
    worker.postMessage({
      'command': 'init',
      'data': {xLimit: c.xLimit, yLimit: c.yLimit, model: c.model}});

  };

  // exports
  return {init: init};
}());
