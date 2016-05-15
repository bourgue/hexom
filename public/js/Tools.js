function Tools() {
  //Tools constructor
}

Tools.prototype = {
    constructor: Tools,
    save: function() { // Send data to /save which will put it in the mongodb
      var data = {};
      data.hexagons = JSON.stringify(this.getHexaInfos());
      data.hexa_size = grid.scale;
      data.hexa_margin = grid.hexagonsMargin;
      data.gradient_size = gradientSize;
      data.bg_color = backgroundColor;
      data.bg_color2 = backgroundColor2;
      data.lang = langManager.language;
      data.show_searchbar = showSearchBar;

      dataFromDB.infos = data;

      $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(data),
              type: 'POST',
              url: "./save"
            });
        },
        uploadImg: function(file) {
          $("#loadImg").css({
            display: "block"
          });

          var reader = new FileReader();

          reader.addEventListener("load", function() {
            var data = {};
            data.uri = reader.result;
            data.id = Math.random().toString(36).substring(7);

            $.ajax({
              contentType: 'application/json',
              data: JSON.stringify(data),
              type: 'POST',
              url: "./upload"
            }).success(function(response) {
              $("#urlImg").val(response.imgUrl);
              ParamsWindowHexa.prototype.imgChange(response.imgUrl);
              $("#loadImg").css({
                display: "none"
              });
            });
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
            y: grid.position.y - grid.hexagonsSize.y / 2 + grid.hexagonsDifference.y / 2 + (57 + grid.hexagonsDifference.y / 2) * grid.scale * hexPos.y + grid.hexagonsMargin * hexPos.y
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
            data_tmp.position = hexagon.position;
            infos.push(data_tmp);
          }

          return infos;
        },
        exist: function(pos, array) {
          var result = $.grep(array, function(e) {
            return e.position.x == pos.x && e.position.y == pos.y;
          });

          if (result.length > 0)
            return true;
          else
            return false;
        }
    };
