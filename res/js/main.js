// PARAMS WINDOW
var backgroundColor = "#ff0000";
var shadowColor = "#000000";
var shadowSize = "200";
var op = "0.4";
var opHover = "1";

//PARAMS WINDOW HEXA
var hexa_id;
var posInArray;
var hexaColor;
var hexaLink;
var hexaImg;

//PHP FILES
var phpConnect = "res/php/connect.php";
var phpSend = "res/php/newProperties.php";

var keyMiniSize = 4;

var params = false;

var around = [
  [-1, -1],
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0]
];

var previewing = false;
var editing = false;

var tmp_hover;




var langManager = new LangManager();
var tools = new Tools();
var properties = new Properties();
var search = new Search();
var grid = new Grid();
var paramsWindow = new ParamsWindow();

$("#grid,#searchBar").css({
  "opacity": "0",
  "top": "+=40px"
}).animate({
  top: '-=40px',
  opacity: '1'
}, 1000);

langManager.setLanguage();

$(window).resize(function() {
  grid.changePos();
});

//window.addEventListener('resize', grid.changePos, false);
