class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.moveSpeed = 50;
    this.jumpHeight = -400;

    this.onGround = false;
    this.onSlope = false;
    this.gravityDir = 0;
    this.lastOnGround = false;
    this.jumping = false;
    this.rolling = false;
    this.inLoop = false;

    this.layer = 0;

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
    let vel = new Phaser.Math.Vector2(0, 0);

    let vertical = this.gravityDir == 0 || this.gravityDir == 2;
    let horizontal = this.gravityDir == 1 || this.gravityDir == 3;

    this.lastOnGround = this.onGround;
    this.onGround = (this.body.blocked.down || this.onSlope) && ((vertical && this.body.velocity.y == 0) || (horizontal && this.body.velocity.x == 0));
    this.onSlope = false;

    // Running animation
    if (this.onGround && !this.lastOnGround && !this.rolling)
      this.run();

    if (this.jumping && this.gravityDir == 0 && this.body.velocity.y > 0)
      this.jumping = false;

    if (this.onGround) {
      if (this.scene.cursors.up.isDown) {
        vel.y = this.jumpHeight;
        this.roll();
        this.jumping = true;

        // reset gravity
        this.gravityDir = 0;
        this.body.setGravity(0, 600);
      } else if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.down)) {
        this.rolling = !this.rolling;

        if (this.rolling) this.roll()
        else this.run();
      }
    }

    // NOTE: Ran into wall
    // TODO: Trigger game over
    if (this.body.blocked.right)
      console.log("game over?");

    switch (this.gravityDir) {
      case 0: // DOWN
        this.setVelocity(this.moveSpeed, this.body.velocity.y + vel.y);
        break;
      case 1: // RIGHT
        this.setVelocity(this.body.velocity.x + vel.y, -this.moveSpeed);
        break;
      case 2: // UP
        this.setVelocity(-this.moveSpeed, this.body.velocity.y - vel.y);
        break;
      case 3: // LEFT
        this.setVelocity(this.body.velocity.y - vel.y, this.moveSpeed);
        break;
    }
  }
}
