// Name: Peter Dobbins
// Title: Sonic BOOM
// Date: 27/1/25
// Time Spent: 3 hours

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
    // FIXME: Probably should disable this for final game
    // Used to fix weird ghosting issue on high refresh monitors (sorta)
    // Ultimately, need to research a better longterm solution
    forceSetTimeOut: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      // TODO: Find good gravity value
      gravity: { y: 600 },
    },
  },
  scene: [Menu, Game],
};

let game = new Phaser.Game(config);
