var hexa_id;
var posInArray;
var hexaColor;
var hexaLink;

function paramsWindowHexa(id){
	editing = true;
	hexa_id = id;
	posInArray = getPosInArrays(idToArray(hexa_id));
	hexaColor = colors[posInArray];
	hexaLink = links[posInArray];

	$("body").prepend('<div id="paramsWindowHexa" class="unselectable">' +
		'<span id="dragIcon" class="ui-icon ui-icon-arrow-4"></span>' +
		'<div class="titre">Paramètres de l\'hexagone</div>' +
	 	'<ul>' +
	 	'<li>' + 'Lien :<input id="url" type="text" value="'+ hexaLink +'"/>' + '</li>' +
	 	'<li>' + 'Couleur de fond :<input id="colorHexa" type="color" value="'+ hexaColor + '" onchange="colorHexaChange(this.value);"/>' + '</li>' +
	 	'<li>' + '<div id="deleteButton" class="button" onclick="deleteHexa();">SUPPRIMER</div><div id="okButton" class="button" onclick="submit();">OK</div>' + '</li>' +
		'</ul>' +
		'</div>');

	$("#paramsWindowHexa" ).draggable({ containment: "body", scroll:false });
	//Met la GUI a coté de paramsWindow
	$("#paramsWindowHexa").css('left', parseInt($("#paramsWindow").css('width')) + parseInt($("#paramsWindow").css('padding-left'))*2);
}

function closeParamsWindowHexa(){
	$("#paramsWindowHexa").remove();
}

function colorHexaChange(value){
	document.getElementById(hexa_id).style.background = value;
	hexaColor = value;
}

function deleteHexa(){
	document.getElementById(hexa_id).remove();
	positions.splice(posInArray, 1);
	colors.splice(posInArray, 1);
	links.splice(posInArray, 1);
	redraw();
	editing = false;
	closeParamsWindowHexa();
}

function submit(){
	editing = false;
	colors[posInArray] = hexaColor;
	links[posInArray] = $("#url").val();
	console.log(links);
	redraw();
	closeParamsWindowHexa();
}