// Name: Peter Dobbins
// Title: Sonic VROOM
// Date: 27/1/25
// Time Spent: 30 hours
// Creative Tilt:
//  I recreated the physics from the original Sonic the Hedgehog game.
//  The physics includes slopes and loops.
//  The game is also endless, and uses a system to randomly generate map
//  chunks and stitch them together as the player is moving through the
//  level.
//  I made all of the art and sound effects for the game.
//  I did NOT make the music for this game. Sources are located in the README.

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
