function ParamsWindowHexa() {
  this.hexagon = undefined;

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
          if (hexa_prop[prop].type == Number) {
            $("#" + inputId).slider({
              prop: prop,
              range: "min",
              min: hexa_prop[prop].min,
              max: hexa_prop[prop].max,
              step: hexa_prop[prop].step,
              value: this.hexagon.prop[prop],
              slide: function(event, ui){
                var p = $("#" + ui.handle.parentElement.id).slider("option").prop;
                paramsWindowHexa.hexagon.prop[p] = htmlEncode(ui.value);
                hexa_prop[p].oninput(hexaId, ui.value);
              }
            });
          } else if (hexa_prop[prop].type == String) {
            $("#" + inputId).attr({
              maxLength: hexa_prop[prop].maxLength,

            });

            if (hexa_prop[prop].special == "color") {
              $("#" + inputId).attr({
                class: 'jscolor {onFineChange:\'paramsWindowHexa.hexagon.prop.' + prop + ' = this.toHEXString().toLowerCase(); hexa_prop.' + prop + '.oninput(paramsWindowHexa.hexagon.prop.id, this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
              });
            } else{
              $("#" + inputId).attr({
                oninput: "paramsWindowHexa.hexagon.prop." + prop + " = htmlEncode(this.value); hexa_prop." + prop + ".oninput(" + hexaId + ", htmlEncode(this.value))"
              });
            }
          }

          // add oninput
          if (hexa_prop[prop].special == "color") {
            $("#" + inputId).attr({
              class: 'jscolor {onFineChange:\'paramsWindowHexa.hexagon.prop.' + prop + ' = this.toHEXString().toLowerCase(); hexa_prop.' + prop + '.oninput(paramsWindowHexa.hexagon.prop.id, this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
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

    this.hexagon = undefined;
  },
  uploadImg: function() {
    tools.uploadImg(document.getElementById("inputFileHexa").files[0], false);
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
