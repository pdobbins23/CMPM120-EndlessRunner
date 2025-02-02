class MapChunk {
  constructor(scene, data, tileset, x, y, tileWidth = 32, tileHeight = 32) {
    this.map = scene.make.tilemap({ data, tileWidth, tileHeight });
    this.tiles = this.map.addTilesetImage(tileset);
    this.layer = this.map.createLayer(0, this.tiles, x, y);
    this.solids = this.map.filterTiles(tile => tile.index > 0);
    this.slopes = this.map.filterTiles(tile => tile.index == 3);

    this.map.setCollisionBetween(1, 4, true);

    // TODO: Remove hard-coded slope calculation
    this.layer.setTileIndexCallback(3, (sprite, tile) => {
      if (sprite.body.blocked.left) return false;
      
      // sprite.rotation = -Math.PI / 8;
      let rawTileX = this.layer.x + tile.x * tileWidth;
      let rawTileY = this.layer.y + tile.y * tileHeight;
      let tileX = rawTileX;
      let tileY = rawTileY + tileHeight;

      let spriteX = sprite.body.x + sprite.body.width / 2;
      let spriteY = sprite.body.y + sprite.body.height;

      // scene.graphics.fillStyle(0xff0000, 1);
      // scene.graphics.fillRect(spriteX, spriteY, 5, 5);

      // scene.graphics.fillStyle(0x00ffff, 1);
      // scene.graphics.fillRect(tileX, tileY, 5, 5);
      // scene.graphics.lineStyle(2, 0x005500, 1);
      // scene.graphics.strokeRect(rawTileX, rawTileY, tileWidth, tileHeight);
      
      let dx = spriteX - tileX;
      let dy = tileY - spriteY;
      
      let y = 1 * dx + tileHeight / 2; // for slope 1/1

      // scene.graphics.fillStyle(0x005500, 1);
      // for (let i = 0; i < 32; i++) {
        // scene.graphics.fillRect(tileX + i, tileY - 1 * i, 2, 2);
      // }

      // TODO: Figure out why there are weird glitches and downwards
      // teleportation still happening
      if (dy <= y && sprite.body.velocity.y >= 0) {
        console.log(`SLOPE: ${spriteY} -> ${tileY} (${y}) DIST: ${dx}, ${dy}`);
        sprite.setY(tileY - y);
        sprite.body.velocity.y = 0;
        sprite.onSlope = true;
      }

      return true;
    }, scene);

    // TODO: Determine how to store loop information
    // Probably dont need additional info? Just tile data and gravity-switching logic
  }
}
