function ParamsWindowHexa(id){
	editing = true;
	hexa_id = id;
	posInArray = tools.getPosInArrays(tools.idToArray(hexa_id));
	hexaColor = grid.hexagons.colors[posInArray];
	hexaLink = grid.hexagons.links[posInArray];

	$("body").prepend('<div id="paramsWindowHexa" class="unselectable">' +
		'<span id="dragIcon" class="ui-icon ui-icon-arrow-4"></span>' +
		'<div class="titre">Paramètres de l\'hexagone</div>' +
	 	'<ul>' +
	 	'<li>' + 'Lien :<input id="url" type="text" value="'+ hexaLink +'"/>' + '</li>' +
	 	'<li>' + 'Couleur de fond :<input id="colorHexa" type="color" value="'+ hexaColor + '" onchange="ParamsWindowHexa.prototype.colorChange(this.value);"/>' + '</li>' +
	 	'<li>' + '<div id="deleteButton" class="button" onclick="ParamsWindowHexa.prototype.deleteHexa();">SUPPRIMER</div><div id="okButton" class="button" onclick="ParamsWindowHexa.prototype.submit()">OK</div>' + '</li>' +
		'</ul>' +
		'</div>');

	$("#paramsWindowHexa" ).draggable({ containment: "body", scroll:false });
	//Met la GUI a coté de paramsWindow
	$("#paramsWindowHexa").css('left', parseInt($("#paramsWindow").css('width')) + parseInt($("#paramsWindow").css('padding-left'))*2);
}

ParamsWindowHexa.prototype = {
	constructor: ParamsWindowHexa,
	close: function(){
		$("#paramsWindowHexa").remove();
	},
	colorChange: function(value){
		document.getElementById(hexa_id).style.background = value;
		hexaColor = value;
	},
	deleteHexa: function(){
		document.getElementById(hexa_id).remove();
		grid.hexagons.positions.splice(posInArray, 1);
		grid.hexagons.colors.splice(posInArray, 1);
		grid.hexagons.links.splice(posInArray, 1);
		redraw();
		editing = false;
		closeParamsWindowHexa();
	},
	submit: function(){
		editing = false;
		grid.hexagons.colors[posInArray] = hexaColor;
		grid.hexagons.links[posInArray] = $("#url").val();
		grid.redraw();
		this.close();
	}
}