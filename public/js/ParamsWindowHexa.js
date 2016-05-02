function ParamsWindowHexa(id) {
  editing = true;
  hexa_id = id;
  hexagon = tools.getHexagon(hexa_id, grid.hexagons);
  hexaColor = hexagon.color;
  hexaLink = hexagon.link;
  hexaImg = hexagon.image;
  hexaImgSize = hexagon.imgSize;

  $("body").prepend('<div id="paramsWindowHexa" class="window unselectable">' +
    '<span id="closeIcon" class="close glyphicon glyphicon-remove"></span>' +
    '<div class="titre" id="paramsHexaTitle"></div>' +
    '<ul>' +
    '<li>' + '<div id="link"></div>' + '<input id="url" type="text" value="' + hexaLink + '" placeholder="ex: google.fr" autofocus/>' + '</li>' +
    '<li>' + '<div id="img"></div>' + '<input id="urlImg" type="text" value="' + hexaImg + '" placeholder="ex: url.com/image.png" oninput="ParamsWindowHexa.prototype.imgChange(this.value);" autofocus/>' + '</li>' +
    '<li>' + '<div id="imgSize"></div>' + '<input id="imgSize" value="' + hexaImgSize + '" max="180" min="20" step="20" type="range" oninput="ParamsWindowHexa.prototype.imgSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="backcolorhexa"></div>' + '<input id="colorHexa" type="color" value="' + hexaColor + '" oninput="ParamsWindowHexa.prototype.colorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="deleteButton" class="button" onclick="ParamsWindowHexa.prototype.deleteHexa();"></div>' + '</li>' +
    '<li>' + '<div id="okButton" class="button" onclick="ParamsWindowHexa.prototype.submit()"></div>' + '</li>' +
    '</ul>' +
    '</div>');
  langManager.setLanguage();

  $("#paramsWindowHexa").draggable({
    containment: "body",
    scroll: false,
    handle: "#paramsHexaTitle"
  });

  $("#url").focus();

  $("#closeIcon").click(function() {
    ParamsWindowHexa.prototype.close();
  });
}

ParamsWindowHexa.prototype = {
  constructor: ParamsWindowHexa,
  close: function() {
    $("#paramsWindowHexa").fadeOut(fadeSpeed, function() {
      $("#paramsWindowHexa").remove();
      modifying = false;
      editing = false;
    });
  },
  imgChange: function(value) {
    $("#" + hexa_id + ".hex-in2").css("background-image", 'url("' + value + '")');
    $("#" + hexa_id + ".hex-in2").css("background-size", hexaImgSize + 'px');
    hexaImg = value;
  },
  imgSizeChange: function(value) {
    $("#" + hexa_id + ".hex-in2").css("background-size", value + 'px');
    hexaImgSize = value;
  },
  colorChange: function(value) {
    $("#" + hexa_id + ".hex-in2").css("background-color", value);
    hexaColor = value;
  },
  deleteHexa: function() {
    $('#' + hexa_id).remove();
    grid.hexagons.splice(hexa_id, 1);
    editing = false;
    modifying = false;
    this.close();
    tools.save();
  },
  submit: function() {
    editing = false;
    modifying = false;
    hexagon.color = hexaColor;
    hexagon.link = $("#url").val();
    hexagon.image = $("#urlImg").val();
    hexagon.imgSize = hexaImgSize;
    tools.save();
    this.close();
  }
};
