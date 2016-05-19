// PARAMS WINDOW
var backgroundColor;
var backgroundColor2;
var gradientSize;
var showSearchBar;
var searchPos;
var backImg;
var centerBack;
var repeatBack;
var ajustBack;

//PARAMS WINDOW HEXA
var hexa_id;
var posInArray;
var hexaColor;
var hexaLink;
var hexaImg;

var params = false;
var paramsMenuOpen = false;

var dataFromDB = {};

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

var fadeSpeed = 150;


function init(username, data) {
  username = username;
  backgroundColor = data.bg_color || "#e10000";
  backgroundColor2 = data.bg_color2 || "#670000";
  gradientSize = data.gradient_size || 300;
  grid.scale = data.hexa_size || 1;
  backImg = data.back_img || "";

  if(data.center_bg !== false) centerBack = true;
  else centerBack = false;

  if(data.repeat_bg !== false) repeatBack = true;
  else repeatBack = false;

  if(data.ajust_bg !== false) ajustBack = true;
  else ajustBack = false;

  if(data.show_searchbar !== false) showSearchBar = true;
  else showSearchBar = false;

  if(data.hexa_margin !== 0) grid.hexagonsMargin = data.hexa_margin || 10;
  else grid.hexagonsMargin = data.hexa_margin;

  if(data.search_pos !== 0) searchPos = data.search_pos || 10;
  else searchPos = data.search_pos;

  $("body").css({
    boxShadow: '0 0 ' + gradientSize + 'px ' + backgroundColor2 + ' inset',
    backgroundColor: backgroundColor
  });

  $("#backgroundColor_ipt").val(backgroundColor);
  $("#backgroundColor2_ipt").val(backgroundColor2);
  $("#gradientSize_ipt").val(gradientSize);
  $("#hexaSize_ipt").val(grid.scale);
  $("#marginSize_ipt").val(grid.hexagonsMargin);
  $("#centerBack_cb").attr('checked', centerBack);
  $("#repeatBack_cb").attr('checked', repeatBack);
  $("#ajustBack_cb").attr('checked', ajustBack);
  $("#showSearchBar_cb").attr('checked', showSearchBar);
  $("#searchPos_ipt").val(searchPos);
  $("#backImg_ipt").val(backImg);

  paramsWindow.backImgChange(backImg);

  dataFromDB.infos = data;

  grid.update(data);
  search.update();

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
    if (handler.target.classList[0] != "textHexa")
      paramsMenu.close();
});

$(window).resize(function() {
  grid.updateHexaPosition();
});

function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
