function ParamsWindow() {
  $("body").prepend('<div id="paramsWindow" class="window unselectable">' +
    '<span id="closeIcon" class="ui-icon ui-icon-close"></span>' +
    '<div class="titre" id="paramsTitle"></div>' +
    '<ul id="paramsList">' +
    '<li>' + '<div id="lang"></div>' + '<div id="flagContainer"><img src="res/img/us.png" id="en" class="flag" onclick="ParamsWindow.prototype.languageChange(this.id);" />' + '<img src="res/img/fr.png" class="flag" id="fr" onclick="ParamsWindow.prototype.languageChange(this.id);"/></div>' + '</li>' +
    '<li>' + '<div id="backcolor"></div>' + '<input id="backgroundColor" type="color" onchange="ParamsWindow.prototype.backgroundColorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="shadowcolor"></div>' + '<input id="shadowColor" type="color" onchange="ParamsWindow.prototype.shadowColorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="shadowsize"></div>' + '<input id="shadowSize" value="200" max="300" min="0" step="25" type="range" onchange="ParamsWindow.prototype.shadowSizeChange(this.value)"/>' + '</li>' +
    //'<li>' + '<div id="hexasize"></div>' + '<input id="hexaSize" value="1" max="2" min="0.8" step="0.2" type="range" onchange="ParamsWindow.prototype.hexaSizeChange(this.value)"/>' + '</li>' +
    //'<li>' + '<div id="hexaop"></div>' + '<input id="hexaOpacity" value="0.4" max="1" min="0.4" step="0.05" type="range" onchange="ParamsWindow.prototype.hexaOpacityChange(this.value)"/>' +
    //'<input id="hexaOpacityHover" value="1" max="1" min="0.1" step="0.1" type="range" onchange="ParamsWindow.prototype.hexaOpacityHoverChange(this.value)"/>' + '</li>' +
    //'<li>' + '<div id="gSignInWrapper"><div id="customBtn" class="customGPlusSignIn"><div id="savetext"></div><img src="res/img/google.png" id="googleLogo"/></div></div>' + '</li>' +
    //'<li>' + '<a href="#" onclick="ParamsWindow.prototype.signOut();">Sign out</a>' + '</li>' +
    '<li>' + '<div class="button" id="connectButton" onclick="ParamsWindow.prototype.connect()"></div>' + '</li>' +
    '<li>' + '<div class="button" id="register"></div>' + '</li>' +
    //'<li style="margin-bottom: 0;">' + '<div class="button" id="saveButton" onclick="ParamsWindow.prototype.save();"></div>' + '</li>' +
    '</ul>' +
    '</div>');

  $("#paramsWindow").draggable({
    containment: "body",
    scroll: false
  });

  $("#paramsWindow").hide();

  $("#closeIcon").click(function() {
    ParamsWindow.prototype.close();
  });

  $("#register").click(function() {
    if (!registring) {
      var registerWindow = new RegisterWindow();
      registring = true;
    }
  });
}

ParamsWindow.prototype = {
  constructor: ParamsWindow,
  close: function() {
    $("#paramsWindow").fadeOut(fadeSpeed);
    params = false;
  },
  open: function() {
    $("#paramsWindow").fadeIn(fadeSpeed);
    params = true;
  },
  languageChange: function(lang) {
    langManager.language = lang;
    langManager.setLanguage();
  },
  backgroundColorChange: function(value) {
    $("body").css('background', value);
    backgroundColor = value;
  },
  shadowColorChange: function(value) {
    $("body").css('box-shadow', '0 0 ' + shadowSize + 'px ' + value + ' inset');
    shadowColor = value;
  },
  shadowSizeChange: function(value) {
    $("body").css('box-shadow', '0 0 ' + value + 'px ' + shadowColor + ' inset');
    shadowSize = value;
  },
  connect: function() {
    var connectWindow = new ConnectWindow();
  }

  //-----EN ATTENDANT LA BDD-----//

  /*  getShadowSize: function(css) {
      var i = 0;
      var j = 0;
      var size = "";
      while (i < 6) {
        if (i == 5)
          size += css[j];
        if (css[j] == ' ')
          i++;
        j++;
      }

      return size;
    },

    getShadowColor: function(css) {
      var i = 0;
      var j = 0;
      var color = "";
      while (i < 7) {
        if (i === 0 || i == 1 || i == 2)
          color += css[j];
        if (css[j] == ' ')
          i++;
        j++;
      }

      return color;
    }*/
};
