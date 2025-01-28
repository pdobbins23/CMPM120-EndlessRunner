// Name: Peter Dobbins
// Title: Sonic Boom
// Date: 27/1/25
// Time Spent: ???

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 600 },
    },
  },
  scene: [Menu, Game],
};

let game = new Phaser.Game(config);
