function Tools() {
  //Tools constructor
}

Tools.prototype = {
  constructor: Tools,
  save: function() { // Send data to /save which will put it in the mongodb
    dataFromDB.infos = this.setInfosValid(JSON.stringify(this.getActualInfos()));

    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify(dataFromDB.infos),
      type: 'POST',
      url: "./save"
    });
  },
  uploadImg: function(file, background) {
    $("#loadImg").css({
      display: "block"
    });

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
            $("#urlImg").val(response.imgUrl);
            ParamsWindowHexa.prototype.imgChange(response.imgUrl);
          } else {
            $("#backImg_ipt").val(response.imgUrl);
            ParamsWindow.prototype.backImgChange(response.imgUrl);
          }
          $("#loadImg").css({
            display: "none"
          });
        });
      } else {
        if (!background) {
          $("#urlImg").val("Too large, ~4MB max.");
        } else {
          $("#backImg_ipt").val("Too large, ~4MB max.");
        }
        $("#loadImg").css({
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
      x: grid.position.x - grid.hexagonsSize.x / 2 + grid.hexagonsDifference.x / 2 + 100 * grid.scale * hexPos.x + grid.hexagonsMargin * hexPos.x,
      y: grid.position.y - grid.hexagonsSize.y / 2 + grid.hexagonsDifference.y / 2 + (57 + grid.hexagonsDifference.y / 2) * grid.scale * hexPos.y + grid.hexagonsMargin * hexPos.y + (grid.hexagonsSize.y - 57) / 4 + 4
    };

    if (hexPos.y % 2 !== 0)
      f.x += grid.hexagonsSize.x / 2 * grid.scale + grid.hexagonsMargin / 2;

    return f;
  },
  getHexagon: function(id, array) {
    var result = $.grep(array, function(e) {
      return e.id == id;
    });

    if (result.length > 0)
      return result[0];
    else
      return false;
  },
  getHexaInfos: function() {
    var infos = [];
    for (var i = 0; i < grid.hexagons.length; ++i) {
      var hexagon = grid.hexagons[i];
      var data_tmp = {};
      data_tmp.id = hexagon.id;
      data_tmp.color = hexagon.color;
      data_tmp.image = hexagon.image;
      data_tmp.imgSize = hexagon.imgSize;
      data_tmp.link = hexagon.link;
      data_tmp.text = hexagon.text;
      data_tmp.textColor = hexagon.textColor;
      data_tmp.position = hexagon.position;
      infos.push(data_tmp);
    }

    return infos;
  },
  getActualInfos: function() {
    var actInfos = {};

    actInfos.hexagons = JSON.stringify(this.getHexaInfos());
    actInfos.hexa_size = grid.scale;
    actInfos.hexa_margin = grid.hexagonsMargin;
    actInfos.gradient_size = gradientSize;
    actInfos.bg_color = backgroundColor;
    actInfos.bg_color2 = backgroundColor2;
    actInfos.lang = langManager.language;
    actInfos.show_searchbar = showSearchBar;
    actInfos.search_pos = searchPos;
    actInfos.center_bg = centerBack;
    actInfos.repeat_bg = repeatBack;
    actInfos.ajust_bg = ajustBack;
    actInfos.back_img = backImg;

    return actInfos;
  },
  exist: function(pos) {
    var result = $.grep(grid.hexagons, function(e) {
      return e.position.x == pos.x && e.position.y == pos.y;
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
  setInfosValid: function(infosStr) {
    var infos = JSON.parse(infosStr);

    if (infos.hexa_size)
      if (infos.hexa_size < 0.4) infos.hexa_size = 0.4;
      else if (infos.hexa_size > 3) infos.hexa_size = 3;

    if (infos.hexa_margin)
      if (infos.hexa_margin < 0) infos.hexa_margin = 0;
      else if (infos.hexa_margin > 200) infos.hexa_margin = 200;

    if (infos.gradient_size)
      if (infos.gradient_size < 0) infos.gradient_size = 0;
      else if (infos.gradient_size > 300) infos.gradient_size = 300;

    if (infos.bg_color)
      if (infos.bg_color.length > 7) infos.bg_color = infos.bg_color.substring(0, 8);

    if (infos.bg_color2)
      if (infos.bg_color2.length > 7) infos.bg_color2 = infos.bg_color2.substring(0, 8);

    if (infos.lang)
      if (infos.lang.length > 2) infos.lang = infos.lang.substring(0, 3);

    if (infos.search_pos)
      if (infos.search_pos < 0) infos.search_pos = 0;
      else if (infos.search_pos > 100) infos.search_pos = 100;

    if (infos.back_img)
      if (infos.back_img.length > 250) infos.back_img.substring(0, 251);

    var hexagons = JSON.parse(infos.hexagons);

    if (hexagons.length > 0) hexagons[0] = {
      "id": 0,
      "color": "#000000",
      "image": "/img/gear.png",
      "imgSize": 80,
      "position": {
        "x": 0,
        "y": 0
      }
    };

    infos.hexagons = JSON.stringify(hexagons);

    return infos;
  }
};
