class MapChunk {
  constructor(scene, chunk, tileset, x, y, tileWidth = 32, tileHeight = 32) {
    this.map = scene.make.tilemap({ key: chunk });
    this.tiles = this.map.addTilesetImage("Main", tileset);

    this.layer = this.map.createLayer("Layer0", this.tiles, x, y);

    this.layer1 = this.map.createLayer("Layer1", this.tiles, x, y);
    this.layer1.setDepth(-1);

    // let td = {tileWidth, tileHeight, scene};

    // const ts = this.map.getTileset("Main");

    // for (let i = ts.firstgid; i <= ts.firstgid + ts.total; i++) {
    //   const props = ts.getTileProperties(i);

    //   if (props && props.slope_m) {
    //     this.layer.setTileIndexCallback(i, this.handleSlope(td, 0, (x) => {
    //       return props.slope_m * x + props.slope_b;
    //     }), scene);
    //   }
    // }
  }
}
