const HEIGHTMAPS = [
  [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5],
  [5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18],
  [19, 19, 20, 21, 21, 22, 23, 23, 24, 25, 26, 26, 27, 28, 29, 29, 30, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13],
  [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 29, 30, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 19, 22, 24, 28, 31, 32, 32, 32, 32, 32],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7, 13, 21, 32],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
];
const WIDTHMAPS = [
  [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
  [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  [32, 21, 13, 7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [32, 32, 32, 32, 32, 31, 28, 24, 22, 19, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 30, 29, 27, 26, 24, 23, 22, 20, 19, 18, 16, 15, 14],
  [13, 12, 11, 9, 8, 7, 6, 5, 4, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 31, 30, 29, 29, 28, 27, 26, 26, 25, 24, 23, 23, 22, 21, 21, 20, 19, 19],
  [18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 5],
  [5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

class Sensor {
  constructor(scene, offset, direction, debug = false) {
    this.scene = scene;

    this.x = 0;
    this.y = 0;
    this.offset = offset;
    this.direction = direction;
    this.sensorMode = 0;

    this.debug = debug;
  }

  calcOffset(tileX, tileY, flipMaps) {
    let offset = undefined;

    switch (this.sensorMode) {
      case 0: // floor
        if (flipMaps) {
          tileX += 32;
          tileY += 32;
          offset = tileY - this.y;
        } else {
          tileY += 32;
          offset = this.x - tileX;
        }
        break;
      case 1: // right wall
        if (flipMaps) {
          tileX += 32;
          offset = tileX - this.x;
        } else {
          tileX += 32;
          tileY += 32;
          offset = tileY - this.y;
        }
        break;
      case 2: // ceiling
        if (flipMaps) {
          offset = this.y - tileY;
        } else {
          tileX += 32;
          offset = tileX - this.x;
        }
        break;
      case 3: // left wall
        if (flipMaps) {
          tileY += 32;
          offset = this.x - tileX;
        } else {
          offset = this.y - tileY;
        }
        break;
    }

    return {tileX, tileY, offset: Math.floor(offset)};
  }

  process(x, y, map, layer, layerName, groundAngle, tolerance = 28, flipMaps = false) {
    let sensorDir = undefined;
    let hwmap = undefined;
    
    if ((0 <= groundAngle && groundAngle <= 0.78539816) || (5.49778714 <= groundAngle && groundAngle <= 6.28318531)) { // floor mode
      this.x = x + this.offset.x * (this.offset.width / 2);
      this.y = y + this.offset.y * (this.offset.height / 2);

      sensorDir = {x: this.direction.x, y: this.direction.y};

      hwmap = flipMaps ? WIDTHMAPS : HEIGHTMAPS;

      this.sensorMode = 0;
    } else if ((0.78539816 < groundAngle && groundAngle <  2.35619449)) { // right wall
      this.x = x + this.offset.y * (this.offset.height / 2);
      this.y = y - this.offset.x * (this.offset.width / 2);

      sensorDir = {x: this.direction.y, y: this.direction.x};

      hwmap = flipMaps ? HEIGHTMAPS : WIDTHMAPS;

      this.sensorMode = 1;
    } else if ((2.35619449 <= groundAngle && groundAngle <= 3.926990817)) { // ceiling mode
      this.x = x - this.offset.x * (this.offset.width / 2);
      this.y = y - this.offset.y * (this.offset.height / 2);

      sensorDir = {x: this.direction.x, y: -this.direction.y};

      hwmap = flipMaps ? WIDTHMAPS : HEIGHTMAPS;

      this.sensorMode = 2;
    } else if (3.926990817 < groundAngle && groundAngle < 5.497787144) { // left wall
      this.x = x - this.offset.y * (this.offset.height / 2);
      this.y = y + this.offset.x * (this.offset.width / 2);

      sensorDir = {x: -this.direction.y, y: this.direction.x};

      hwmap = flipMaps ? HEIGHTMAPS : WIDTHMAPS;

      this.sensorMode = 3;
    }

    // debug sensors
    this.drawDebug(0xFFFF00);

    let tileIndex = map.worldToTileXY(this.x, this.y);
    let tile = map.getTileAt(tileIndex.x, tileIndex.y, true, layerName);

    if (!tile || !tile.properties.solid) {
      return {diff: null, groundAngle: null};
    }

    let tileX = layer.x + tile.x * 32;
    let tileY = layer.y + tile.y * 32;

    // debug tiles
    if (this.debug) {
      this.scene.graphics.lineStyle(1, flipMaps ? 0xFF0000 : 0xFFFF00, 1);
      this.scene.graphics.strokeRect(tileX, tileY, 32, 32);
    }

    let hm = hwmap[tile.properties.hwmap];

    let offsetRes = this.calcOffset(tileX, tileY, flipMaps);

    tileX = offsetRes.tileX;
    tileY = offsetRes.tileY;
    let offset = offsetRes.offset;
    let diffExt = 0;

    let idx = tile.properties.flipmap ? hm[31 - offset] : hm[offset];

    if (idx == 0) {
      // extension
      let tileExt = map.getTileAt(tileIndex.x + sensorDir.x, tileIndex.y + sensorDir.y, true, layerName);

      if (tileExt !== null && tileExt.properties.solid) {
        tile = tileExt;

        hm = hwmap[tile.properties.hwmap];
        diffExt = 32;

        tileX = layer.x + tile.x * 32;
        tileY = layer.y + tile.y * 32;

        let offsetRes = this.calcOffset(tileX, tileY, flipMaps);

        tileX = offsetRes.tileX;
        tileY = offsetRes.tileY;
        offset = offsetRes.offset;

        idx = tile.properties.flipmap ? hm[31 - offset] : hm[offset];
      }
    } else if (idx == 32) {
      // regression
      let tileReg = map.getTileAt(tileIndex.x - sensorDir.x, tileIndex.y - sensorDir.y, true, layerName);

      if (tileReg !== null && tileReg.properties.solid) {
        tile = tileReg;

        hm = hwmap[tile.properties.hwmap];

        tileX = layer.x + tile.x * 32;
        tileY = layer.y + tile.y * 32;

        let offsetRes = this.calcOffset(tileX, tileY, flipMaps);

        tileX = offsetRes.tileX;
        tileY = offsetRes.tileY;
        offset = offsetRes.offset;

        idx = tile.properties.flipmap ? hm[31 - offset] : hm[offset];
      }
    }

    let diff = undefined;

    switch (this.sensorMode) {
      case 0: // floor
        if (flipMaps) {
          diff = tileX - this.x - idx;
        } else {
          diff = tileY - this.y - idx;
        }
        break;
      case 1: // right wall
        if (flipMaps) {
          diff = tileY - this.y - idx;
        } else {
          diff = tileX - this.x - idx;
        }
        break;
      case 2: // ceiling
        if (flipMaps) {
          diff = this.x - tileX - idx;
        } else {
          diff = this.y - tileY - idx;
        }
        break;
      case 3: // left wall
        if (flipMaps) {
          diff = tileY - this.y - idx;
        } else {
          diff = this.x - tileX - idx;
        }
        break;
    }

    // console.log(`${diff} : ${diffExt}`);

    // diff += diffExt;

    if (this.debug) {
      this.scene.graphics.fillStyle(0xFF00FF);
      this.scene.graphics.fillRect(tileX, tileY, 5, 5);
    }

    if (diff < tolerance) {
      return {diff, groundAngle: tile.properties.ground_angle};
    }

    return {diff: null, groundAngle: null};
  }

  drawDebug(color) {
    if (this.debug) {
      this.scene.graphics.fillStyle(color, 1);
      this.scene.graphics.fillRect(this.x, this.y, 3, 3);
    }
  }
}
