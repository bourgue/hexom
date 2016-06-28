function Hexagon(properties) {
  this.prop = {};
  this.addProperties(properties);

  var realPosition = tools.convertToRealPosition(this.prop.position);

  $("#grid").append('<div id="' + this.prop.id + '" class="hex"></div>');

  $('#' + this.prop.id + '.hex').append('<div class="hex-in1" id="' + this.prop.id + '"></div>');

  $('#' + this.prop.id + '.hex-in1').append('<div class="hex-in2" id="' + this.prop.id + '"></div>');
  $('#' + this.prop.id + '.hex-in2').attr({
    onclick: 'Hexagon.prototype.click(this)',
    onmouseover: 'Hexagon.prototype.mouseOver(this)',
    onmouseout: 'Hexagon.prototype.mouseOut(this)'
  }).append('<p class="textHexa"></p>');

  this.updateRealPosition();

  this.init();
}

Hexagon.prototype = {
  constructor: Hexagon,
  init: function() {
    for (var property in hexa_prop) {
      if (hexa_prop[property].defaultValue !== undefined) {
        if(hexa_prop[property].oninput){
          hexa_prop[property].oninput(this.prop.id, this.prop[property]);
        }
      }
    }
  },
  click: function(hexa) {
    if (hexa.id == 0) {
      if (paramsMenuOpen || params || editing || modifying || previewing) {
        paramsMenu.closeAll();
        paramsMenu.close();
      } else
        paramsMenu.open();
    } else {
      if (modifying && !editing) {
        paramsWindowHexa.open(hexa.id);
        messages.close("choosehexatomod");
      } else if (!previewing && !editing && !params) {
        var hexagon = grid.hexagons[tools.findHexaIndex(hexa.id)];

        //Open a link with or without http://
        if (hexagon.prop.link)
          window.location = /^(http|https):/.test(hexagon.prop.link) ? hexagon.prop.link : 'http://' + hexagon.prop.link;
      }
    }
  },
  addProperties: function(properties) {
    for (var property in properties) {
      if (hexa_prop[property])
        this.prop[property] = properties[property];
    }
  },
  mouseOver: function(hexa) {
    if (modifying && !editing && hexa.id != "0")
      hexa.style.opacity = ".7";
  },
  mouseOut: function(hexa) {
    hexa.style.opacity = "1";
  },
  updateRealPosition: function() {
    realPosition = tools.convertToRealPosition(this.prop.position);
    $('#' + this.prop.id + '.hex').attr({
      style: 'transform:scale(' + infos.hexaSize.value + ') rotate(120deg); left: ' + realPosition.x + 'px; top: ' + realPosition.y + 'px;'
    });
  },
  delete: function() {
    $('#' + this.prop.id).remove();
    grid.hexagons.splice(tools.findHexaIndex(this.prop.id), 1);
    editing = false;
    modifying = false;
    paramsWindowHexa.close();
    tools.save();
  }
};
