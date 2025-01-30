class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.path = "./assets/img/";

    // TODO: Probably should have a loading splash screen (SEGA)
    // that loads everything    
    this.load.spritesheet([
      {
        key: "tileset",
        frameConfig: {
          frameWidth: 32,
          frameHeight: 32,
          startFrame: 0,
          endFrame: 3,
        },
      },
      {
        key: "player",
        frameConfig: {
          frameWidth: 32,
          frameHeight: 40,
          startFrame: 0,
          endFrame: 0,
        },
      }
    ]);
  }

  create() {
    this.scene.start("gameScene");
  }

  update() {}
}
