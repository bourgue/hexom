function ParamsWindow() {

}

ParamsWindow.prototype = {
  constructor: ParamsWindow,
  init: function(){
    for (var prop in infos) {
      if (infos[prop].defaultValue !== undefined) {
        var inputId;
        if (infos[prop].type != Boolean) {
          inputId = prop + "_ipt";

          // add input properties
          if (infos[prop].type == Number) {
            $("#" + inputId).slider({
              prop: prop,
              range: "min",
              min: infos[prop].min,
              max: infos[prop].max,
              step: infos[prop].step,
              slide: function(event, ui){
                var p = $("#" + ui.handle.parentElement.id).slider("option").prop;
                infos[p].value = ui.value;
                infos[p].oninput(ui.value);
              }
            });
          } else if (infos[prop].type == String) {
            $("#" + inputId).attr({
              maxLength: infos[prop].maxLength
            });

            if (infos[prop].special == "color") {
              $("#" + inputId).attr({
                class: 'jscolor {onFineChange:\'infos.' + prop + '.value = this.toHEXString().toLowerCase(); infos.' + prop + '.oninput(this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
              });
            } else{
              $("#" + inputId).attr({
                oninput: "infos." + prop + ".value = htmlEncode(this.value); infos." + prop + ".oninput(htmlEncode(this.value))"
              });
            }
          }

          // add oninput attribute
          if (infos[prop].special == "color") {
            $("#" + inputId).attr({
              class: 'jscolor {onFineChange:\'infos.' + prop + '.value = this.toHEXString().toLowerCase(); infos.' + prop + '.oninput(this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
            });
          }
        } else {
          inputId = prop + "_cb";

          $("#" + inputId).attr({
            onchange: "infos." + prop + ".value = $('#" + inputId + "').is(':checked'); infos." + prop + ".oninput(infos." + prop + ".value);"
          });
        }
      }
    }

    $(".subtitle").attr("onclick", "subtitleClick(this)");
    jscolor.installByClassName("jscolor");

    $("#paramsWindow").draggable({
      containment: "body",
      scroll: false,
      handle: "#paramsTitle"
    });

    $("#closeIcon").click(function() {
      ParamsWindow.prototype.undoModifications();
    });
  },
  close: function() {
    $("#paramsWindow").fadeOut(fadeSpeed, function() {
      $(".group").css({
        "display": "none"
      });
      $(".subtitle").attr({
        "class": "subtitle"
      });
    });
    params = false;
    messages.close("modifygeneralprop");
  },
  open: function() {
    $("#paramsWindow").fadeIn(fadeSpeed);
    params = true;
    messages.open("modifygeneralprop");
  },
  uploadImg: function() {
    tools.uploadImg(document.getElementById("inputFile").files[0], true);
  },
  undoModifications: function() {
    init(username, dataFromDB.infos);

    this.close();
  },
  export: function() {
    tools.copyTextToClipboard($("#export_p").text());
  },
  import: function(code) {
    if (tools.isJsonCorrect(code) && tools.isJsonCorrect(JSON.stringify(JSON.parse(code).hexagons))) {
      var parsedCode = tools.setInfosValid(JSON.parse(code));
      init(username, parsedCode);
      $("#export_p").html(JSON.stringify(parsedCode));
      $("#codeError").slideUp(180);
    } else {
      if (code.length > 0)
        $("#codeError").slideDown(180);
      else
        $("#codeError").slideUp(180);
    }
  },
  submit: function() {
    tools.save();
    this.close();
  }
};
