// PreviewHexas are the white hexagons that you can see before creating a new "basic" hexagon

function PreviewHexa(id, position) {
  this.id = id;
  this.position = position;
  this.realPosition = tools.convertToRealPosition(position);

  $("#previewContainer").append('<div id="' + id + '"></div>');

  $('#' + id).attr({
      class: 'previewHexa',
      onclick: 'PreviewHexa.prototype.click(this)',
      style: 'transform:scale(' + grid.scale + ') rotate(120deg); left: ' + this.realPosition.x + 'px; top: ' + this.realPosition.y + 'px;'
    })
    .append('<div class="hex-in1" id="' + id + '"></div>');

  $('.previewHexa #' + id + '.hex-in1').append('<div class="hex-in2" id="' + id + '"></div>');
  $('.previewHexa .hex-in1 #' + id + '.hex-in2').attr({
      style: 'background-color:#ffffff;'
    })
    .append('<span class="glyphicon glyphicon-plus"></span>');
}

PreviewHexa.prototype = {
  click: function(hexa) {
    if (!editing) {
      var id = hexa.id;
      $('#' + id).remove();

      grid.addHexagon(grid.hexagons.length, tools.getHexagon(id, grid.previewHexas).position, "#000000", '', '', 100);

      grid.removePreviewHexa();
      var paramsWindowHexa = new ParamsWindowHexa(grid.hexagons.length - 1);
    } else
      $("#paramsWindowHexa").effect("shake");
  },
  updateRealPosition: function() {
    this.realPosition = tools.convertToRealPosition(this.position);
    $('#' + this.id + '.previewHexa').attr({
      style: 'transform:scale(' + grid.scale + ') rotate(120deg); left: ' + this.realPosition.x + 'px; top: ' + this.realPosition.y + 'px;'
    });
  }
};
