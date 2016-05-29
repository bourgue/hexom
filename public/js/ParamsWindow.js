function ParamsWindow() {
  $("body").prepend('<div id="paramsWindow" class="window unselectable">' +
    '<img src="/img/close.png" id="closeIcon" class="close"/>' +
    '<div class="titre" id="paramsTitle"></div>' +
    '<ul id="paramsList">' +
    '<li>' + '<div id="lang"></div>' + '<div id="flagContainer"><img src="/img/us.png" id="en" class="flag" onclick="ParamsWindow.prototype.languageChange(this.id);" />' + '<img src="/img/fr.png" class="flag" id="fr" onclick="ParamsWindow.prototype.languageChange(this.id);"/></div>' + '</li>' +
    '<li>' + '<p id="bg_grp" class="subtitle" onclick="ParamsWindow.prototype.clickOnSubtitle(this)"></p>' + '</li>' +
    '<div class="group" id="bg_grp"><li>' + '<div id="backColor"></div>' + '<div id="colorIpt_container"><input id="backgroundColor_ipt" class="jscolor {onFineChange:\'ParamsWindow.prototype.backgroundColorChange(this);\', uppercase:false, hash:true}"/>' + '<input id="backgroundColor2_ipt" class="jscolor {onFineChange:\'ParamsWindow.prototype.backgroundColor2Change(this);\', uppercase:false, hash:true}"/></div>' + '</li>' +
    '<li>' + '<div id="gradientSize"></div>' + '<input id="gradientSize_ipt" value="200" max="300" min="0" step="2" type="range" oninput="ParamsWindow.prototype.gradientSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="backImg"></div><img src="/img/loader.gif" id="loadImg" style="position:absolute;right:15px;transform:translateY(-20px);display:none;">' + '<input id="backImg_ipt" name="backImg_ipt" type="text" maxLength="250" value="' + backImg + '" placeholder="ex: url.com/image.png" oninput="ParamsWindow.prototype.backImgChange(htmlEncode(this.value));"/>' + '</li>' +
    '<li>' + '<input type="file" accept="image/*" id="inputFile" onchange="ParamsWindow.prototype.uploadImg()"><label for="inputFile" id="uploadButton" class="button"></label>' + '</li>' +
    '<li>' + '<input type="checkbox" id="centerBack_cb" name="centerBack_cb" onchange="ParamsWindow.prototype.centerBackChange()" style="width:20px; display:inline;"><label for="centerBack_cb" id="centerBack" style="display:inline;font-weight:normal;"></label>' + '</li>' +
    '<li>' + '<input type="checkbox" id="repeatBack_cb" name="repeatBack_cb" onchange="ParamsWindow.prototype.repeatBackChange()" style="width:20px; display:inline;"><label for="repeatBack_cb" id="repeatBack" style="display:inline;font-weight:normal;"></label>' + '</li>' +
    '<li>' + '<input type="checkbox" id="ajustBack_cb" name="ajustBack_cb" onchange="ParamsWindow.prototype.ajustBackChange()" style="width:20px; display:inline;"><label for="ajustBack_cb" id="ajustBack" style="display:inline;font-weight:normal;"></label>' + '</li></div>' +
    '<li>' + '<p id="hexa_grp" class="subtitle" onclick="ParamsWindow.prototype.clickOnSubtitle(this)"></p>' + '</li>' +
    '<div class="group" id="hexa_grp"><li>' + '<div id="hexaSize"></div>' + '<input id="hexaSize_ipt" value="1" max="3" min="0.4" step="0.02" type="range" oninput="ParamsWindow.prototype.hexaSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="marginSize"></div>' + '<input id="marginSize_ipt" value="10" max="200" min="0" step="2" type="range" oninput="ParamsWindow.prototype.marginSizeChange(this.value)"/>' + '</li></div>' +
    '<li>' + '<p id="search_grp" class="subtitle" onclick="ParamsWindow.prototype.clickOnSubtitle(this)"></p>' + '</li>' +
    '<div class="group" id="search_grp"><li>' + '<input type="checkbox" id="showSearchBar_cb" name="showSearchBar_cb" onchange="ParamsWindow.prototype.showSearchBarChange()" style="width:20px; display:inline;"><label for="showSearchBar_cb" id="showSearchBar" style="display:inline;font-weight:normal;"></label>' + '</li>' +
    '<li>' + '<div id="searchPos"></div>' + '<input id="searchPos_ipt" value="10" max="100" min="0" step="0.5" type="range" oninput="ParamsWindow.prototype.searchPosChange(this.value)"/>' + '</li></div>' +
    '<li>' + '<p id="importExport_grp" class="subtitle" onclick="ParamsWindow.prototype.clickOnSubtitle(this)"></p>' + '</li>' +
    '<div class="group" id="importExport_grp">' + '<li>' + '<div id="import"></div>' + '<input type="text" id="import_ipt" oninput="ParamsWindow.prototype.import(this.value)"/>' + '<div id="codeError"></div>' + '</li>' +
    '<li>' + '<div id="export"></div>' + '<p id="export_p"></p>' + '</li>' +
    '<li>' + '<div id="exportButton" class="button" onclick="ParamsWindow.prototype.export()"></div>' + '</li></div>' +
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
    $("#paramsWindow").fadeOut(fadeSpeed, function() {
      $(".group").css({
        "display": "none"
      });
      $(".subtitle").attr({
        "class": "subtitle"
      });
    });
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
    var val = value.toHEXString();
    $("body").css('background-color', val);
    backgroundColor = val.toLowerCase();
  },
  backgroundColor2Change: function(value) {
    var val = value.toHEXString();
    $("body").css('box-shadow', '0 0 ' + gradientSize + 'px ' + val + ' inset');
    backgroundColor2 = val.toLowerCase();
  },
  backImgChange: function(value) {
    $("body").css('background-image', 'url(' + value + ')');
    backImg = value;
    this.centerBackChange();
    this.repeatBackChange();
    this.ajustBackChange();
  },
  uploadImg: function() {
    tools.uploadImg(document.getElementById("inputFile").files[0], true);
  },
  clickOnSubtitle: function(subtitle) {
    $('.group:not(#' + subtitle.id + ')').slideUp(500);
    $(".subtitle").attr({
      "class": "subtitle"
    });
    if ($('#' + subtitle.id + ".group").css("display") == "block") {
      $('#' + subtitle.id + ".group").slideUp(500);
    } else {

      if (subtitle.id == "importExport_grp") {
        $("#import_ipt").val("");
        $("#codeError").hide();
        $("#export_p").text(JSON.stringify(tools.getActualInfos()));
      }

      $('#' + subtitle.id + ".group").slideDown(500);
      $('#' + subtitle.id + ".subtitle").attr({
        "class": "subtitle selected"
      });
    }
  },
  centerBackChange: function() {
    if ($('#centerBack_cb').is(":checked")) {
      $("body").css('background-position', 'center');
      centerBack = true;
    } else {
      $("body").css('background-position', 'left top');
      centerBack = false;
    }
  },
  repeatBackChange: function() {
    if ($('#repeatBack_cb').is(":checked")) {
      $("body").css('background-repeat', 'repeat');
      repeatBack = true;
    } else {
      $("body").css('background-repeat', 'no-repeat');
      repeatBack = false;
    }
  },
  ajustBackChange: function() {
    if ($('#ajustBack_cb').is(":checked")) {
      $("body").css('background-size', 'cover');
      ajustBack = true;
    } else {
      $("body").css('background-size', 'auto');
      ajustBack = false;
    }
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
  searchPosChange: function(value) {
    $("#searchBar").css('top', 'calc(' + value + '% - 25px)');
    searchPos = value;
  },
  undoModifications: function() {
    init(username, dataFromDB.infos);

    this.close();
  },
  export: function() {
    tools.copyTextToClipboard($("#export_p").text());
  },
  import: function(code) {
    if (tools.isJsonCorrect(code) && tools.isJsonCorrect(JSON.parse(code).hexagons)) {
      init(username, tools.setInfosValid(code));
      $("#export_p").html(JSON.stringify(tools.setInfosValid(code)));
      $("#codeError").slideUp(180);
    } else {
      if (code.length > 0)
        $("#codeError").slideDown(180);
      else
        $("#codeError").slideUp(180);
    }
  },
  submit: function() {
    tools.save();
    this.close();
  }
};
