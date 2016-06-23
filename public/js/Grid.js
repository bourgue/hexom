function Grid() {
  this.position = {};

  this.previewHexas = [];

  this.hexagons = [];

  this.hexagonsSize = {};

  this.hexagonsDifference = {};
}

Grid.prototype = {
  constructor: Grid,
  init: function(){
    this.position = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };

    this.hexagonsSize = {
      x: 100 * infos.hexaSize.value,
      y: Math.sqrt((100 * infos.hexaSize.value) * (100 * infos.hexaSize.value) + (57 * infos.hexaSize.value) * (57 * infos.hexaSize.value))
    };

    this.hexagonsDifference = {
      x: this.hexagonsSize.x - 100,
      y: this.hexagonsSize.y - 57
    };
  },

  // ADD
  addHexagon: function(properties) {
    var hexagon = new Hexagon(properties);
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
      var hexagon = this.hexagons[i];

      for (var j = 0; j < around.length; ++j) {
        var tmp_pos = {
          x: 0,
          y: 0
        };

        if (hexagon.prop.position.y % 2 !== 0) {
          tmp_pos = {
            x: hexagon.prop.position.x - around[j].x,
            y: hexagon.prop.position.y - around[j].y
          };
        } else {
          tmp_pos = {
            x: hexagon.prop.position.x + around[j].x,
            y: hexagon.prop.position.y + around[j].y
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
    grid.init();

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
    grid.init();

    $(".hex").remove();
    this.hexagons = [];

    for (var i = 0; i < data.length; ++i) {
      var hexa = data[i];

      if (hexa.id === 0) {
        hexa.image = "/img/gear.png";
        hexa.imgSize = 80;
      }

      for(var p in hexa_prop){
        if(!hexa[p]){
          if(hexa_prop[p].defaultValue !== undefined){
            hexa[p] = hexa_prop[p].defaultValue;
          }
        }
      }
      this.addHexagon(hexa);
    }

    this.updateHexaPosition();
  }
};
