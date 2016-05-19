function ParamsWindowHexa(id) {
  editing = true;
  hexa_id = id;
  hexagon = tools.getHexagon(hexa_id, grid.hexagons);
  hexaColor = hexagon.color;
  hexaLink = hexagon.link;
  hexaText = hexagon.text;
  hexaTextColor = hexagon.textColor;
  hexaImg = hexagon.image;
  hexaImgSize = hexagon.imgSize;

  $("body").prepend('<div id="paramsWindowHexa" class="window unselectable" style="display:none;">' +
    '<img src="/img/close.png" id="closeIcon" class="close"/>' +
    '<div class="titre" id="paramsHexaTitle"></div>' +
    '<ul>' +
    '<li>' + '<div id="link"></div>' + '<input id="url" type="text" value="' + hexaLink + '" maxLength=200 placeholder="ex: google.fr" autofocus/>' + '</li>' +
    '<li>' + '<p id="text_title" class="subtitle"></p>' + '</li>'+
    '<li>' + '<div id="text"></div>' + '<input id="text_ipt" type="text" value="' + hexaText + '" maxLength=30 placeholder="ex: Google" oninput="ParamsWindowHexa.prototype.textChange(htmlEncode(this.value))"/>' + '</li>' +
    '<li>' + '<div id="textColor"></div>' + '<input id="textColor_ipt" value="' + hexaTextColor + '" class="jscolor {onFineChange:\'ParamsWindowHexa.prototype.textColorChange(this);\', uppercase:false, hash:true}"/>' + '</li>' +
    '<li>' + '<p id="bg_title" class="subtitle"></p>' + '</li>'+
    '<li>' + '<div id="backcolorhexa"></div>' + '<input id="colorHexa" value="' + hexaColor + '" class="jscolor {onFineChange:\'ParamsWindowHexa.prototype.colorChange(this);\', uppercase:false, hash:true}"/>' + '</li>' +
    '<li>' + '<div id="img"></div><img src="/img/loader.gif" id="loadImg" maxLength=250 style="position:absolute;right:15px;transform:translateY(-20px);display:none;">' + '<input id="urlImg" name="imgInput" type="text" value="' + hexaImg + '" placeholder="ex: url.com/image.png" oninput="ParamsWindowHexa.prototype.imgChange(htmlEncode(this.value));"/>' + '</li>' +
    '<li>' + '<input type="file" accept="image/*" id="inputFile" onchange="ParamsWindowHexa.prototype.uploadImg()"><label for="inputFile" id="uploadButton" class="button"></label>' + '</li>' +
    '<li>' + '<div id="imgSize"></div>' + '<input id="imgSize" value="' + hexaImgSize + '" max="400" min="8" step="2" type="range" oninput="ParamsWindowHexa.prototype.imgSizeChange(htmlEncode(this.value))"/>' + '</li>' +
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
    ParamsWindowHexa.prototype.undoModifications();
  });

  $("#paramsWindowHexa").fadeIn(fadeSpeed);

  jscolor.installByClassName("jscolor");
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
  textChange: function(value){
    $("#" + hexa_id + " .textHexa").html(value);
    hexaText = value;
  },
  textColorChange: function(value){
    var val = value.toHEXString();
    $("#" + hexa_id + " .textHexa").css("color", val);
    hexaTextColor = val;
  },
  colorChange: function(value) {
    var val = value.toHEXString();
    $("#" + hexa_id + ".hex-in2").css("background-color", val);
    hexaColor = val;
  },
  deleteHexa: function() {
    $('#' + hexa_id).remove();
    grid.hexagons.splice(hexa_id, 1);
    editing = false;
    modifying = false;
    this.close();
    tools.save();
  },
  uploadImg: function() {
    tools.uploadImg(document.getElementById("inputFile").files[0], false);
  },
  undoModifications: function() {
    init(username, dataFromDB.infos);

    this.close();
  },
  submit: function() {
    editing = false;
    modifying = false;
    hexagon.color = hexaColor;
    hexagon.link = $("#url").val();
    hexagon.text = hexaText;
    hexagon.textColor = hexaTextColor;
    hexagon.image = $("#urlImg").val();
    hexagon.imgSize = hexaImgSize;
    tools.save();
    this.close();
  }
};
