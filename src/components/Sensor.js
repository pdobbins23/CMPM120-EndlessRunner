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
  constructor(scene, offset, direction) {
    this.scene = scene;

    this.x = 0;
    this.y = 0;
    this.offset = offset;
    this.direction = direction;
  }

  process(x, y, map, layer, groundAngle) {
    let hwmap = undefined;
    let sensorMode = 0;
    
    if ((0 <= groundAngle && groundAngle <= 0.78539816) || (5.49778714 <= groundAngle && groundAngle <= 6.28318531)) { // floor mode
      this.x = x + this.offset.x * (this.offset.width / 2);
      this.y = y + this.offset.y * (this.offset.height/ 2);

      sensorBLPos = {x: this.x + sensorBLoffset.x * (this.width / 2), y: this.y + sensorBLoffset.y * (this.height / 2)};
      sensorBRPos = {x: this.x + sensorBRoffset.x * (this.width / 2), y: this.y + sensorBRoffset.y * (this.height / 2)};
      sensorBDir = {x: 0, y: 1};

      hwmap = HEIGHTMAPS;

      sensorMode = 0;
    } else if ((0.78539816 < groundAngle && groundAngle <  2.35619449)) { // right wall
      sensorBLPos = {x: this.x + sensorBLoffset.y * (this.height / 2), y: this.y - sensorBLoffset.x * (this.width / 2)};
      sensorBRPos = {x: this.x + sensorBRoffset.y * (this.height / 2), y: this.y - sensorBRoffset.x * (this.width / 2)};
      sensorBDir = {x: 1, y: 0};

      hwmap = WIDTHMAPS;

      sensorMode = 1;
    } else if ((2.35619449 <= groundAngle && groundAngle <= 3.926990817)) { // ceiling mode
      sensorBLPos = {x: this.x - sensorBLoffset.x * (this.width / 2), y: this.y - sensorBLoffset.y * (this.height / 2)};
      sensorBRPos = {x: this.x - sensorBRoffset.x * (this.width / 2), y: this.y - sensorBRoffset.y * (this.height / 2)};
      sensorBDir = {x: 0, y: -1};

      hwmap = HEIGHTMAPS;

      sensorMode = 2;
    } else if (3.926990817 < groundAngle && groundAngle < 5.497787144) { // left wall
      sensorBLPos = {x: this.x - sensorBLoffset.y * (this.height / 2), y: this.y + sensorBLoffset.x * (this.width / 2)};
      sensorBRPos = {x: this.x - sensorBRoffset.y * (this.height / 2), y: this.y + sensorBRoffset.x * (this.width / 2)};
      sensorBDir = {x: -1, y: 0};

      hwmap = WIDTHMAPS;

      sensorMode = 3;
    }
  }
}
