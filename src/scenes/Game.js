class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  create() {
    console.log("create: game");

    const TILE_SIZE = 32;

    const NEEDED_ROWS = Math.floor(game.config.height / TILE_SIZE) + 1;
    const NEEDED_COLS = Math.floor(game.config.width / TILE_SIZE) + 1;

    let visibleMap = [];

    for (let y = 0; y < NEEDED_ROWS; y++) {
      let row = [];
      
      for (let x = 0; x < NEEDED_COLS; x++) {
        const frame = Math.floor(Math.random() * 4);
        row.push(this.add.sprite(x * TILE_SIZE, y * TILE_SIZE, "tileset", frame));
      }

      visibleMap.push(row);
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
    if (this.keyUP.isDown) {
      this.cameras.main.y += this.CAMERA_SPEED;
    }
    if (this.keyDOWN.isDown) {
      this.cameras.main.y -= this.CAMERA_SPEED;
    }
    if (this.keyLEFT.isDown) {
      this.cameras.main.x += this.CAMERA_SPEED;
    }
    if (this.keyRIGHT.isDown) {
      this.cameras.main.x -= this.CAMERA_SPEED;
    }
    if (this.keyF.isDown) {
      this.cameras.main.rotation += 0.01;
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.cameras.main.rotation = 0;
    }

    this.cameras.main.viewport = this.cameras.main.worldView;
  }
}
