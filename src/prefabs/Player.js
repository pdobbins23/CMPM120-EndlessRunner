class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
    this.body.setSize(32, 32).setOffset(0, 8);

    scene.add.existing(this);

    scene.physics.world.enableBody(this, 0);

    this.moveSpeed = 350;
    this.jumpHeight = -400;

    this.onGround = false;
    this.jumping = false;
    this.rolling = false;
    this.inLoop = false;
  }

  update() {
    let vel = new Phaser.Math.Vector2(0, 0);

    this.onGround = this.body.blocked.down && this.body.velocity.y == 0;

    if (this.onGround && this.scene.cursors.up.isDown)
      vel.y = this.jumpHeight;

    // TODO: Implement this properly
    if (this.scene.cursors.down.isDown)
      this.rolling = true;

    this.setVelocity(this.moveSpeed, this.body.velocity.y + vel.y);
  }
}
