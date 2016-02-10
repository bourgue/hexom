function ParamsWindowHexa(id) {
  editing = true;
  hexa_id = id;
  posInArray = tools.getPosInArrays(tools.idToArray(hexa_id), grid.hexagons.positions);
  hexaColor = grid.hexagons.colors[posInArray];
  hexaLink = grid.hexagons.links[posInArray];

  $("body").prepend('<div id="paramsWindowHexa" class="unselectable">' +
    '<span id="dragIcon" class="ui-icon ui-icon-arrow-4"></span>' +
    '<div class="titre" id="paramsHexaTitle"></div>' +
    '<ul>' +
    '<li>' + '<div id="link"></div>' + '<input id="url" type="text" value="' + hexaLink + '" placeholder="ex: google.fr" autofocus/>' + '</li>' +
    '<li>' + '<div id="backcolorhexa"></div>' + '<input id="colorHexa" type="color" value="' + hexaColor + '" onchange="ParamsWindowHexa.prototype.colorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="deleteButton" class="button" onclick="ParamsWindowHexa.prototype.deleteHexa();"></div><div id="okButton" class="button" onclick="ParamsWindowHexa.prototype.submit()">OK</div>' + '</li>' +
    '</ul>' +
    '</div>');
  langManager.setLanguage();

  $("#paramsWindowHexa").draggable({
    containment: "body",
    scroll: false
  });
  //Met la GUI a coté de paramsWindow (width de paramsWindow + width de paramsWindowHexa)
  $("#paramsWindowHexa").css('left', parseInt($("#paramsWindow").css('width')) + parseInt($("#paramsWindow").css('padding-left')) * 2);
  $("#url").focus();
}

ParamsWindowHexa.prototype = {
  constructor: ParamsWindowHexa,
  close: function() {
    $("#paramsWindowHexa").remove();

  },
  colorChange: function(value) {
    document.getElementById(hexa_id).style.background = value;
    hexaColor = value;
  },
  deleteHexa: function() {
    document.getElementById(hexa_id).remove();
    grid.hexagons.positions.splice(posInArray, 1);
    grid.hexagons.colors.splice(posInArray, 1);
    grid.hexagons.links.splice(posInArray, 1);
    grid.addPreviewHexa();
    editing = false;
    this.close();
  },
  submit: function() {
    editing = false;
    grid.hexagons.colors[posInArray] = hexaColor;
    grid.hexagons.links[posInArray] = $("#url").val();
    grid.editHexa();
    this.close();
  }
};
