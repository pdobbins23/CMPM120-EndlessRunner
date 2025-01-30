class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
    this.body.setSize(32, 32).setOffset(0, 8);

    scene.add.existing(this);

    scene.physics.world.enableBody(this, 0);

    this.moveSpeed = 350;
    this.jumping = false;
    this.rolling = false;
    this.inLoop = false;
  }

  update() {}
}
