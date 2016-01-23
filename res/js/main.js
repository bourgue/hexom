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

//PHP FILES
var phpConnect = "res/php/connect.php";
var phpSend = "res/php/newProperties.php";

var keyMiniSize = 4;

var params = false;

var around = [[-1,-1],[0,-1],[1,0],
			  [0,1],[-1,1],[-1,0]];

var previewing = false;
var editing = false;

var tmp_hover;

var tools = new Tools();
var properties = new Properties();
var paramsWindow = new ParamsWindow();
var grid = new Grid();

window.addEventListener('resize', grid.redraw, false);