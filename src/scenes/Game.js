class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  preload() {
  }

  create() {
    // TODO: Use localStorage.getItem && setItem for storing player data
    
    // background
    this.water0 = this.add.tileSprite(0, 112, 0, 0, "background", 0).setOrigin(0);
    this.water0.setDepth(-2).setScrollFactor(0);

    this.water1 = this.add.tileSprite(0, 0, 0, 0, "background", 0).setOrigin(0);
    this.water1.setDepth(-2).setScrollFactor(0);

    this.water2 = this.add.tileSprite(0, 0, 0, 0, "background", 1).setOrigin(0);
    this.water2.setDepth(-2).setScrollFactor(0);

    this.water3 = this.add.tileSprite(0, 0, 0, 0, "background", 2).setOrigin(0);
    this.water3.setDepth(-2).setScrollFactor(0);

    this.anims.create({
      key: "hills",
      frameRate: 500,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("background", {
        start: 3,
        end: 4,
      })
    });

    this.hillsAnimator = this.add.sprite(0, 0, "background").setVisible(false);
    this.hillsAnimator.play("hills");
    this.hills = this.add.tileSprite(0, 0, 0, 0, "background", 3).setOrigin(0);
    this.hills.setDepth(0).setScrollFactor(0);
    
    this.mountains = this.add.tileSprite(0, 0, 0, 0, "background", 5).setOrigin(0);
    this.mountains.setDepth(-1).setScrollFactor(0);

    this.sky = this.add.tileSprite(0, 0, 0, 0, "background", 6).setOrigin(0);
    this.sky.setDepth(-3).setScrollFactor(0);
    
    this.player = new Player(this, 50, 600);
    // this.player.setDebug(false);
    this.player.setDepth(1);

    this.showingInstructions = true;
    this.instructions = this.add.image(0, 0, "instructions").setOrigin(0).setDepth(1000).setScrollFactor(0).setVisible(false);

    this.gameOver = false;
    this.gameOverScreen = this.add.image(0, 0, "gameOver").setOrigin(0).setDepth(1000).setScrollFactor(0).setVisible(false);

    this.cameras.main.startFollow(this.player, true, 1, 1);

    // TODO: Make this better
    // After a certain amount of time (maybe level transition),
    // reset positions back to origin
    this.cameras.main.setBounds(0, 0, Infinity, 800);

    this.add.image(30, 30, "ring").setScrollFactor(0).setDepth(100);
    this.ringCount = 0;
    this.ringCountText = this.add.text(60, 13, '0', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#ffffff',
    }).setScrollFactor(0).setDepth(100);

    this.chunks = [];
    this.worldChunkOffset = 0;

    // first three chunks are always fixed
    this.chunks.push(new MapChunk(this, "flat", "grid", 0 * 1280, 0));
    this.chunks.push(new MapChunk(this, "smallHill", "grid", 1 * 1280, 0));
    this.chunks.push(new MapChunk(this, "loop", "grid", 2 * 1280, 0));
    this.chunks.push(new MapChunk(this, "flat", "grid", 3 * 1280, 0));

    this.CAMERA_SPEED = 10;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.graphics = this.add.graphics();
    this.graphics.depth = 5;

    this.sound.stopAll();

    const music = this.sound.add("levelMusic");

    music.addMarker({
      name: "startSection",
      start: 0,
      duration: 15,
      config: { loop: false },
    });

    music.addMarker({
      name: "loopSection",
      start: 15,
      duration: 80,
      config: { loop: true },
    });
    
    music.play("startSection");

    music.once("complete", () => {
      music.play("loopSection");
    });

    this.jumpSound = this.sound.add("jump");
    this.pickupSound = this.sound.add("pickup");

    this.starting = true;
    this.player.body.allowGravity = false;

    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.cameras.main.once("camerafadeincomplete", () => {
      this.starting = false;
      this.instructions.setVisible(true);
    });

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update(time, delta) {
    if (this.starting) return;

    if (this.showingInstructions) {
      if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.showingInstructions = false;
        this.instructions.setVisible(false);
        this.player.body.allowGravity = true;
      }
      return;
    }
    
    this.graphics.clear();
    
    this.ringCountText.setText(`${this.ringCount}`);

    if (!this.gameOver) {
      this.water0.tilePositionX += (100 * delta) / 1000;
      this.water1.tilePositionX += (60 * delta) / 1000;
      this.water2.tilePositionX += (30 * delta) / 1000;
      this.water3.tilePositionX += (15 * delta) / 1000;
      this.hills.tilePositionX += (10 * delta) / 1000;
      this.mountains.tilePositionX += (5 * delta) / 1000;
      this.sky.tilePositionX += (3 * delta) / 1000;

      this.hills.setFrame(this.hillsAnimator.anims.currentFrame.textureFrame);

      this.player.update();

      let playerChunkX = Math.floor(this.player.x / 1280);

      // console.log(playerChunkX, this.worldChunkOffset);

      if (playerChunkX - this.worldChunkOffset + 5 > this.chunks.length) {
        let chunks = ["flat", "smallHill", "smallRamp", "tallLoop", "loop", "doubleLoop", "hills"];
        let chunk = new MapChunk(this, chunks[Math.floor(Math.random() * chunks.length)], "grid", (this.worldChunkOffset + this.chunks.length) * 1280, 0);

        this.chunks.push(chunk);

        // console.log(`Added chunk: ${(4 + this.worldChunkOffset)}`);
      }

      if (playerChunkX - this.worldChunkOffset > 2) {
        this.chunks.splice(0, 1);
        this.worldChunkOffset += 1;
      }
    }
  }
}
