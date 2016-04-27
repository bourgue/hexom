function Tools() {
  //Tools constructor
}

Tools.prototype = {
  constructor: Tools,
  save: function() {  // Send data to /save which will put it in the mongodb
    var data = {};
    data.username = username;
    data.hexa_pos = grid.hexagons.positions;
    data.hexa_colors = grid.hexagons.colors;
    data.hexa_links = grid.hexagons.links;
    data.hexa_images = grid.hexagons.images;
    data.hexa_img_sizes = grid.hexagons.imgSize;
    data.hexa_size = grid.scale;
    data.shadow_color = shadowColor;
    data.shadow_size = shadowSize;
    data.bg_color = backgroundColor;
    data.lang = langManager.language;

    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify(data),
      type: 'POST',
      url: "./save",
      success: function(){
        // SUCCESS
      }
    });
  },
  getHexPos: function(x, y) {
    var pos = [0, 0];

    pos[0] = x - Math.round(hexGrid.length / 2);
    pos[1] = y - Math.round(hexGrid[0].length / 2) + 2;

    return pos;
  },
  getPosInArrays: function(pos) {
    for (var i = 0; i < grid.hexagons.positions.length; ++i)
      if (JSON.stringify(pos) === JSON.stringify(grid.hexagons.positions[i]))
        return i;
  },

  idToArray: function(id) {
    var x = "";
    var y = "";
    var change = false;
    for (var i = 0; i < id.length; ++i) {
      if (id[i] == ";") {
        change = true;
        i++;
      }

      if (!change)
        x += id[i];
      else
        y += id[i];
    }

    return {
      x: parseInt(x),
      y: parseInt(y)
    };
  },

  exist: function(pos, parent) {
    var exist = false;
    for (var i = 0; i < parent.length && exist === false; ++i)
      if (JSON.stringify(pos) === JSON.stringify(parent[i]) || (pos.x === 0 && pos.y === 0))
        exist = true;

    return exist;
  },
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
  }
};

//POUR TEST EQUALITE ENTRE ARRAY
Array.prototype.equals = function(array) {
  if (!array)
    return false;

  if (this.length != array.length)
    return false;

  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    } else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
};

Object.defineProperty(Array.prototype, "equals", {
  enumerable: false
});
