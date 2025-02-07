class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.layer = 0;

    this.groundSpeed = 50;
    this.jumpHeight = -400;

    this.onGround = false;
    this.lastOnGround = false;
    this.groundAngle = 0;
    
    this.rolling = false;

    // sensors
    this.sensorBL = {offsetX: -0.75, offsetY: 1, dirX: 0, dirY: 1};
    this.sensorBR = {offsetX: 0.75, offsetY: 1, dirX: 0, dirY: 1};
    this.sensorML = {offsetX: -0.75, offsetY: 0, dirX: -1, dirY: 0};
    this.sensorMR = {offsetX: 0.75, offsetY: 0, dirX: 1, dirY: 0};
    this.sensorTL = {offsetX: -0.75, offsetY: -1, dirX: 0, dirY: -1};
    this.sensorTR = {offsetX: 0.75, offsetY: -1, dirX: 0, dirY: -1};

    // Setup animations
    this.anims.create({
      key: "run",
      frameRate: 15,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 4,
      })
    });

    this.anims.create({
      key: "roll",
      frameRate: 0,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 5,
        end: 5,
      })
    });

    this.run();
  }

  run() {
    this.body.setSize(32, 32).setOffset(0, 4);
    this.play("run", true);
  }

  roll() {
    this.body.setSize(30, 24).setOffset(0, 14);
    this.play("roll", true);
  }

  update() {
    let sensorBLPos = {x: this.x + this.sensorBL.offsetX * (this.width / 2), y: this.y + this.sensorBL.offsetY * (this.height / 2)};
    let sensorBRPos = {x: this.x + this.sensorBR.offsetX * (this.width / 2), y: this.y + this.sensorBR.offsetY * (this.height / 2)};
    let sensorMLPos = {x: this.x + this.sensorML.offsetX * (this.width / 2), y: this.y + this.sensorML.offsetY * (this.height / 2)};
    let sensorMRPos = {x: this.x + this.sensorMR.offsetX * (this.width / 2), y: this.y + this.sensorMR.offsetY * (this.height / 2)};
    let sensorTLPos = {x: this.x + this.sensorTL.offsetX * (this.width / 2), y: this.y + this.sensorTL.offsetY * (this.height / 2)};
    let sensorTRPos = {x: this.x + this.sensorTR.offsetX * (this.width / 2), y: this.y + this.sensorTR.offsetY * (this.height / 2)};

    // TODO: Handle rotations?

    // debug stuff
    this.scene.graphics.fillStyle(0xFF0000, 1);
    this.scene.graphics.fillRect(this.x, this.y, 2, 2);
    this.scene.graphics.fillRect(sensorBLPos.x, sensorBLPos.y, 2, 2);
    this.scene.graphics.fillRect(sensorBRPos.x, sensorBRPos.y, 2, 2);
    this.scene.graphics.fillRect(sensorMLPos.x, sensorMLPos.y, 2, 2);
    this.scene.graphics.fillRect(sensorMRPos.x, sensorMRPos.y, 2, 2);
    this.scene.graphics.fillRect(sensorTLPos.x, sensorTLPos.y, 2, 2);
    this.scene.graphics.fillRect(sensorTRPos.x, sensorTRPos.y, 2, 2);

    // tileset
    const ts = this.scene.chunks[0].map.getTileset("Main");

    // ground sensor check
    let tileBLIndex = this.scene.chunks[0].map.worldToTileXY(sensorBLPos.x, sensorBLPos.y);
    let tileBRIndex = this.scene.chunks[0].map.worldToTileXY(sensorBRPos.x, sensorBRPos.y);

    // draw tiles
    this.scene.graphics.lineStyle(1, 0xFFFF00, 1);
    this.scene.graphics.strokeRect(this.scene.chunks[0].layer.x + tileBLIndex.x * 32, this.scene.chunks[0].layer.y + tileBLIndex.y * 32, 32, 32);
    this.scene.graphics.strokeRect(this.scene.chunks[0].layer.x + tileBRIndex.x * 32, this.scene.chunks[0].layer.y + tileBRIndex.y * 32, 32, 32);

    let tileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x, tileBLIndex.y, true, "Layer0");
    let tileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x, tileBRIndex.y, true, "Layer0");

    const heightmaps = [
      [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5],
      [5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18],
      [19, 19, 20, 21, 21, 22, 23, 23, 24, 25, 26, 26, 27, 28, 29, 29, 30, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13],
      [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 29, 30, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 19, 22, 24, 28, 31, 32, 32, 32, 32, 32],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7, 13, 21, 32]
    ];

    let tileBLdy = undefined;
    let tileBRdy = undefined;

    if (tileBL.properties.solid) {
      let hm = heightmaps[tileBL.properties.heightmap];

      let tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
      let tileY = this.scene.chunks[0].layer.y + tileBL.y * 32 + 32;

      let dx = Math.floor(sensorBLPos.x - tileX);
      let idx = tileBL.properties.flipmap ? hm[32 - dx] : hm[dx];

      if (idx == 0) {
        // extension
        let etileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x, tileBLIndex.y + 1, true, "Layer0");

        if (etileBL !== null && etileBL.properties.solid) {
          tileBL = etileBL;
          
          hm = heightmaps[tileBL.properties.heightmap];

          tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBL.y * 32 + 32;

          dx = Math.floor(sensorBLPos.x - tileX);
          idx = tileBL.properties.flipmap ? hm[32 - dx] : hm[dx];
        }
      } else if (idx == 32) {
        // regression
        let rtileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x, tileBLIndex.y - 1, true, "Layer0");

        if (rtileBL !== null && rtileBL.properties.solid) {
          tileBL = rtileBL;
          
          hm = heightmaps[tileBL.properties.heightmap];

          tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBL.y * 32 + 32;

          dx = Math.floor(sensorBLPos.x - tileX);
          idx = tileBL.properties.flipmap ? hm[32 - dx] : hm[dx];
        }
      }
      
      let dy = tileY - sensorBLPos.y - idx;

      console.log(dx, hm[dx], dy);

      if (dy < 0) {
        tileBLdy = dy;
      }
    }
    
    if (tileBR.properties.solid) {
      let hm = heightmaps[tileBR.properties.heightmap];

      let tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
      let tileY = this.scene.chunks[0].layer.y + tileBR.y * 32 + 32;

      let dx = Math.floor(sensorBRPos.x - tileX);
      let idx = tileBR.properties.flipmap ? hm[32 - dx] : hm[dx];

      if (idx == 0) {
        // extension
        let etileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x, tileBRIndex.y + 1, true, "Layer0");

        if (etileBR !== null && etileBR.properties.solid) {
          tileBR = etileBR;
          
          hm = heightmaps[tileBR.properties.heightmap];

          tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBR.y * 32 + 32;

          dx = Math.floor(sensorBRPos.x - tileX);
          idx = tileBR.properties.flipmap ? hm[32 - dx] : hm[dx];
        }
      } else if (idx == 32) {
        // regression
        let rtileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x, tileBRIndex.y - 1, true, "Layer0");

        if (rtileBR !== null && rtileBR.properties.solid) {
          tileBR = rtileBR;
          
          hm = heightmaps[tileBR.properties.heightmap];

          tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBR.y * 32 + 32;

          dx = Math.floor(sensorBRPos.x - tileX);
          idx = tileBR.properties.flipmap ? hm[32 - dx] : hm[dx];
        }
      }
      
      let dy = tileY - sensorBRPos.y - idx;

      // console.log(dx, hm[dx], dy);

      if (dy < 0) {
        tileBRdy = dy;
      }
    }

    if (this.onGround) {
      this.setVelocity(this.groundSpeed * Math.cos(this.groundAngle), this.groundSpeed * -Math.sin(this.groundAngle));
    }

    if ((tileBLdy && !tileBRdy) || (tileBLdy <= tileBRdy)) {
      console.log("BL: ", tileBLdy);
      this.y += tileBLdy;
      this.onGround = true;
      this.groundAngle = tileBL.properties.ground_angle;
      this.body.velocity.y = 0;
    } else if ((tileBRdy && !tileBLdy) || (tileBRdy < tileBLdy)) {
      console.log("BR: ", tileBRdy);
      this.y += tileBRdy;
      this.onGround = true;
      this.groundAngle = tileBR.properties.ground_angle;
      this.body.velocity.y = 0;
    } else {
      this.onGround = false;
    }

    /*let vel = new Phaser.Math.Vector2(0, 0);

    this.lastOnGround = this.onGround;
    this.onGround = (this.body.blocked.down || this.onSlope) && this.body.velocity.y == 0;
    this.onSlope = false;

    // Running animation
    if (this.onGround && !this.lastOnGround && !this.rolling)
      this.run();

    if (this.jumping && this.body.velocity.y > 0)
      this.jumping = false;

    if (this.onGround) {
      if (this.scene.cursors.up.isDown) {
        vel.y = this.jumpHeight;
        this.roll();
        this.jumping = true;
      } else if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.down)) {
        this.rolling = !this.rolling;

        if (this.rolling) this.roll()
        else this.run();
      }
    }

    // NOTE: Ran into wall
    // TODO: Trigger game over
    if (this.body.blocked.right)
      console.log("game over?");*/

    // this.setVelocity(this.moveSpeed, this.body.velocity.y + vel.y);
  }
}
