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
    this.title.setScale(2);
    this.title.setDepth(5);

    this.water1 = this.add.tileSprite(0, 0, 0, 0, "background", 0).setOrigin(0);
    this.water1.setDepth(1);

    this.water2 = this.add.tileSprite(0, 0, 0, 0, "background", 1).setOrigin(0);
    this.water2.setDepth(1);

    this.water3 = this.add.tileSprite(0, 0, 0, 0, "background", 2).setOrigin(0);
    this.water3.setDepth(1);

    this.anims.create({
      key: "hills",
      frameRate: 1,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("background", {
        start: 3,
        end: 4,
      })
    });

    this.hillsAnimator = this.add.sprite(0, 0, "background").setVisible(false);
    this.hillsAnimator.play("hills");
    this.hills = this.add.tileSprite(0, 0, 0, 0, "background", 3).setOrigin(0);
    this.hills.setDepth(2);
    
    this.mountains = this.add.tileSprite(0, 0, 0, 0, "background", 5).setOrigin(0);
    this.mountains.setDepth(1);

    this.sky = this.add.tileSprite(0, 0, 0, 0, "background", 6).setOrigin(0);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    this.water1.tilePositionX += 0.3;
    this.water2.tilePositionX += 0.15;
    this.water3.tilePositionX += 0.1;
    this.hills.tilePositionX += 0.05;
    this.mountains.tilePositionX += 0.025;
    this.sky.tilePositionX += 0.01;

    this.hills.setFrame(this.hillsAnimator.anims.currentFrame.textureFrame);

    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.start("gameScene");
    }
  }
}
