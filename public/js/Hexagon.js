function Hexagon(id, position, color, link, image, imgSize) {
  this.id = id;
  this.position = position;
  this.color = color;
  this.link = link;
  this.image = image;
  this.imgSize = imgSize;

  this.realPosition = tools.convertToRealPosition(position);

  var backgroundImageCSS = 'background-image: url(' + image + ');';
  var backgroundImageSizeCSS = 'background-size: ' + imgSize + 'px;';

  $("#grid").append('<div id="' + id + '" class="hex"></div>');

  $('#' + id + '.hex').attr({
      onclick: 'Hexagon.prototype.click(this)',
      style: 'transform:scale(' + grid.scale + ') rotate(120deg); left: ' + this.realPosition.x + 'px; top: ' + this.realPosition.y + 'px;'
    })
    .append('<div class="hex-in1" id="' + id + '"></div>');

  $('#' + id + '.hex-in1').append('<div class="hex-in2" id="' + id + '"></div>');
  $('#' + id + '.hex-in2').attr({
    style: 'background-color: ' + color + ';' + backgroundImageCSS + backgroundImageSizeCSS,
    onmouseover: 'Hexagon.prototype.mouseOver(this)',
    onmouseout: 'Hexagon.prototype.mouseOut(this)'
  });
}

Hexagon.prototype = {
  constructor: Hexagon,
  click: function(hexa) {
    if (hexa.id == 0) {
      if (paramsMenuOpen || params || editing || modifying || previewing) {
        paramsMenu.closeAll();
        paramsMenu.close();
      } else
        paramsMenu.open();
    } else {
      if (modifying && !editing) {
        var paramsWindowHexa = new ParamsWindowHexa(hexa.getAttribute('id'));
        editing = true;
      } else if (!previewing) {
        var hexagon = tools.getHexagon(hexa.id, grid.hexagons);

        //Open a link with or without http://
        if (hexagon.link)
          window.location = /^(http|https):/.test(hexagon.link) ? hexagon.link : 'http://' + hexagon.link;
      } else
        $("#paramsWindowHexa").effect("shake");
    }
  },
  mouseOver: function(hexa) {
    if (modifying && !editing && hexa.id != "0")
      hexa.style.opacity = ".6";
  },
  mouseOut: function(hexa) {
    hexa.style.opacity = "1";
  },
  updateRealPosition: function() {
    this.realPosition = tools.convertToRealPosition(this.position);
    $('#' + this.id + '.hex').attr({
      style: 'transform:scale(' + grid.scale + ') rotate(120deg); left: ' + this.realPosition.x + 'px; top: ' + this.realPosition.y + 'px;'
    });
  }
};
