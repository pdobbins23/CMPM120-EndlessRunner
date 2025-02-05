class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  preload() {
    this.load.tilemapTiledJSON("chunk", "assets/chunks/Chunk.json");
  }

  create() {
    // TODO: Use localStorage.getItem && setItem for storing player data
    
    // TODO: Use actual parallax background
    this.cameras.main.setBackgroundColor(0x00ffff);
    
    this.player = new Player(this, 50, game.config.height - game.config.height / 5);

    this.player.setDepth(1);
    // this.player.setDebug(false, false);

    // TODO: Make this better
    // After a certain amount of time (maybe level transition),
    // reset positions back to origin
    this.cameras.main.setBounds(0, 0, 64000, 0);

    // TODO: Load chunks from files, randomly stitch, needs heuristics
    // Also unload chunks that go offscreen
    // const level = [
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, ],
    //   [ 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, ],
    //   [ 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, ],
    //   [ 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, ],
    //   [ 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, ],
    //   [ 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, ],
    //   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    // ];

    // const level = [
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 22, 23, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 88, 64, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 0, ],
    //   [ 0, 0, 0, 36, 0, 0, 0, 88, 76, 77, 0, 0, 0, 0, 82, 83, 0, 0, 0, 0, ],
    //   [ 0, 0, 36, 4, 0, 0, 0, 0, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, ],
    //   [ 12, 12, 4, 4, 12, 12, 12, 12, 4, 4, 4, 4, 4, 4, 4, 4, 12, 12, 12, 12, ],
    //   [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, ],
    // ];

    // TODO: Reassess this setup
    this.chunks = [];

    // NOTE: Test chunks, will generate these later
    for (let i = 0; i < 100; i++) {
      let chunk = new MapChunk(this, "chunk", "grid", i * 640, 0);

      this.chunks.push(chunk);

      this.physics.add.collider(this.player, chunk.layer);
    }

    this.CAMERA_SPEED = 10;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.graphics = this.add.graphics();
    this.graphics.depth = 2;
  }

  update() {
    this.player.update();

    // this.graphics.fillStyle(0xffffff, 1);
    // this.graphics.fillRect(this.player.body.x + this.player.body.width / 2, this.player.body.y + this.player.body.height, 5, 5);

    this.smoothMoveCameraTowards(this.player);
    // this.cameras.main.rotation = this.player.rotation;
  }

  // TODO: Probably change this a lot, play around with different values
  smoothMoveCameraTowards (target, smoothFactor)
  {
    if (smoothFactor === undefined) { smoothFactor = 0; }
    this.cameras.main.scrollX = smoothFactor * this.cameras.main.scrollX + (1 - smoothFactor) * (target.x - this.cameras.main.width * 0.5);
    this.cameras.main.scrollY = smoothFactor * this.cameras.main.scrollY + (1 - smoothFactor) * (target.y - this.cameras.main.height * 0.5);
  }
}
