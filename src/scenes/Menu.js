class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // TODO: Probably should have a loading splash screen (MEGA)
    // that loads everything

    // Load tile art
    this.load.spritesheet("tileset", "./assets/img/tileset.png", {
      frameWidth: 32,
    });

    // Load player art
    this.load.spritesheet("player", "./assets/img/player.png", {
      frameWidth: 32,
      frameHeight: 40,
    });
  }

  create() {
    this.scene.start("gameScene");
  }

  update() {}
}
