class Ring extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ring");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.75, 0.75);
    this.body.setSize(24, 24);
    this.body.allowGravity = false;

    scene.physics.add.collider(
      scene.player,
      this,
      null,
      (player, ring) => {
        scene.ringCount += 1;
        this.destroy();

        return true;
      }
    );
  }
}
