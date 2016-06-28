function Tools() {

}

Tools.prototype = {
  constructor: Tools,
  save: function() { // Send data to /save which will put it in the mongodb
    var compact = this.setInfosValid(this.compactInfos(infos));
    compact.hexagons = JSON.stringify(compact.hexagons);

    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify(compact),
      type: 'POST',
      url: "./save"
    });

    dataFromDB.infos = compact;
    dataFromDB.infos.hexagons = JSON.parse(dataFromDB.infos.hexagons);
  },
  uploadImg: function(file, background) {
    if(!background) $("#paramsWindowHexa .loadImg").show();
    else $("#paramsWindow .loadImg").show();

    var reader = new FileReader();

    reader.addEventListener("load", function() {
      var data = {};
      data.uri = reader.result;
      data.id = Math.random().toString(36).substring(7);

      if (data.uri.length < 5000000) {
        $.ajax({
          contentType: 'application/json',
          data: JSON.stringify(data),
          type: 'POST',
          url: "./upload"
        }).success(function(response) {
          if (!background) {
            $("#paramsWindowHexa .loadImg").hide();

            $("#image_ipt").val(response.imgUrl);

            paramsWindowHexa.hexagon.prop.image = response.imgUrl;
            hexa_prop.image.oninput(paramsWindowHexa.hexagon.prop.id, response.imgUrl);
          } else {
            $("#paramsWindow .loadImg").hide();

            $("#backImage_ipt").val(response.imgUrl);

            infos.backImage.value = response.imgUrl;
            infos.backImage.oninput(response.imgUrl);
          }
        });
      } else {
        if (!background) {
          $("#image_ipt").val("Too large, ~4MB max.");
        } else {
          $("#backImage_ipt").val("Too large, ~4MB max.");
        }
        $(".loadImg").css({
          display: "none"
        });
      }
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  },
  convertToRealPosition: function(hexPos) {
    grid.position = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };

    var f = {
      x: grid.position.x - grid.hexagonsSize.x / 2 + grid.hexagonsDifference.x / 2 + grid.hexagonsSize.x * hexPos.x + infos.hexaMargin.value * hexPos.x,
      y: grid.position.y - grid.hexagonsSize.y / 2 + grid.hexagonsDifference.y / 2 + 86.5 * infos.hexaSize.value * hexPos.y + infos.hexaMargin.value * hexPos.y + 19
    };

    if (hexPos.y % 2 !== 0)
      f.x += 100 * infos.hexaSize.value / 2 + infos.hexaMargin.value / 2;

    return f;
  },
  getHexaInfos: function() {
    var infos = [];
    for (var i = 0; i < infos.hexagons.length; ++i) {
      var hexagon = infos.hexagons[i];
      var data_tmp = {};

      for(var p in hexagon){
        data_tmp[p] = hexagon[p];
      }

      infos.push(data_tmp);
    }

    return infos;
  },
  exist: function(pos) {
    var result = $.grep(grid.hexagons, function(e) {
      return e.prop.position.x == pos.x && e.prop.position.y == pos.y;
    });

    var result2 = $.grep(grid.previewHexas, function(e) {
      return e.position.x == pos.x && e.position.y == pos.y;
    });

    if (result.length + result2.length > 0)
      return true;
    else
      return false;
  },
  copyTextToClipboard: function(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    textArea.style.width = '2em';
    textArea.style.height = '2em';

    textArea.style.padding = 0;

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand('copy');
    } catch (err) {
      console.log('Unable to copy \:\(');
    }

    document.body.removeChild(textArea);
  },
  isJsonCorrect: function(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  parseIfString: function(str) {
    if (this.isJsonCorrect(str)) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    } else {
      return str;
    }
  },
  setInfosValid: function(inf) {
    for (var info in inf) {
      if (infos[info]) {
        if (infos[info].type == Number) {
          if (inf[info] < infos[info].min)
            inf[info] = infos[info].min;
          else if (inf[info] > infos[info].max)
            inf[info] = infos[info].max;
        } else if (infos[info].type == String) {
          if (inf[info].length > infos[info].maxLength)
            inf[info] = inf[info].substring(0, infos[info].maxLength + 1);
        }
      }
    }
    return inf;
  },
  findHexaIndex: function(id) {
    var index;

    for (var i = 0; i < grid.hexagons.length && !index; ++i) {
      if (grid.hexagons[i].prop.id == id)
        index = i;
    }

    return index;
  },
  findPreviewHexaIndex: function(id) {
    var index;

    for (var i = 0; i < grid.previewHexas.length && !index; ++i) {
      if (grid.previewHexas[i].id == id)
        index = i;
    }

    return index;
  },
  compactInfos: function(_infos) {
    var cmpt_infos = {};

    for (var info in _infos) {
      if(typeof _infos[info] !== 'undefined'){
        if(typeof _infos[info].value !== 'undefined')
          cmpt_infos[info] =  _infos[info].value;
        else
          cmpt_infos[info] =  _infos[info].defaultValue;
      }
    }

    cmpt_infos.hexagons = this.compactHexagons();
    return cmpt_infos;
  },
  compactHexagons: function() {
    var cmpt_hexas = [];
    for (var i = 0; i < grid.hexagons.length; ++i) {
      cmpt_hexas.push(grid.hexagons[i].prop);
    }

    cmpt_hexas[0] = {
      "id": 0,
      "color": "#000000",
      "image": "/img/gear.png",
      "imgSize": 80,
      "position": {
        "x": 0,
        "y": 0
      }
    };

    return cmpt_hexas;
  },
  newId: function() {
    var mostHighId = 0;
    for (var i = 0; i < grid.hexagons.length; ++i) {
      if (grid.hexagons[i].prop.id > mostHighId)
        mostHighId = grid.hexagons[i].prop.id;
    }

    return mostHighId + 1;
  }
};
