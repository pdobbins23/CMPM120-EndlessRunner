class MapChunk {
  constructor(scene, data, tileset, x, y, tileWidth = 32, tileHeight = 32) {
    this.map = scene.make.tilemap({ data, tileWidth, tileHeight });
    this.tiles = this.map.addTilesetImage(tileset);
    this.layer = this.map.createLayer(0, this.tiles, x, y);
    this.solids = this.map.filterTiles(tile => tile.index > 0);
    this.slopes = this.map.filterTiles(tile => tile.index == 3);

    this.map.setCollisionBetween(1, 4, true);

    // TODO: Determine how to store loop information
    // Probably dont need additional info? Just tile data and gravity-switching logic
  }
}
