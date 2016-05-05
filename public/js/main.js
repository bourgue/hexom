// PARAMS WINDOW
var backgroundColor;
var backgroundColor2;
var gradientSize;

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
  backgroundColor = data.bg_color || "#e10000";
  backgroundColor2 = data.bg_color2 || "#670000";
  gradientSize = data.gradient_size || 300;
  grid.scale = data.hexa_size || 1;
  
  if(data.hexa_margin !== 0) grid.hexagonsMargin = data.hexa_margin || 10;
  else grid.hexagonsMargin = data.hexa_margin;

  $("body").css({
    boxShadow: '0 0 ' + gradientSize + 'px ' + backgroundColor2 + ' inset',
    backgroundColor: backgroundColor
  });

  $("#backgroundColor_ipt").val(backgroundColor);
  $("#backgroundColor2_ipt").val(backgroundColor2);
  $("#gradientSize_ipt").val(gradientSize);
  $("#hexaSize_ipt").val(grid.scale);
  $("#marginSize_ipt").val(grid.hexagonsMargin);

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
