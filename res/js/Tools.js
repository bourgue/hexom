function Tools() {
  //Tools constructor
}

Tools.prototype = {
  constructor: Tools,
  save: function() {
    $.post("res/php/save.php", {
      username: user.username,
      pos: JSON.stringify(grid.hexagons.positions),
      colors: JSON.stringify(grid.hexagons.colors),
      links: JSON.stringify(grid.hexagons.links),
      backgroundColor: backgroundColor,
      shadowColor: shadowColor,
      shadowSize: shadowSize
    }, function(data) {
      news.add(langManager.words.SAVE_CONFIRM[langManager.langId[langManager.language]]);
    });
  },
  login: function(username, password) {
    $.post("res/php/login.php", {
        username: username,
        password: password
      },
      function(data) {
        var obj_data = JSON.parse(data);

        if (data === "no_account") {
          ConnectWindow.prototype.openError($("#no_account"));
        } else if (data === "err_mdp") {
          ConnectWindow.prototype.openError($("#err_mdp"));
        } else {
          connected = true;
          user.username = obj_data.username;
          user.password = password;
          for (var i = 0; i < JSON.parse(obj_data.pos).length; ++i)
            grid.refresh(JSON.parse(obj_data.pos)[i], JSON.parse(obj_data.colors)[i], JSON.parse(obj_data.links)[i]);

          paramsWindow.backgroundColorChange(obj_data.backgroundColor);
          paramsWindow.shadowColorChange(obj_data.shadowColor);
          paramsWindow.shadowSizeChange(obj_data.shadowSize);

          paramsWindow.connectStateChange();
          userInfo.newState();

          document.cookie = "username=" + username;
          document.cookie = "password=" + password;

          ConnectWindow.prototype.close();
        }
      }
    );
  },
  logout: function() {
    if (connected) {
      connected = false;
      user.username = "";
      user.email = "";
      paramsWindow.connectStateChange();
      userInfo.newState();
    }
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
      if (JSON.stringify(pos) === JSON.stringify(parent[i]) || pos == {
          x: 0,
          y: 0
        })
        exist = true;

    return exist;
  },
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
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
