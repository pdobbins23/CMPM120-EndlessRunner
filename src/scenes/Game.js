class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  create() {
    // TODO: Use localStorage.getItem && setItem for storing player data
    
    // TODO: Use actual parallax background
    this.cameras.main.setBackgroundColor(0x00ffff);
    
    this.player = new Player(this, 50, game.config.height - game.config.height / 6);

    this.player.setDepth(1);
    // this.player.setDebug(false, false);

    // TODO: Make this better
    // After a certain amount of time (maybe level transition),
    // reset positions back to origin
    this.cameras.main.setBounds(0, 0, 64000, 0);

    // TODO: Load chunks from files, randomly stitch, needs heuristics
    // Also unload chunks that go offscreen
    const level = [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, ],
      [ 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, ],
      [ 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, ],
      [ 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, ],
      [ 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, ],
      [ 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, ],
      [ 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    ];

    // TODO: Reassess this setup
    this.chunks = [];

    // NOTE: Test chunks, will generate these later
    for (let i = 0; i < 100; i++) {
      let chunk = new MapChunk(this, level, "tileset", i * 320, 0);

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
