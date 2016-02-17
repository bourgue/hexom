// PARAMS WINDOW
var backgroundColor = "#a60000";
var shadowColor = "#000000";
var shadowSize = "200";

//PARAMS WINDOW HEXA
var hexa_id;
var posInArray;
var hexaColor;
var hexaLink;
var hexaImg;

var keyMiniSize = 4;

var params = false;
var paramsMenuOpen = false;

var connected = false;

var around = [
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: -1, y: 1},
  {x: -1, y: 0}
];

var previewing = false;
var editing = false;
var modifying = false;
var registring = false;

var tmp_hover;

var inputMaxLength = 20;
var inputMinLength = 5;

var user = new User();
var langManager = new LangManager();
var userInfo = new UserInfo();
var tools = new Tools();
var properties = new Properties();
var search = new Search();
var grid = new Grid();
var paramsWindow = new ParamsWindow();
var paramsMenu = new ParamsMenu();
var news = new News();

if(Cookies.get('username')){
  tools.login(Cookies.get('username'), Cookies.get('password'));
}

var fadeSpeed = 500;

var user;

$("#grid,#searchBar").css({
  "opacity": "0",
  "top": "+=40px"
}).animate({
  top: '-=40px',
  opacity: '1'
}, 1000);

langManager.setLanguage();

//Get mouse position
var mouse = {x:0,y:0};
$(document).mousedown(function (e) {
  mouse = {x: e.pageX, y: e.pageY};
});

//Ferme ParamsMenu quand on clique
$("body").click(function(handler){
  if(handler.target.id != "0;0")
    paramsMenu.close();
});

$(window).resize(function() {
  grid.changePos();
});
