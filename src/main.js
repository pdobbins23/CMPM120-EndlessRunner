// Name: Peter Dobbins
// Title: Sonic BOOM
// Date: 27/1/25
// Time Spent: 30 hours
// Creative Tilt:
//  I recreated the physics from the original Sonic the Hedgehog game.
//  The physics includes slopes and loops.
//  The game is also endless, and uses a system to randomly generate map
//  chunks and stitch them together as the player is moving through the
//  level.
//  I made all of the art and sound effects for the game.

"use strict";

let config = {
  type: Phaser.AUTO,
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
    // forceSetTimeOut: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: { y: 600 },
    },
  },
  scene: [Load, Menu, Game],
};

let game = new Phaser.Game(config);
