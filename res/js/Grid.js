function Grid() {
  this.pos = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
  };
  this.scale = 1;
  this.previewHexa = [];
  this.hexagons = {
    margin: 10,
    size: {
      x: 100 * this.scale,
      y: Math.round(Math.sqrt((100 * this.scale) * (100 * this.scale) + (58 * this.scale) * (58 * this.scale)) * 100) / 100
    },

    positions: [],
    colors: [],
    links: [],
    images: [],
    imgSize: []
  };

  this.difference = {
    x: this.hexagons.size.x - 100,
    y: this.hexagons.size.y - 58
  };

  this.addParamsHexa();

  this.changePos();
}

Grid.prototype = {
  constructor: Grid,
  //Hexagon
  addHexagon: function(pos, type) {
    var id = pos.x + ";" + pos.y;
    var truePos = this.setPos(pos);

    var container = $("#grid");
    var _class;
    var onclick;

  /*  var nhexa = $("#grid").append('<div id="' + id + '"></div>');
    var hexa = $("#" + pos.x + "\\;" + pos.y);*/

    var color;

    switch (type) {
      case "preview":
        _class = "preview";
        onclick = "grid.clickPreviewHexa(this)";
        color = "#ffffff";
        container = $("#previewContainer");
        break;

      case "paramsHexa":
        _class = "hex";
        onclick = "grid.clickParamsHexa(this)";
        color = "#000000";
        break;

      default:
        _class = "hex";
        onclick = "grid.clickHexagon(this)";
        color = this.hexagons.colors[this.hexagons.colors.length - 1];
    }

    container.append('<div id="' + id +'" class="' + _class + '" onclick="' + onclick + '"><div class="hex-in1" id="' + id + '">' +
      '<div class="hex-in2" id="' + id + '" style="background-color:' + color + ';" onmouseover="grid.mouseOver(this)" onmouseout="grid.mouseOut(this)">' +
      '</div></div></div>');

    if(_class == "hex" && type != "paramsHexa"){
      $("#" + pos.x + "\\;" + pos.y + ".hex-in2").css({'background-image': 'url(' + this.hexagons.images[this.hexagons.images.length - 1] + ')',
        'background-size': this.hexagons.imgSize[this.hexagons.imgSize.length - 1] + 'px'});
    }

    $("#" + pos.x + "\\;" + pos.y + "." + _class).css({
      left: truePos.x + "px",
      top: truePos.y + "px"
    });

  },
  mouseOver: function(hexa) {
    if (modifying && hexa.id != "0;0")
      hexa.style.opacity = ".6";
  },
  mouseOut: function(hexa) {
    if (modifying && hexa.id != "0;0")
      hexa.style.opacity = "1";
  },
  clickHexagon: function(hexa) {
    if (modifying && hexa.id != "0;0")
      var paramsWindowHexa = new ParamsWindowHexa(hexa.getAttribute('id'));
    else if (!previewing) {
      var posInArray = tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')));
      //Ouvre le lien AVEC ou SANS http://
      if (this.hexagons.links[posInArray])
        window.location = /^(http|https):/.test(this.hexagons.links[posInArray]) ? this.hexagons.links[posInArray] : 'http://' + this.hexagons.links[posInArray];
    } else if (!editing)
      var paramsWindowHexa = new ParamsWindowHexa(hexa.getAttribute('id'));
    else
      $("#paramsWindowHexa").effect("shake");
  },

  //Parameters Hexagon
  addParamsHexa: function() {
    this.addHexagon({
      x: 0,
      y: 0
    }, "paramsHexa");
  },
  clickParamsHexa: function() {
    if (paramsMenuOpen || params || editing || modifying || previewing) {
      paramsMenu.closeAll();
      paramsMenu.close();
    } else
      paramsMenu.open();
  },
  //Preview Hexagons
  addPreviewHexa: function() {
    this.removePreviewHexa();
    previewing = true;

    for (var i = 0; i < this.hexagons.positions.length + 1; ++i) {
      for (var j = 0; j < around.length; ++j) {
        var tmp_pos = {
          x: 0,
          y: 0
        };
        if (i < this.hexagons.positions.length) {
          if (this.hexagons.positions[i].y % 2 !== 0) {
            tmp_pos = {
              x: this.hexagons.positions[i].x - around[j].x,
              y: this.hexagons.positions[i].y - around[j].y
            };
          } else {
            tmp_pos = {
              x: this.hexagons.positions[i].x + around[j].x,
              y: this.hexagons.positions[i].y + around[j].y
            };
          }
        } else {
          tmp_pos = {
            x: around[j].x,
            y: around[j].y
          };
        }

        if (!tools.exist(tmp_pos, this.hexagons.positions) && !tools.exist(tmp_pos, this.previewHexa)) {
          this.previewHexa.push(tmp_pos);
          this.addHexagon(tmp_pos, 'preview');
        }
      }
    }
  },
  removePreviewHexa: function() {
    $(".preview").remove();
    this.previewHexa = [];
    previewing = false;
  },
  clickPreviewHexa: function(hexa) {
    if (!editing) {
      var id = hexa.getAttribute('id');
      var pos = tools.idToArray(id);

      this.hexagons.positions.push({
        x: pos.x,
        y: pos.y
      });

      this.hexagons.colors.push("#000000");
      this.hexagons.links.push("");
      this.hexagons.images.push("");
      this.hexagons.imgSize.push(100);

      $("#" + pos.x + "\\;" + pos.y).remove();

      this.addHexagon(pos, "hexagon");

      var paramsWindowHexa = new ParamsWindowHexa(id);

      this.removePreviewHexa();
    } else
      $("#paramsWindowHexa").effect("shake");
  },

  setPos: function(hexPos) {
    var f = {
      x: this.pos.x - this.hexagons.size.x / 2 + this.difference.x / 2 + 100 * this.scale * hexPos.x + this.hexagons.margin * hexPos.x,
      y: this.pos.y - this.hexagons.size.y / 2 + this.difference.y / 2 + (58 * this.scale + (this.hexagons.size.y - 58 * this.scale) / 2) * hexPos.y + this.hexagons.margin * hexPos.y
    };

    if (hexPos.y % 2 !== 0)
      f.x += (this.hexagons.size.x + this.hexagons.margin) / 2;

    return f;
  },

  changePos: function() {
    //CHANGE LA POSITION DE LA GRILLE
    this.pos = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };

    //CHANGE LA POSITION DU PARAMSHEXA
    $("#0\\;0").css({
      "left": this.pos.x - this.hexagons.size.x / 2 + this.difference.x / 2,
      "top": this.pos.y - this.hexagons.size.y / 2 + this.difference.y / 2
    });

    //CHANGE LA POSITION DES HEXAGONES
    for (var i = 0; i < this.hexagons.positions.length; ++i) {
      var hexPos = this.setPos(this.hexagons.positions[i]);
      $("#" + this.hexagons.positions[i].x + "\\;" + this.hexagons.positions[i].y)
        .css({
          "left": hexPos.x,
          "top": hexPos.y
        });
    }

    //CHANGE LA POSITION DES PREVIEWS
    for (var j = 0; j < this.previewHexa.length; ++j) {
      var previewPos = this.setPos(this.previewHexa[j]);
      $("#" + this.previewHexa[j].x + "\\;" + this.previewHexa[j].y)
        .css({
          "left": previewPos.x,
          "top": previewPos.y
        });
    }
  },
  refresh: function(pos, color, link, img, imgSize) {
    this.hexagons.positions.push(pos);
    this.hexagons.colors.push(color);
    this.hexagons.links.push(link);
    this.hexagons.images.push(img);
    this.hexagons.imgSize.push(imgSize);
    this.addHexagon(pos, "hexagon");
  }
};
