function Grid() {
  this.div = document.getElementById("grid");
  this.pos = [$(window).width() / 2, $(window).height() / 2];
  this.scale = 1;
  this.key = "menu";
  this.previewHexa = [];
  this.hexagons = {
    margin: 10,
    sizeXY: [100 * this.scale, Math.round(Math.sqrt((100 * this.scale) * (100 * this.scale) + (58 * this.scale) * (58 * this.scale)) * 100) / 100],

    positions: [],
    colors: [],
    links: [],
    backImg: []
  };

  this.difference = [this.hexagons.sizeXY[0] - 100, this.hexagons.sizeXY[1] - 58];

  this.addParamsHexa();

  this.changePos();
}

Grid.prototype = {
  constructor: Grid,
  //Hexagon
  addHexagon: function(pos, type) {
    var id = pos[0] + ";" + pos[1];
    var truePos = this.setPos(pos);

    var hexa = document.createElement("div");
    var color;

    hexa.setAttribute('id', id);
    if (type == "preview") {
      hexa.setAttribute('class', "preview");
      hexa.setAttribute('onclick', "grid.clickPreviewHexa(this)");
      color = "#ffffff";
    } else if (type == "paramsHexa") {
      hexa.setAttribute('class', "hex");
      hexa.setAttribute('onclick', "grid.clickParamsHexa()");
      color = "#000000";
    } else {
      hexa.setAttribute('class', "hex");
      hexa.setAttribute('onclick', "grid.clickHexagon(this)");
      color = this.hexagons.colors[this.hexagons.colors.length - 1];
    }
    hexa.innerHTML = '<div class="hex-in1" id="' + id + '"><div class="hex-in2" id="' + id + '" style="background-color:' + color + ';"></div></div>';
    //hexa.style.transform = "scale(" + this.scale + ")";
    hexa.style.left = truePos[0] + "px";
    hexa.style.top = truePos[1] + "px";
    this.div.appendChild(hexa);
  },
  clickHexagon: function(hexa) {
    if (!previewing) {
      var posInArray = tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')), this.hexagons.positions);
      //Ouvre le lien AVEC ou SANS http://
      if (this.hexagons.links[posInArray])
        window.location = /^(http|https):/.test(this.hexagons.links[posInArray]) ? this.hexagons.links[posInArray] : 'http://' + this.hexagons.links[posInArray];
    } else if (!editing)
      var paramsWindoowHexa = new ParamsWindowHexa(hexa.getAttribute('id'));
    else
      $("#paramsWindowHexa").effect("shake");
  },

  //Parameters Hexagon
  addParamsHexa: function() {
    this.addHexagon([0, 0], "paramsHexa");
  },
  clickParamsHexa: function() {
    if (!previewing) {
      previewing = true;
      this.addPreviewHexa();
    //  this.animPreviewHexa();

      paramsWindow.open();
    } else {
      $(".preview").remove();
      previewing = false;
      paramsWindow.close();
    }
  },
  //Preview Hexagons
  addPreviewHexa: function() {
    this.previewHexa = [];
    $(".preview").remove();

    for (var i = 0; i < this.hexagons.positions.length + 1; ++i) {
      for (var j = 0; j < around.length; ++j) {
        var tmp_pos = [0, 0];
        if (i < this.hexagons.positions.length) {
          if (this.hexagons.positions[i][1] % 2 !== 0) {
            tmp_pos = [this.hexagons.positions[i][0] - around[j][0], this.hexagons.positions[i][1] - around[j][1]];
          } else {
            tmp_pos = [this.hexagons.positions[i][0] + around[j][0], this.hexagons.positions[i][1] + around[j][1]];
          }
        } else {
          tmp_pos = [around[j][0], around[j][1]];
        }

        if (!tools.exist(tmp_pos, this.hexagons.positions) && !tools.exist(tmp_pos, this.previewHexa)) {
          this.previewHexa.push(tmp_pos);
          this.addHexagon(tmp_pos, 'preview');
        }
      }
    }
  },
  clickPreviewHexa: function(hexa) {
    if (!editing) {
      var id = hexa.getAttribute('id');
      var pos = tools.idToArray(id);

      this.hexagons.positions.push(pos);
      this.hexagons.colors.push("#000000");
      this.hexagons.links.push("");
      this.hexagons.backImg.push("");

      $("#" + pos[0] + "\\;" + pos[1]).remove();

      this.addHexagon(pos, id);
      this.addPreviewHexa();

      var paramsWindowHexa = new ParamsWindowHexa(id);
    } else
      $("#paramsWindowHexa").effect("shake");
  },

  setPos: function(hexPos) {
    var f = [
      this.pos[0] - this.hexagons.sizeXY[0] / 2 + this.difference[0] / 2 + 100 * this.scale * hexPos[0] + this.hexagons.margin * hexPos[0],
      this.pos[1] - this.hexagons.sizeXY[1] / 2 + this.difference[1] / 2 + (58 * this.scale + (this.hexagons.sizeXY[1] - 58 * this.scale) / 2) * hexPos[1] + this.hexagons.margin * hexPos[1]
    ];

    if (hexPos[1] % 2 !== 0)
      f[0] += (this.hexagons.sizeXY[0] + this.hexagons.margin) / 2;

    return f;
  },

  changePos: function() {
    //CHANGE LA POSITION DE LA GRILLE
    this.pos = [$(window).width() / 2, $(window).height() / 2];

    //CHANGE LA POSITION DU PARAMSHEXA
    $("#0\\;0").css({
      "left": this.pos[0] - this.hexagons.sizeXY[0] / 2 + this.difference[0] / 2,
      "top": this.pos[1] - this.hexagons.sizeXY[1] / 2 + this.difference[1] / 2
    });

    //CHANGE LA POSITION DES HEXAGONES
    for (var i = 0; i < this.hexagons.positions.length; ++i) {
      var hexPos = this.setPos(this.hexagons.positions[i]);
      $("#" + this.hexagons.positions[i][0] + "\\;" + this.hexagons.positions[i][1])
        .css({
          "left": hexPos[0],
          "top": hexPos[1]
        });
    }

    //CHANGE LA POSITION DES PREVIEWS
    for (var j = 0; j < this.previewHexa.length; ++j) {
      var previewPos = this.setPos(this.previewHexa[j]);
      $("#" + this.previewHexa[j][0] + "\\;" + this.previewHexa[j][1])
        .css({
          "left": previewPos[0],
          "top": previewPos[1]
        });
    }
  }
};
