// PARAMS WINDOW
var backgroundColor;
var shadowColor;
var shadowSize;

//PARAMS WINDOW HEXA
var hexa_id;
var posInArray;
var hexaColor;
var hexaLink;
var hexaImg;

var params = false;
var paramsMenuOpen = false;

var around = [{
  x: -1,
  y: -1
}, {
  x: 0,
  y: -1
}, {
  x: 1,
  y: 0
}, {
  x: 0,
  y: 1
}, {
  x: -1,
  y: 1
}, {
  x: -1,
  y: 0
}];

var previewing = false;
var editing = false;
var modifying = false;

var tmp_hover;

var inputMaxLength = 20;
var inputMinLength = 5;

var username;

var langManager = new LangManager();
var search = new Search();
var tools = new Tools();
var paramsWindow = new ParamsWindow();
var paramsMenu = new ParamsMenu();
var grid = new Grid();

var fadeSpeed = 500;

$("#grid,#searchBar").css({
  "opacity": "0",
  "top": "+=40px"
}).animate({
  top: '-=40px',
  opacity: '1'
}, 1000);

function init(username, data) {
  username = username;
  backgroundColor = data.bg_color;
  shadowColor = data.shadow_color;
  shadowSize = data.shadow_size;
  grid.scale = data.hexa_size;

  $("body").css({
    boxShadow: '0 0 ' + shadowSize + 'px ' + shadowColor + ' inset',
    backgroundColor: backgroundColor
  });

  $("#backgroundColor_ipt").val(backgroundColor);
  $("#shadowColor_ipt").val(shadowColor);
  $("#shadowSize_ipt").val(shadowSize);
  $("#hexaSize_ipt").val(grid.scale);


  grid.update(data);

  langManager.language = data.lang;
  langManager.setLanguage();
}

var mouse = {
  x: 0,
  y: 0
};
$(document).mousedown(function(e) {
  mouse = {
    x: e.pageX,
    y: e.pageY
  };
});

$("body").click(function(handler) {
  if (handler.target.id != "0")
    if (handler.target.classList[0] != "glyphicon")
      paramsMenu.close();
});

$(window).resize(function() {
  grid.updateHexaPosition();
});
