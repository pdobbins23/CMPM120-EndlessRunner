class MapChunk {
  constructor(scene, chunk, tileset, x, y, tileWidth = 32, tileHeight = 32) {
    this.map = scene.make.tilemap({ key: chunk });
    this.tiles = this.map.addTilesetImage("Main", tileset);

    this.layer = this.map.createLayer("Layer0", this.tiles, x, y);
    this.layer.setDepth(3);

    this.layer1 = this.map.createLayer("Layer1", this.tiles, x, y);
    this.layer1.setDepth(1);

    this.objects = this.map.getObjectLayer("Objects");
    this.layerSwitches = [];

    this.rings = [];

    if (this.objects) {
      this.objects.objects.forEach((object) => {
        if (object.properties.length == 1) {
          if (object.properties[0].value) {
            this.rings.push(new Ring(scene, x + object.x, y + object.y));
          }
        } else if (object.properties.length == 3) {
          if (object.properties[2]) {
            this.layerSwitches.push(new LayerSwitcher(scene, x + object.x, y + object.y, object.properties[0].value, object.properties[1].value, object.properties[2].value));
          }
        }
      });
    }
  }
}
