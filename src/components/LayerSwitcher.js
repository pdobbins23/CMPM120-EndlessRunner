class LayerSwitcher extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, targetLayer, radius, switchType) {
    super(scene, x, y, "invis");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    switch (switchType) {
      case 0: // vertical (left collision)
        this.body.setSize(1, radius * 2);
        break;
      case 1: // vertical (right collision)
        this.body.setSize(1, radius * 2);
        break;
      case 2: // horizontal (above collision)
        this.body.setSize(radius * 2, 1);
        break;
      case 3: // horizontal (below collision)
        this.body.setSize(radius * 2, 1);
        break;
    }

    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.setVisible(false);

    this.targetLayer = targetLayer;
    this.switchType = switchType;

    scene.physics.add.collider(
      scene.player,
      this,
      null,
      (player, layerSwitcher) => {
        switch (layerSwitcher.switchType) {
          case 0:
            if (player.x < layerSwitcher.x && player.body.velocity.x > 0) {
              player.layer = layerSwitcher.targetLayer;
              console.log(`New Layer: ${layerSwitcher.targetLayer}`);
            }
            break;
          case 1:
            if (player.x > layerSwitcher.x && player.body.velocity.x < 0) {
              player.layer = layerSwitcher.targetLayer;
              console.log(`New Layer: ${layerSwitcher.targetLayer}`);
            }
            break;
          case 2:
            if (player.y < layerSwitcher.y && player.body.velocity.y > 0) {
              player.layer = layerSwitcher.targetLayer;
              console.log(`New Layer: ${layerSwitcher.targetLayer}`);
            }
            break;
          case 3:
            if (player.y > layerSwitcher.y && player.body.player.y < 0) {
              player.layer = layerSwitcher.targetLayer;
              console.log(`New Layer: ${layerSwitcher.targetLayer}`);
            }
            break;
        }

        return false;
      }
    );
  }
}
