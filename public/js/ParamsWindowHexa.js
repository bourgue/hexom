function ParamsWindowHexa() {
  this.hexagon = 0;

  $.get("/html/ParamsWindowHexa.html", function(data){
      $("body").prepend(data);

      $(".subtitle").attr("onclick", "subtitleClick(this)");

      $("#paramsWindowHexa").draggable({
        containment: "body",
        scroll: false,
        handle: "#paramsHexaTitle"
      });

      langManager.setLanguage();

      $("#paramsWindowHexa #closeIcon").click(function() {
        ParamsWindowHexa.prototype.undoModifications();
      });
  });
}

ParamsWindowHexa.prototype = {
  constructor: ParamsWindowHexa,
  init: function() {
    var hexaId = this.hexagon.prop.id;
    for (var prop in hexa_prop) {
      if (hexa_prop[prop].defaultValue !== undefined) {
        var inputId;

        if (hexa_prop[prop].type != Boolean) {
          inputId = prop + "_ipt";

          $("#" + inputId).val(this.hexagon.prop[prop]);

          // add input properties
          if ($("#" + inputId).attr("type") == "range") {
            $("#" + inputId).attr({
              min: hexa_prop[prop].min,
              max: hexa_prop[prop].max,
              step: hexa_prop[prop].step
            });
          } else if ($("#" + inputId).attr("type") == "text") {
            $("#" + inputId).attr({
              maxLength: hexa_prop[prop].maxLength
            });
          }

          // add oninput
          if (hexa_prop[prop].special == "color") {
            $("#" + inputId).attr({
              class: 'jscolor {onFineChange:\'paramsWindowHexa.hexagon.prop.' + prop + ' = this.toHEXString().toLowerCase(); hexa_prop.' + prop + '.oninput(paramsWindowHexa.hexagon.prop.id, this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
            });
          } else {
            $("#" + inputId).attr({
              oninput: "paramsWindowHexa.hexagon.prop." + prop + " = htmlEncode(this.value); hexa_prop." + prop + ".oninput(" + hexaId + ", htmlEncode(this.value))"
            });
          }
        } else {
          inputId = prop + "_cb";
          $("#" + inputId).prop('checked', hexagon[prop]);
        }
      }
    }
  },
  open: function(id){
    $("#paramsWindowHexa").fadeIn(fadeSpeed);
    this.hexagon = grid.hexagons[tools.findHexaIndex(id)];
    this.init();
    editing = true;
    modifying = true;

    $("#link_ipt").focus();

    jscolor.installByClassName("jscolor");
    for(var i = 0; i < $(".jscolor").length; ++i){
      $(".jscolor")[i].jscolor.fromString($(".jscolor")[i].value);
    }
  },
  close: function() {
    $("#paramsWindowHexa").fadeOut(fadeSpeed, function() {
      modifying = false;
      editing = false;
    });
  },
  uploadImg: function() {
    tools.uploadImg(document.getElementById("inputFile").files[0], false);
  },
  undoModifications: function() {
    init(username, dataFromDB.infos);
    this.close();
  },
  submit: function() {
    tools.save();
    this.close();
  }
};
