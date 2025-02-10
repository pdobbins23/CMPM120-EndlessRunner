class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // TODO: Probably should have a loading splash screen (MEGA)
    // that loads everything
  }

  create() {
    this.scene.start("gameScene");
  }

  update() {}
}
