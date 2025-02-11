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

    const music = this.sound.add("titleMusic");

    const introMusic = this.sound.add("intro");

    this.presents = this.add.image(0, 0, "presents").setScale(2).setDepth(9).setOrigin(0);

    this.intro = this.add.image(-game.config.width / 2 + 40, -game.config.height / 2 + 40, "intro").setScale(4).setOrigin(0).setDepth(10);
    this.introLayer = this.physics.add.sprite(-150 - game.config.width / 2, -game.config.height /2, "introLayer").setScale(4).setOrigin(0).setDepth(11).setDebug(false);
    this.playingIntro = true;
    this.introStage = 0;

    introMusic.play();

    introMusic.once("complete", () => {
      music.play();

      this.introLayer.setVisible(false);
    });
  }

  update(time, delta) {
    if (this.playingIntro) {
      switch (this.introStage) {
        case 0:
          this.introLayer.setVelocity(550, 0);

          if (this.introLayer.x > 50) {
            this.introLayer.setVisible(false);

            this.time.delayedCall(1500, () => {
              this.cameras.main.fadeOut(500, 0, 0, 0);
              this.cameras.main.once("camerafadeoutcomplete", () => {
                this.introStage = 2;
              });
            });

            this.introStage = 1;
          }
          break;
        case 2:
          this.intro.setVisible(false);
          this.cameras.main.fadeIn(500, 0, 0, 0);
          this.cameras.main.once("camerafadeincomplete", () => {
            this.time.delayedCall(3700, () => {
              this.cameras.main.fadeOut(500, 0, 0, 0);
              this.cameras.main.once("camerafadeoutcomplete", () => {
                this.introStage = 4;
              });
            });
          });
          this.introStage = 3;
          break;
        case 4:
          this.presents.setVisible(false);
          this.cameras.main.fadeIn(500, 0, 0, 0);
          this.cameras.main.once("camerafadeincomplete", () => {
            this.playingIntro = false;
          });
          this.introStage = 5;
          break;
      }
    } else {
      this.water1.tilePositionX += (60 * delta) / 1000;
      this.water2.tilePositionX += (30 * delta) / 1000;
      this.water3.tilePositionX += (15 * delta) / 1000;
      this.hills.tilePositionX += (10 * delta) / 1000;
      this.mountains.tilePositionX += (5 * delta) / 1000;
      this.sky.tilePositionX += (2.5 * delta) / 1000;

      this.hills.setFrame(this.hillsAnimator.anims.currentFrame.textureFrame);

      if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.scene.start("gameScene");
      }
    }
  }
}
