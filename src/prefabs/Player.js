class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.moveSpeed = 100;
    this.jumpHeight = -400;

    this.onGround = false;
    this.onSlope = false;
    this.lastOnGround = false;
    this.jumping = false;
    this.rolling = false;
    this.inLoop = false;

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
      console.log("game over?");

    this.setVelocity(this.moveSpeed, this.body.velocity.y + vel.y);
  }
}
