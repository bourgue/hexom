function ParamsWindow() {
  $("body").prepend('<div id="paramsWindow" class="window unselectable">' +
    '<span id="closeIcon" class="close"></span>' +
    '<div class="titre" id="paramsTitle"></div>' +
    '<ul id="paramsList">' +
    '<li>' + '<div id="lang"></div>' + '<div id="flagContainer"><img src="res/img/us.png" id="en" class="flag" onclick="ParamsWindow.prototype.languageChange(this.id);" />' + '<img src="res/img/fr.png" class="flag" id="fr" onclick="ParamsWindow.prototype.languageChange(this.id);"/></div>' + '</li>' +
    '<li>' + '<div id="backcolor"></div>' + '<input id="backgroundColor" type="color" onchange="ParamsWindow.prototype.backgroundColorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="shadowcolor"></div>' + '<input id="shadowColor" type="color" onchange="ParamsWindow.prototype.shadowColorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="shadowsize"></div>' + '<input id="shadowSize" value="200" max="300" min="0" step="25" type="range" onchange="ParamsWindow.prototype.shadowSizeChange(this.value)"/>' + '</li>' +
    '</ul>' +
    '</div>');

  $("#paramsWindow").draggable({
    containment: "body",
    scroll: false,
    handle: "#paramsTitle"
  });

  $("#paramsWindow").hide();

  $("#closeIcon").click(function() {
    ParamsWindow.prototype.close();
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
  }
};
