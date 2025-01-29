class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  create() {
    console.log("create: game");

    this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "player", 1);
    this.player.body.setSize(32, 32).setOffset(0, 8);
    this.playerSpeed = 350;
    this.player.setDepth(1);
    this.player.setDebug(false, false);

    const level = [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    ];

    this.maps = [];
    this.tiles = [];
    this.layers = [];
    this.solids = [];

    for (let i = 0; i < 10; i++) {
      let map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
      let tiles = map.addTilesetImage("tileset");
      let layer = map.createLayer(0, tiles, i * 321, 0);

      this.solids.push(map.filterTiles(tile => tile.index > 0));

      this.maps.push(map);
      this.tiles.push(tiles);
      this.layers.push(layer);

      map.setCollisionBetween(1, 4, true);

      this.physics.add.collider(this.player, layer);
    }

    this.CAMERA_SPEED = 10;

    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  update() {
    let playerVel = new Phaser.Math.Vector2(0, 0);

    if (this.keyUP.isDown) {
      if (this.player.body.blocked.down && this.player.body.velocity.y == 0) {
        playerVel.y = -400;
      }
    }
    if (this.keyDOWN.isDown) {
      // TODO: Rolling
      // this.playerSpeed = 500;
    }
    if (this.keyF.isDown) {
      this.player.rotation += 0.01;
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.player.rotation = 0;
    }

    // TODO: Fix velocity
    this.player.setVelocity(this.playerSpeed, this.player.body.velocity.y + playerVel.y);

    this.smoothMoveCameraTowards(this.player);
    this.cameras.main.rotation = this.player.rotation;
  }

  smoothMoveCameraTowards (target, smoothFactor)
  {
    if (smoothFactor === undefined) { smoothFactor = 0; }
    this.cameras.main.scrollX = smoothFactor * this.cameras.main.scrollX + (1 - smoothFactor) * (target.x - this.cameras.main.width * 0.5);
    this.cameras.main.scrollY = smoothFactor * this.cameras.main.scrollY + (1 - smoothFactor) * (target.y - this.cameras.main.height * 0.5);
  }
}
