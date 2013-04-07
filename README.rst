==========
visumon.js
==========

*Author: Oliver Uvman (OliverUv @ github)*

*Repository: https://github.com/OliverUv/visumon.js*

*License: MIT License*

*Based on `Conway's Game of Life by Pedro Verruma`__.*
..__ http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/

Visimon will be an interactive game-of-life like visualization written in
javascript, made to connect to a single html5 canvas tag.

Visimon will support having any number of states per cell, each with different
rules deciding when and if it will become a new type of cell. For purposes of
experimentation, we won't be following a global clock, but will instead let
everything unfold through some variant on discrete event simulation.

Interaction with Visimon will be entirely based on detecting when the mouse is
hovering over a cell or not. A cell will be pushed from dead to alive-1 state
when hovered over. This is liable to change depending on optimization issues.

Drawing on canvas should support:
    - Colours for states
    - Borders between cells
    - Blending animations between states
