class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.layer = 0;

    this.groundSpeed = 200;
    this.jumpHeight = -400;

    this.onGround = false;
    this.lastOnGround = false;
    this.groundAngle = 0;
    
    this.rolling = false;

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
    const heightmaps = [
      [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5],
      [5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18],
      [19, 19, 20, 21, 21, 22, 23, 23, 24, 25, 26, 26, 27, 28, 29, 29, 30, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13],
      [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 29, 30, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 19, 22, 24, 28, 31, 32, 32, 32, 32, 32],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7, 13, 21, 32],
    ];
    const widthmaps = [
      [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
      [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      [32, 21, 13, 7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [32, 32, 32, 32, 32, 31, 28, 24, 22, 19, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 30, 29, 27, 26, 24, 23, 22, 20, 19, 18, 16, 15, 14],
      [13, 12, 11, 9, 8, 7, 6, 5, 4, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 31, 30, 29, 29, 28, 27, 26, 26, 25, 24, 23, 23, 22, 21, 21, 20, 19, 19],
      [18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 5],
      [5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const sensorBLoffset = {x: -0.75, y: 1};
    const sensorBRoffset = {x: 0.75, y: 1};
    
    let sensorBLPos = undefined;
    let sensorBRPos = undefined;
    let sensorBDir = undefined;
    let hwmap = undefined;
    let sensorMode = 0;

    if ((0 <= this.groundAngle && this.groundAngle <= 0.78539816) || (5.49778714 <= this.groundAngle && this.groundAngle <= 6.28318531)) { // floor mode
      sensorBLPos = {x: this.x + sensorBLoffset.x * (this.width / 2), y: this.y + sensorBLoffset.y * (this.height / 2)};
      sensorBRPos = {x: this.x + sensorBRoffset.x * (this.width / 2), y: this.y + sensorBRoffset.y * (this.height / 2)};
      sensorBDir = {x: 0, y: 1};

      hwmap = heightmaps;

      this.setRotation(0);

      sensorMode = 0;
    } else if ((0.78539816 < this.groundAngle && this.groundAngle <  2.35619449)) { // right wall
      sensorBLPos = {x: this.x + sensorBLoffset.y * (this.height / 2), y: this.y - sensorBLoffset.x * (this.width / 2)};
      sensorBRPos = {x: this.x + sensorBRoffset.y * (this.height / 2), y: this.y - sensorBRoffset.x * (this.width / 2)};
      sensorBDir = {x: 1, y: 0};

      hwmap = widthmaps;
      // hwmap = heightmaps;

      this.setRotation(-Math.PI / 2);

      sensorMode = 1;
    } else if ((2.35619449 <= this.groundAngle && this.groundAngle <= 3.926990817)) { // ceiling mode
      sensorBLPos = {x: this.x - sensorBLoffset.x * (this.width / 2), y: this.y - sensorBLoffset.y * (this.height / 2)};
      sensorBRPos = {x: this.x - sensorBRoffset.x * (this.width / 2), y: this.y - sensorBRoffset.y * (this.height / 2)};
      sensorBDir = {x: 0, y: -1};

      hwmap = heightmaps;

      this.setRotation(-Math.PI);

      sensorMode = 2;
    } else if (3.926990817 < this.groundAngle && this.groundAngle < 5.497787144) { // left wall
      sensorBLPos = {x: this.x - sensorBLoffset.y * (this.height / 2), y: this.y + sensorBLoffset.x * (this.width / 2)};
      sensorBRPos = {x: this.x - sensorBRoffset.y * (this.height / 2), y: this.y + sensorBRoffset.x * (this.width / 2)};
      sensorBDir = {x: -1, y: 0};

      hwmap = widthmaps;
      // hwmap = heightmaps;

      this.setRotation(-3 * Math.PI / 2);

      sensorMode = 3;
    }

    this.setRotation(-this.groundAngle);

    this.groundSpeed -= 0.125 * Math.sin(this.groundAngle);
    
    /*let sensorMLPos = {x: this.x + this.sensorML.offsetX * (this.width / 2), y: this.y + this.sensorML.offsetY * (this.height / 2)};
    let sensorMRPos = {x: this.x + this.sensorMR.offsetX * (this.width / 2), y: this.y + this.sensorMR.offsetY * (this.height / 2)};
    let sensorTLPos = {x: this.x + this.sensorTL.offsetX * (this.width / 2), y: this.y + this.sensorTL.offsetY * (this.height / 2)};
    let sensorTRPos = {x: this.x + this.sensorTR.offsetX * (this.width / 2), y: this.y + this.sensorTR.offsetY * (this.height / 2)};*/

    // debug stuff
    this.scene.graphics.fillStyle(0xFFFF00, 1);
    this.scene.graphics.fillRect(this.x, this.y, 2, 2);
    this.scene.graphics.fillRect(sensorBLPos.x, sensorBLPos.y, 3, 3);
    this.scene.graphics.fillRect(sensorBRPos.x, sensorBRPos.y, 3, 3);
    // this.scene.graphics.fillRect(sensorMLPos.x, sensorMLPos.y, 2, 2);
    // this.scene.graphics.fillRect(sensorMRPos.x, sensorMRPos.y, 2, 2);
    // this.scene.graphics.fillRect(sensorTLPos.x, sensorTLPos.y, 2, 2);
    // this.scene.graphics.fillRect(sensorTRPos.x, sensorTRPos.y, 2, 2);

    // ground sensor check
    let tileBLIndex = this.scene.chunks[0].map.worldToTileXY(sensorBLPos.x, sensorBLPos.y);
    let tileBRIndex = this.scene.chunks[0].map.worldToTileXY(sensorBRPos.x, sensorBRPos.y);

    // draw tiles
    this.scene.graphics.lineStyle(1, 0xFFFF00, 1);
    this.scene.graphics.strokeRect(this.scene.chunks[0].layer.x + tileBLIndex.x * 32, this.scene.chunks[0].layer.y + tileBLIndex.y * 32, 32, 32);
    this.scene.graphics.strokeRect(this.scene.chunks[0].layer.x + tileBRIndex.x * 32, this.scene.chunks[0].layer.y + tileBRIndex.y * 32, 32, 32);

    let lyr = `Layer${this.layer}`;

    let tileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x, tileBLIndex.y, true, lyr);
    let tileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x, tileBRIndex.y, true, lyr);

    let tileBLdiff = undefined;
    let tileBRdiff = undefined;

    if (tileBL.properties.solid) {
      let hm = hwmap[tileBL.properties.hwmap];

      let tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
      let tileY = this.scene.chunks[0].layer.y + tileBL.y * 32;

      let offset = undefined;
      switch (sensorMode) {
        case 0: // floor
          tileY += 32;
          offset = sensorBLPos.x - tileX;
          break;
        case 1: // right wall
          tileX += 32;
          tileY += 32;
          offset = tileY - sensorBLPos.y;
          break;
        case 2: // ceiling
          tileX += 32;
          offset = tileX - sensorBLPos.x;
          break;
        case 3: // left wall
          offset = sensorBLPos.y - tileY;
          break;
      }
      offset = Math.floor(offset);
      let idx = tileBL.properties.flipmap ? hm[31 - offset] : hm[offset];

      if (idx == 0) {
        // extension
        let etileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x + sensorBDir.x, tileBLIndex.y + sensorBDir.y, true, lyr);

        if (etileBL !== null && etileBL.properties.solid) {
          tileBL = etileBL;
          
          hm = hwmap[tileBL.properties.hwmap];

          tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBL.y * 32;

          switch (sensorMode) {
            case 0: // floor
              tileY += 32;
              offset = sensorBLPos.x - tileX;
              break;
            case 1: // right wall
              tileX += 32;
              tileY += 32;
              offset = tileY - sensorBLPos.y;
              break;
            case 2: // ceiling
              tileX += 32;
              offset = tileX - sensorBLPos.x;
              break;
            case 3: // left wall
              offset = sensorBLPos.y - tileY;
              break;
          }
          offset = Math.floor(offset);
          idx = tileBL.properties.flipmap ? hm[31 - offset] : hm[offset];
        }
      } else if (idx == 32) {
        // regression
        let rtileBL = this.scene.chunks[0].map.getTileAt(tileBLIndex.x - sensorBDir.x, tileBLIndex.y - sensorBDir.y, true, lyr);

        if (rtileBL !== null && rtileBL.properties.solid) {
          tileBL = rtileBL;
          
          hm = hwmap[tileBL.properties.hwmap];

          tileX = this.scene.chunks[0].layer.x + tileBL.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBL.y * 32;

          switch (sensorMode) {
            case 0: // floor
              tileY += 32;
              offset = sensorBLPos.x - tileX;
              break;
            case 1: // right wall
              tileX += 32;
              tileY += 32;
              offset = tileY - sensorBLPos.y;
              break;
            case 2: // ceiling
              tileX += 32;
              offset = tileX - sensorBLPos.x;
              break;
            case 3: // left wall
              offset = sensorBLPos.y - tileY;
              break;
          }
          offset = Math.floor(offset);
          idx = tileBL.properties.flipmap ? hm[31 - offset] : hm[offset];
        }
      }

      let diff = undefined;
      switch (sensorMode) {
        case 0:
          diff = tileY - sensorBLPos.y - idx;
          break;
        case 1:
          diff = tileX - sensorBLPos.x - idx;
          break;
        case 2:
          diff = sensorBLPos.y - tileY - idx;
          break;
        case 3:
          diff = sensorBLPos.x - tileX - idx;
          break;
      }

      if (diff < 28) {
        tileBLdiff = diff;

        // console.log(`BL What: ${offset}`);
        // if (sensorMode == 2) console.log(`Hello BL?: ${diff}, tileX: ${tileX}, sensorBLPos.x: ${sensorBLPos.x}, idx: ${idx}, offset: ${offset}, hwmap: ${hm}`);
      } else {
      }
    }
    
    if (tileBR.properties.solid) {
      let hm = hwmap[tileBR.properties.hwmap];

      let tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
      let tileY = this.scene.chunks[0].layer.y + tileBR.y * 32;

      let offset = undefined;
      switch (sensorMode) {
        case 0: // floor
          tileY += 32;
          offset = sensorBRPos.x - tileX;
          break;
        case 1: // right wall
          tileX += 32;
          tileY += 32;
          offset = tileY - sensorBRPos.y;
          break;
        case 2: // ceiling
          tileX += 32;
          offset = tileX - sensorBRPos.x;
          break;
        case 3: // left wall
          offset = sensorBRPos.y - tileY;
          break;
      }
      offset = Math.floor(offset);
      let idx = tileBR.properties.flipmap ? hm[31 - offset] : hm[offset];

      if (idx == 0) {
        // extension
        let etileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x + sensorBDir.x, tileBRIndex.y + sensorBDir.y, true, lyr);

        if (etileBR !== null && etileBR.properties.solid) {
          tileBR = etileBR;
          
          hm = hwmap[tileBR.properties.hwmap];

          tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBR.y * 32;

          switch (sensorMode) {
            case 0: // floor
              tileY += 32;
              offset = sensorBRPos.x - tileX;
              break;
            case 1: // right wall
              tileX += 32;
              tileY += 32;
              offset = tileY - sensorBRPos.y;
              break;
            case 2: // ceiling
              tileX += 32;
              offset = tileX - sensorBRPos.x;
              break;
            case 3: // left wall
              offset = sensorBRPos.y - tileY;
              break;
          }
          offset = Math.floor(offset);
          idx = tileBR.properties.flipmap ? hm[31 - offset] : hm[offset];
        }
      } else if (idx == 32) {
        // regression
        let rtileBR = this.scene.chunks[0].map.getTileAt(tileBRIndex.x - sensorBDir.x, tileBRIndex.y - sensorBDir.y, true, lyr);

        if (rtileBR !== null && rtileBR.properties.solid) {
          tileBR = rtileBR;
          
          hm = hwmap[tileBR.properties.hwmap];

          tileX = this.scene.chunks[0].layer.x + tileBR.x * 32;
          tileY = this.scene.chunks[0].layer.y + tileBR.y * 32;

          switch (sensorMode) {
            case 0: // floor
              tileY += 32;
              offset = sensorBRPos.x - tileX;
              break;
            case 1: // right wall
              tileX += 32;
              tileY += 32;
              offset = tileY - sensorBRPos.y;
              break;
            case 2: // ceiling
              tileX += 32;
              offset = tileX - sensorBRPos.x;
              break;
            case 3: // left wall
              offset = sensorBRPos.y - tileY;
              break;
          }
          offset = Math.floor(offset);
          idx = tileBR.properties.flipmap ? hm[31 - offset] : hm[offset];
        }
      }
      
      let diff = undefined;
      switch (sensorMode) {
        case 0:
          diff = tileY - sensorBRPos.y - idx;
          break;
        case 1:
          diff = tileX - sensorBRPos.x - idx;
          break;
        case 2:
          diff = sensorBRPos.y - tileY - idx;
          break;
        case 3:
          diff = sensorBRPos.x - tileX - idx;
          break;
      }

      if (diff < 28) {
        tileBRdiff = diff;

      }
      else {
        // if (sensorMode == 1) console.log(`Hello BR?: ${diff}, tileX: ${tileX}, tileY: ${tileY}, sensorBRPos.x: ${sensorBRPos.x}, sensorBRPos.y: ${sensorBRPos.y}, idx: ${idx}, offset: ${offset}, hwmap: ${hm}`);
      }
    }

    if (this.onGround) {
      this.setVelocity(this.groundSpeed * Math.cos(this.groundAngle), this.groundSpeed * -Math.sin(this.groundAngle));
    }

    if ((tileBLdiff != undefined && tileBRdiff == undefined) || (tileBLdiff <= tileBRdiff)) {
      switch (sensorMode) {
        case 0:
          this.y += tileBLdiff;
          this.body.velocity.y = 0;
          break;
        case 1:
          this.x += tileBLdiff;
          this.body.velocity.x = 0;
          break;
        case 2:
          this.y -= tileBLdiff;
          this.body.velocity.y = 0;
          break;
        case 3:
          this.x -= tileBLdiff;
          this.body.velocity.x = 0;
          break;
      }
      if (sensorMode % 2 == 0) {
        // console.log(`BL: ${tileBLdiff}, BR: ${tileBRdiff}`);
        // this.y += tileBLdiff;
        // this.body.velocity.y = 0;
      } else {
        // console.log(`MODE: ${sensorMode}, BL: ${tileBLdiff}, BR: ${tileBRdiff}`);
        // this.x += tileBLdiff;
        // this.body.velocity.x = 0;
      }
      this.onGround = true;
      this.groundAngle = tileBL.properties.ground_angle;
      this.scene.graphics.fillStyle(0xFF00FF, 1);
      this.scene.graphics.fillRect(sensorBLPos.x, sensorBLPos.y, 3, 3);
    } else if ((tileBRdiff != undefined && tileBLdiff == undefined) || (tileBRdiff < tileBLdiff)) {
      switch (sensorMode) {
        case 0:
          this.y += tileBRdiff;
          this.body.velocity.y = 0;
          break;
        case 1:
          this.x += tileBRdiff;
          this.body.velocity.x = 0;
          break;
        case 2:
          this.y -= tileBRdiff;
          this.body.velocity.y = 0;
          break;
        case 3:
          this.x -= tileBRdiff;
          this.body.velocity.x = 0;
          break;
      }
      if (sensorMode % 2 == 0) {
        // console.log(`BR: ${tileBRdiff}, BL: ${tileBLdiff}`);
        // this.y += tileBRdiff;
        // this.body.velocity.y = 0;
      } else {
        // console.log(`MODE: ${sensorMode}, BR: ${tileBRdiff}, BL: ${tileBLdiff}`);
        // this.x += tileBRdiff;
        // this.body.velocity.x = 0;
      }
      this.onGround = true;
      this.groundAngle = tileBR.properties.ground_angle;
      this.scene.graphics.fillStyle(0xFF00FF, 1);
      this.scene.graphics.fillRect(sensorBRPos.x, sensorBRPos.y, 3, 3);
    } else {
      this.onGround = false;
      this.groundAngle = 0;
      this.setRotation(0);
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
