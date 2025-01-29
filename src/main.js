// Name: Peter Dobbins
// Title: Sonic Boom
// Date: 27/1/25
// Time Spent: ???

"use strict";

let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
  },
  render: {
    pixelArt: true,
  },
  fps: {
    forceSetTimeOut: true,
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
