const BASE_GROUND_SPEED = 500;

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.layer = 0;

    this.groundSpeed = BASE_GROUND_SPEED;
    this.jumpHeight = 400;

    this.onGround = false;
    this.lastOnGround = false;
    this.groundAngle = 0;
    
    this.rolling = false;

    this.groundSensorL = new Sensor(scene, {x: -0.6, y: 1, width: this.width, height: this.height}, {x: 0, y: 1}, true);
    this.groundSensorR = new Sensor(scene, {x: 0.6, y: 1, width: this.width, height: this.height}, {x: 0, y: 1}, true);

    this.ceilingSensorL = new Sensor(scene, {x: -0.6, y: -0.5, width: this.width, height: this.height}, {x: 0, y: -1}, true);
    this.ceilingSensorR = new Sensor(scene, {x: 0.6, y: -0.5, width: this.width, height: this.height}, {x: 0, y: -1}, true);

    this.pushSensorL = new Sensor(scene, {x: -0.75, y: 0, width: this.width, height: this.height}, {x: -1, y: 0}, true);
    this.pushSensorR = new Sensor(scene, {x: 0.75, y: 0, width: this.width, height: this.height}, {x: 1, y: 0}, true);

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
    this.setRotation(-this.groundAngle);

    this.groundSpeed -= 0.125 * Math.sin(this.groundAngle) * 10;

    // Running animation
    if (this.onGround && !this.lastOnGround && !this.rolling)
      this.run();

    this.lastOnGround = this.onGround;

    let layer = undefined;
    let layerName = `Layer${this.layer}`;

    let chunkX = Math.floor(this.x / 1280) - this.scene.worldChunkOffset;

    switch (this.layer) {
      case 0: // front
        this.setDepth(4);
        layer = this.scene.chunks[chunkX].layer;
        break;
      case 1: // back
        this.setDepth(2);
        layer = this.scene.chunks[chunkX].layer1;
        break;
    }

    if (this.onGround) {
      let jumpVelocity = {x: 0, y: 0};

      if (this.scene.cursors.up.isDown) {
        if (this.groundAngle == 0) {
          this.roll();
          this.onGround = false;

          jumpVelocity = {x: this.jumpHeight * Math.sin(this.groundAngle), y: this.jumpHeight * Math.cos(this.groundAngle)};
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.down)) {
        this.rolling = !this.rolling;

        if (this.rolling) this.roll()
        else this.run();
      } else if (this.groundAngle == 0 && this.groundSpeed < BASE_GROUND_SPEED) {
        this.groundSpeed = BASE_GROUND_SPEED;
      }

      this.setVelocity(this.groundSpeed * Math.cos(this.groundAngle) - jumpVelocity.x, this.groundSpeed * -Math.sin(this.groundAngle) - jumpVelocity.y);
    }

    if (this.lastOnGround && !this.onGround) return;

    let groundSensorLres = this.groundSensorL.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle);
    let groundSensorRres = this.groundSensorR.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle);

    if (groundSensorLres.diff != null && (groundSensorRres.diff == null || (groundSensorLres.diff <= groundSensorRres.diff))) {
      switch (this.groundSensorL.sensorMode) {
        case 0:
          this.y += groundSensorLres.diff;
          this.body.velocity.y = 0;
          break;
        case 1:
          this.x += groundSensorLres.diff;
          this.body.velocity.x = 0;
          break;
        case 2:
          this.y -= groundSensorLres.diff;
          this.body.velocity.y = 0;
          break;
        case 3:
          this.x -= groundSensorLres.diff;
          this.body.velocity.x = 0;
          break;
      }

      this.onGround = true;
      this.groundAngle = groundSensorLres.groundAngle;

      this.groundSensorL.drawDebug(0xFF00FF);
    } else if (groundSensorRres.diff != null && (groundSensorLres.diff == null || (groundSensorRres.diff < groundSensorLres.diff))) {
      switch (this.groundSensorR.sensorMode) {
        case 0:
          this.y += groundSensorRres.diff;
          this.body.velocity.y = 0;
          break;
        case 1:
          this.x += groundSensorRres.diff;
          this.body.velocity.x = 0;
          break;
        case 2:
          this.y -= groundSensorRres.diff;
          this.body.velocity.y = 0;
          break;
        case 3:
          this.x -= groundSensorRres.diff;
          this.body.velocity.x = 0;
          break;
      }

      this.onGround = true;
      this.groundAngle = groundSensorRres.groundAngle;

      this.groundSensorR.drawDebug(0xFF00FF);
    } else {
      this.onGround = false;
      // this.groundAngle = 0;

      this.setRotation(0);

      let ceilingSensorLres = this.ceilingSensorL.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle, 0);
      let ceilingSensorRres = this.ceilingSensorR.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle, 0);
      
      if (ceilingSensorLres.diff != null && (ceilingSensorRres.diff == null || (ceilingSensorLres.diff <= ceilingSensorRres.diff))) {
        switch (this.ceilingSensorL.sensorMode) {
          case 0:
            this.y -= ceilingSensorLres.diff;
            this.body.velocity.y = 0;
            break;
          case 1:
            this.x -= ceilingSensorLres.diff;
            this.body.velocity.x = 0;
            break;
          case 2:
            this.y += ceilingSensorLres.diff;
            this.body.velocity.y = 0;
            break;
          case 3:
            this.x += ceilingSensorLres.diff;
            this.body.velocity.x = 0;
            break;
        }

        this.ceilingSensorL.drawDebug(0xFF00FF);
      } else if (ceilingSensorRres.diff != null && (ceilingSensorLres.diff == null || (ceilingSensorRres.diff < ceilingSensorLres.diff))) {
        switch (this.ceilingSensorR.sensorMode) {
          case 0:
            this.y -= ceilingSensorRres.diff;
            this.body.velocity.y = 0;
            break;
          case 1:
            this.x -= ceilingSensorRres.diff;
            this.body.velocity.x = 0;
            break;
          case 2:
            this.y += ceilingSensorRres.diff;
            this.body.velocity.y = 0;
            break;
          case 3:
            this.x += ceilingSensorRres.diff;
            this.body.velocity.x = 0;
            break;
        }

        this.ceilingSensorR.drawDebug(0xFF00FF);
      }
    }

    return;

    let pushSensorLres = this.pushSensorL.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle, 0, true);
    let pushSensorRres = this.pushSensorR.process(this.x, this.y, this.scene.chunks[chunkX].map, layer, layerName, this.groundAngle, 0, true);
    
    if (pushSensorLres.diff != null && (pushSensorRres.diff == null || (pushSensorLres.diff <= pushSensorRres.diff))) {
      switch (this.pushSensorL.sensorMode) {
        case 0:
          this.x -= pushSensorLres.diff;
          this.body.velocity.x = 0;
          break;
        case 1:
          this.y += pushSensorLres.diff;
          this.body.velocity.y = 0;
          break;
        case 2:
          this.x += pushSensorLres.diff;
          this.body.velocity.x = 0;
          break;
        case 3:
          this.y -= pushSensorLres.diff;
          this.body.velocity.y = 0;
          break;
      }

      console.log(`PL: ${pushSensorLres.diff}`);

      this.pushSensorL.drawDebug(0xFF00FF);
    } else if (pushSensorRres.diff != null && (pushSensorLres.diff == null || (pushSensorRres.diff < pushSensorLres.diff))) {
      switch (this.pushSensorR.sensorMode) {
        case 0:
          this.x += pushSensorRres.diff;
          this.body.velocity.x = 0;
          break;
        case 1:
          this.y += pushSensorRres.diff;
          this.body.velocity.y = 0;
          break;
        case 2:
          this.x -= pushSensorRres.diff;
          this.body.velocity.x = 0;
          break;
        case 3:
          this.y -= pushSensorRres.diff;
          this.body.velocity.y = 0;
          break;
      }

      console.log(`PR: ${pushSensorRres.diff}`);

      this.pushSensorR.drawDebug(0xFF00FF);
    }
  }
}
