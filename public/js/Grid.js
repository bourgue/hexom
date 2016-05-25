function Grid() {
  this.position = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
  };
  this.scale = 1;
  this.previewHexas = [];

  // This is the main array
  // the hexagon which has 0 as id is the paramsHexa
  this.hexagons = [];

  this.hexagonsMargin = 10;

  this.hexagonsSize = {
    x: 100 * this.scale,
    y: Math.round(Math.sqrt((100 * this.scale) * (100 * this.scale) + (57 * this.scale) * (57 * this.scale)) * 100 * this.scale) / 100 * this.scale
  };

  this.hexagonsDifference = {
    x: this.hexagonsSize.x - 100 * this.scale,
    y: this.hexagonsSize.y - 57 * this.scale
  };

  this.updateHexaPosition();
}

Grid.prototype = {
  constructor: Grid,

  // ADD
  addHexagon: function(id, pos, color, link, text, textColor, image, imgSize) {
    var hexagon = new Hexagon(id, pos, color, link, text, textColor, image, imgSize);
    this.hexagons.push(hexagon);
  },
  addPreviewHexa: function(id, pos) {
    var previewHexa = new PreviewHexa(id, pos);
    this.previewHexas.push(previewHexa);
  },

  // Preview Hexagons
  findPreviewHexa: function() {
    this.removePreviewHexa();
    previewing = true;

    for (var i = 0; i < this.hexagons.length; ++i) {
      for (var j = 0; j < around.length; ++j) {
        var tmp_pos = {
          x: 0,
          y: 0
        };

        var hexagon = tools.getHexagon(i, this.hexagons);

        if (hexagon.position.y % 2 !== 0) {
          tmp_pos = {
            x: hexagon.position.x - around[j].x,
            y: hexagon.position.y - around[j].y
          };
        } else {
          tmp_pos = {
            x: hexagon.position.x + around[j].x,
            y: hexagon.position.y + around[j].y
          };
        }

        if (!tools.exist(tmp_pos)) {
          this.addPreviewHexa(this.previewHexas.length, tmp_pos);
        }
      }
    }
  },
  removePreviewHexa: function() {
    $(".previewHexa").remove();
    this.previewHexas = [];
    previewing = false;
  },

  updateHexaPosition: function() {
    for (var i = 0; i < this.hexagons.length; ++i) {
      var hexagon = this.hexagons[i];
      hexagon.updateRealPosition();
    }

    for (var j = 0; j < this.previewHexas.length; ++j) {
      var previewHexa = this.previewHexas[j];
      previewHexa.updateRealPosition();
    }
  },
  update: function(data) {
    $(".hex").remove();
    this.hexagons = [];

    for (var i = 0; i < JSON.parse(data.hexagons).length; ++i) {
      var hexa = JSON.parse(data.hexagons)[i];

      if (hexa.id === 0) {
        hexa.image = "/img/gear.png";
        hexa.imgSize = 80;
      }

      this.addHexagon(i, hexa.position, hexa.color, hexa.link, hexa.text, hexa.textColor, hexa.image, hexa.imgSize);
    }

    this.updateHexaPosition();
  }
};
