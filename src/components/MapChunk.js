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
        this.layer.setTileIndexCallback(i, this.handleSlope(td, 0, props.slope_dir, props.slope_gravity, (x) => {
          return props.slope_m * x + props.slope_b;
        }), scene);
      }
    }
  }

  handleSlope(tileData, layer, dir, swapGravity, slopeEq) {
    return (sprite, tile) => {
      if (sprite.layer != layer) return true;
      
      switch (swapGravity) {
        case 0: // down
          sprite.gravityDir = 0;
          sprite.body.setGravity(0, 600);
          console.log("GRAVITY: DOWN");
          break;
        case 1: // right
          sprite.gravityDir = 1;
          sprite.body.setGravity(600, 0);
          console.log("GRAVITY: RIGHT");
          break;
        case 2: // up
          sprite.gravityDir = 2;
          sprite.body.setGravity(0, -600);
          console.log("GRAVITY: UP");
          break;
        case 3: // left
          sprite.gravityDir = 3;
          sprite.body.setGravity(-600, 0);
          console.log("GRAVITY: LEFT");
          break;
      }

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
        if (dir == 0 || dir == 2) {
          sprite.setY(tileY - y - sprite.body.height / 2);
        } else if (dir == 1 || dir == 3) {
          sprite.setX(tileY - y - sprite.body.height / 2);
        }
        sprite.body.velocity.y = 0;
        sprite.onSlope = true;
      }

      return true;
    };
  }
}
