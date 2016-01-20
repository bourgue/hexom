var margin = 10;
var scale = 1;

var size = [100*scale,Math.round(Math.sqrt((100*scale)*(100*scale) + (58*scale) * (58*scale)) * 100) / 100];

var phpConnect = "res/php/connect.php";
var phpSend = "res/php/newProperties.php";

var key = "megusta";
var keySize = 3;

var contents;

var positions = [];
var colors = [];
var links = [];

var gridPos = [window.innerWidth/2,window.innerHeight/2];

var grid_div = document.getElementById("grid");

var params = false;
var around = [[-1,-1],[0,-1],[1,0],
			  [0,1],[-1,1],[-1,0]];

var previewing = false;
var editing = false;

var tmp_hover;

$.getScript('res/js/script.js');
$.getScript('res/js/Hexagon.js');
$.getScript('res/js/ParamsWindow.js');
$.getScript('res/js/ParamsWindowHexa.js');