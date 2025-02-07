class MapChunk {
  constructor(scene, chunk, tileset, x, y, tileWidth = 32, tileHeight = 32) {
    this.map = scene.make.tilemap({ key: chunk });
    this.tiles = this.map.addTilesetImage("Main", tileset);

    this.layer = this.map.createLayer("Layer0", this.tiles, x, y);
    this.layer.setCollisionByProperty({ solid: true });

    this.layer1 = this.map.createLayer("Layer1", this.tiles, x, y);
    this.layer1.setCollisionByProperty({ solid: true });
    this.layer1.setDepth(-1);

    let td = {tileWidth, tileHeight, scene};

    const ts = this.map.getTileset("Main");

    for (let i = ts.firstgid; i <= ts.firstgid + ts.total; i++) {
      const props = ts.getTileProperties(i);

      if (props && props.slope_m) {
        this.layer.setTileIndexCallback(i, this.handleSlope(td, 0, (x) => {
          return props.slope_m * x + props.slope_b;
        }), scene);
      }
    }
  }

  handleSlope(tileData, layer, slopeEq) {
    return (sprite, tile) => {
      if (sprite.layer != layer) return true;

      let {tileWidth, tileHeight, scene} = tileData;
 
      let rawTileX = this.layer.x + tile.x * tileWidth;
      let rawTileY = this.layer.y + tile.y * tileHeight;
      let tileX = rawTileX;
      let tileY = rawTileY + tileHeight;

      let spriteX = sprite.body.x + sprite.body.width / 2;
      let spriteY = sprite.body.y + sprite.body.height;
    
      let dx = spriteX - tileX;
      let dy = tileY - spriteY;
    
      let y = slopeEq(dx);

      scene.graphics.fillStyle(0xff0000, 1);
      scene.graphics.fillRect(rawTileX, rawTileY, 3, 3);

      scene.graphics.fillStyle(0xffff00, 1);
      for (let x = 0; x < tileWidth; x++) {
        let y = slopeEq(x);

        if (y >= 0 && y <= tileHeight)
          scene.graphics.fillRect(tileX + x, tileY - y, 2, 2);
      }

      if (dy <= y && sprite.body.velocity.y >= 0) {
        // console.log(`SLOPE: ${spriteY} -> ${tileY} (${y}) DIST: ${dx}, ${dy}`);
        sprite.setY(tileY - y - sprite.body.height / 2);
        sprite.body.velocity.y = 0;
        sprite.onSlope = true;
      }

      return true;
    };
  }
}
