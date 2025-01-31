class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // FIXME: Move this to its own scene
    let loadingBar = this.add.graphics();
    this.load.on('progress', (value) => {
      loadingBar.clear();
      loadingBar.fillStyle(0xFFFFFF, 1);
      loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);
    });

    this.load.on('complete', () => {
      loadingBar.destroy();
    });

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
