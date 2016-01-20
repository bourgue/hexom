var backgroundColor;
var shadowColor = "#000000";
var shadowSize = "200";
var op;
var opHover;

function paramsWindow(){
	$("body").prepend('<div id="paramsWindow" class="unselectable">' +
		'<span id="dragIcon" class="ui-icon ui-icon-arrow-4"></span>' +
		'<div class="titre ">Paramètres généraux</div>' +
	 	'<ul>' +
	 	'<li>' + 'Couleur de fond :<input id="backgroundColor" type="color" onchange="backgroundColorChange(this.value);"/>' + '</li>' +
		'<li>' + 'Couleur de l\'ombre :<input id="shadowColor" type="color" onchange="shadowColorChange(this.value);"/>' + '</li>' +
		'<li>' + 'Taille de l\'ombre : ' + '<input id="shadowSize" value="200" max="300" min="0" step="5" type="range" onchange="shadowSizeChange(this.value)"/>' + '</li>' +
		'<li>' + 'Taille des hexagones :' + '<input id="hexaSize" value="1" max="2" min="0.8" step="0.2" type="range" onchange="hexaSizeChange(this.value)"/>' + '</li>' +
		'<li>' + 'Opacité des hexagones :' + '<input id="hexaOpacity" value="0.4" max="1" min="0.1" step="0.1" type="range" onchange="hexaOpacityChange(this.value)"/>' +
		'<input id="hexaOpacityHover" value="1" max="1" min="0.1" step="0.1" type="range" onchange="hexaOpacityHoverChange(this.value)"/>' + '</li>' +
		'<li>' + 'Clé de sauvegarde :' + '<input id="key" type="text"/>' +
		'<div id="keyInfos">-</div>' + '</li>' +
		'<li>' + '<div class="button" id="newKey" onclick="newKeyClick();">CREER</div>' + '</li>' +
		'<li>' + '<div class="button" id="importButton">IMPORTER</div>' + '</li>' +
		'<li>' + '<div class="button" id="saveButton">SAUVEGARDER</div>' + '</li>' +
		'</ul>' +
		'</div>');

	$("#paramsWindow").draggable({ containment: "body", scroll:false });
}

function closeParamsWindow(){
	$("#paramsWindow").remove();
}

function backgroundColorChange(value){
	$("body").css('background', value);
	backgroundColor = value;
}

function shadowColorChange(value){
	$("body").css('box-shadow', '0 0 ' + shadowSize + 'px ' + value + ' inset');
	shadowColor = value;
}

function shadowSizeChange(value){
	$("body").css('box-shadow', '0 0 ' + value + 'px ' + shadowColor + ' inset');
	shadowSize = value;
}

function hexaSizeChange(value){
	scale = value;
	redraw();
}

function hexaOpacityChange(value){
	$(".hex").css('opacity', value);
	op = value;
}

function hexaOpacityHoverChange(value){
	$(".hex").mouseenter(function() { 
	    $(this).css("opacity", value);
	});
	$(".hex").mouseleave(function() { 
	    $(this).css("opacity", op);
	});
	opHover = value;
}

function keySuccess(message){
	
}

function keyFail(message){
	$("#keyInfos").html(message);
	$("#keyInfos").css('color', '#FF0000');
}

function newKeyClick(){
	var value = $("#key").val();
	if(value.length > keySize-1){
		sendProperties(value);
	}
	else{
		keyFail("La clé doit faire minimum " + keySize + " caractères.");
	}
}

//-----EN ATTENDANT LA BDD-----//

function getShadowSize(css){
	var i = 0;
	var j = 0;
	var size = "";
	while(i < 6){
		if(i == 5)
			size += css[j];
		if(css[j] == ' ')
			i++;
		j++;
	}

	return size;
}

function getShadowColor(css){
	var i = 0;
	var j = 0;
	var color = "";
	while(i < 7){
		if(i == 0 || i == 1 || i == 2)
			color += css[j];
		if(css[j] == ' ')
			i++;
		j++;
	}

	return color;
}
