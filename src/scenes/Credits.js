class Credits extends Phaser.Scene {
  constructor() {
    super("creditsScene");
  }

  create() {
    this.sky = this.add.tileSprite(0, 0, 0, 0, "background", 6).setOrigin(0);
    this.add.image(0, 0, "credits").setOrigin(0);

    this.sound.play("creditsMusic");

    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update(time, delta) {
    this.sky.tilePositionX += (30 * delta) / 1000;

    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.sound.stopAll();
        this.scene.start("menuScene");
      });
    }
  }
}
