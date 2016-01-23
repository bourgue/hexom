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

var language = "us";

var langId = {
	"us":0,
	"fr":1
};

var words = {
	"PARAMS_GENE": 	["General settings :",	"Paramètres généraux :"],
	"CHANGE_LANG": 	["Change language :",	"Changer la langue :"],
	"BACK_COLOR": 	["Background color :", 	"Couleur de fond :"],
	"SHADOW_COLOR": ["Shadow color :", 		"Couleur de l\'ombre :"],
	"SHADOW_SIZE": 	["Shadow size :", 		"Taille de l\'ombre :"],
	"HEXA_SIZE": 	["Hexagons size :", 	"Taille des hexagones :"],
	"HEXA_OP": 		["Hexagons opacity :", 	"Opacité des hexagones :"],
	"SAVE_KEY": 	["Save key :", 			"Clé de sauvegarde :"],
	"CREATE": 		["CREATE", 				"CREER"],
	"IMPORT": 		["IMPORT", 				"IMPORTER"],
	"SAVE": 		["SAVE", 				"SAUVEGARDER"],
	"PARAMS_HEXA": 	["Hexagon settings :",	"Paramètres de l\'hexagone :"],
	"LINK": 		["Link :", 				"Lien :"],
	"BACKCOLORHEXA":["Background color :", 	"Couleur de fond :"],
	"DELETE": 		["DELETE", 				"SUPPRIMER"]
};

var langManager = new LangManager();
var tools = new Tools();
var properties = new Properties();
var paramsWindow = new ParamsWindow();
var grid = new Grid();

langManager.setLanguage();

window.addEventListener('resize', grid.redraw, false);