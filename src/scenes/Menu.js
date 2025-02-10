class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // TODO: Probably should have a loading splash screen (MEGA)
    // that loads everything
  }

  create() {
    this.anims.create({
      key: "title",
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("title", {
        start: 0,
        end: 1,
      })
    });

    this.title = this.add.sprite(game.config.width / 2, game.config.height / 2, "title");
    this.title.play("title");

    this.water1 = this.add.tileSprite(0, game.config.height / 2, 0, 0, "background", 0);
  }

  update() {}
}
