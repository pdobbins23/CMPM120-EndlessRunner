class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(32, 32).setOffset(0, 8);

    this.moveSpeed = 350;
    this.jumpHeight = -400;

    this.onGround = false;
    this.lastOnGround = false;
    this.jumping = false;
    this.rolling = false;
    this.inLoop = false;

    // Setup animations
    this.anims.create({
      key: "run",
      frameRate: 0,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0,
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

    this.play("run");
  }

  update() {
    let vel = new Phaser.Math.Vector2(0, 0);

    this.lastOnGround = this.onGround;
    this.onGround = this.body.blocked.down && this.body.velocity.y == 0;

    // Running animation
    if (this.onGround && !this.lastOnGround && !this.rolling)
      this.play("run", true);

    if (this.onGround) {
      if (this.scene.cursors.up.isDown) {
        vel.y = this.jumpHeight;
        this.play("roll", true);
      } else if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.down)) {
        this.rolling = !this.rolling;
        this.play(this.rolling ? "roll" : "run", true);
      }
    }

    // NOTE: Ran into wall
    // TODO: Trigger game over
    if (this.body.blocked.right)
      console.log("game over?");

    this.setVelocity(this.moveSpeed, this.body.velocity.y + vel.y);
  }
}
