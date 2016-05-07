function ParamsWindow() {
  $("body").prepend('<div id="paramsWindow" class="window unselectable">' +
    '<span id="closeIcon" class="close glyphicon glyphicon-remove"></span>' +
    '<div class="titre" id="paramsTitle"></div>' +
    '<ul id="paramsList">' +
    '<li>' + '<div id="lang"></div>' + '<div id="flagContainer"><img src="/img/us.png" id="en" class="flag" onclick="ParamsWindow.prototype.languageChange(this.id);" />' + '<img src="/img/fr.png" class="flag" id="fr" onclick="ParamsWindow.prototype.languageChange(this.id);"/></div>' + '</li>' +
    '<li>' + '<div id="backColor"></div>' + '<div id="colorIpt_container"><input id="backgroundColor_ipt" type="color" oninput="ParamsWindow.prototype.backgroundColorChange(this.value);"/>' + '<input id="backgroundColor2_ipt" type="color" oninput="ParamsWindow.prototype.backgroundColor2Change(this.value);"/></div>' + '</li>' +
    '<li>' + '<div id="gradientSize"></div>' + '<input id="gradientSize_ipt" value="200" max="300" min="0" step="25" type="range" oninput="ParamsWindow.prototype.gradientSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="hexaSize"></div>' + '<input id="hexaSize_ipt" value="1" max="2" min="0.4" step="0.2" type="range" oninput="ParamsWindow.prototype.hexaSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="marginSize"></div>' + '<input id="marginSize_ipt" value="10" max="200" min="0" step="5" type="range" oninput="ParamsWindow.prototype.marginSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<input type="checkbox" id="showSearchBar_cb" name="showSearchBar_cb" onchange="ParamsWindow.prototype.showSearchBarChange()" style="width:20px; display:inline;"><label for="showSearchBar_cb" id="showSearchBar" style="display:inline;font-weight:normal;"></label>' + '</li>' +
    '<li>' + '<div id="paramsSubmitButton" class="button" onclick="ParamsWindow.prototype.submit()"></div>' + '</li>' +
    '</ul>' +
    '</div>');

  $("#paramsWindow").draggable({
    containment: "body",
    scroll: false,
    handle: "#paramsTitle"
  });

  $("#paramsWindow").hide();

  $("#closeIcon").click(function() {
    ParamsWindow.prototype.undoModifications();
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
  backgroundColor2Change: function(value) {
    $("body").css('box-shadow', '0 0 ' + gradientSize + 'px ' + value + ' inset');
    backgroundColor2 = value;
  },
  gradientSizeChange: function(value) {
    $("body").css('box-shadow', '0 0 ' + value + 'px ' + backgroundColor2 + ' inset');
    gradientSize = value;
  },
  hexaSizeChange: function(value) {
    $(".hex, .preview").css('transform', 'rotate(120deg) scale(' + value + ')');
    grid.scale = value;
    grid.updateHexaPosition();
  },
  marginSizeChange: function(value) {
    grid.hexagonsMargin = value;
    grid.updateHexaPosition();
  },
  showSearchBarChange: function() {
    if ($('#showSearchBar_cb').is(":checked")) showSearchBar = true;
    else showSearchBar = false;

    search.update();
  },
  undoModifications: function() {
    init(username, dataFromDB.infos);

    this.close();
  },
  submit: function() {
    tools.save();
    this.close();
  }
};
