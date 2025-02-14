class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    let loadingBar = this.add.graphics();
    this.load.on('progress', (value) => {
      loadingBar.clear();
      loadingBar.fillStyle(0xFFFFFF, 1);
      loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);
    });

    this.load.on('complete', () => {
      loadingBar.destroy();

      this.add.image(0, 0, "loadingDone").setOrigin(0);
    });

    this.load.image("loadingDone", "assets/img/loadingdone.png");
    
    this.load.spritesheet("grid", "./assets/img/grid.png", {
      frameWidth: 32,
    });

    this.load.spritesheet("player", "./assets/img/player.png", {
      frameWidth: 32,
      frameHeight: 40,
    });

    this.load.spritesheet("background", "./assets/img/background.png", {
      frameWidth: 1280,
      frameHeight: 720,
    });

    this.load.spritesheet("title", "./assets/img/title.png", {
      frameWidth: 320,
      frameHeight: 240,
    });

    this.load.image("ring", "./assets/img/ring.png");

    this.load.tilemapTiledJSON("loop", "assets/chunks/Loop.json");
    this.load.tilemapTiledJSON("tallLoop", "assets/chunks/TallLoop.json");
    this.load.tilemapTiledJSON("flat", "assets/chunks/Flat.json");
    this.load.tilemapTiledJSON("smallHill", "assets/chunks/SmallHill.json");
    this.load.tilemapTiledJSON("smallRamp", "assets/chunks/SmallRamp.json");
    this.load.tilemapTiledJSON("doubleLoop", "assets/chunks/DoubleLoop.json");
    this.load.tilemapTiledJSON("hills", "assets/chunks/Hills.json");

    this.add.sprite("invis", 1, 1);

    this.load.image("intro", "assets/img/intro.png");
    this.load.image("introLayer", "assets/img/introlayer.png");
    this.load.image("presents", "assets/img/present.png");
    this.load.image("gameOver", "assets/img/gameover.png");
    this.load.image("instructions", "assets/img/instructions.png");
    this.load.image("credits", "assets/img/credits.png");

    this.load.audio("titleMusic", "assets/sfx/title.mp3");
    this.load.audio("levelMusic", "assets/sfx/level.mp3");
    this.load.audio("creditsMusic", "assets/sfx/credits.mp3");
    this.load.audio("jump", "assets/sfx/jump.wav");
    this.load.audio("pickup", "assets/sfx/pickup.wav");
    this.load.audio("intro", "assets/sfx/intro.mp3");
    this.load.audio("hit", "assets/sfx/hit.wav");
  }

  create() {
    this.input.on("pointerdown", () => {
      this.scene.start("menuScene");
    });
  }
}
