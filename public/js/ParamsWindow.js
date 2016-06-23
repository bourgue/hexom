function ParamsWindow() {
  $.get("/html/ParamsWindow.html", function(data){
      $("body").prepend(data);

      $(".subtitle").attr("onclick", "subtitleClick(this)");

      $("#paramsWindow").draggable({
        containment: "body",
        scroll: false,
        handle: "#paramsTitle"
      });

      $("#paramsWindow").hide();

      $("#closeIcon").click(function() {
        ParamsWindow.prototype.undoModifications();
      });

      ParamsWindow.prototype.init();

      jscolor.installByClassName("jscolor");
  });
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
          if ($("#" + inputId).attr("type") == "range") {
            $("#" + inputId).attr({
              min: infos[prop].min,
              max: infos[prop].max,
              step: infos[prop].step
            });
          } else if ($("#" + inputId).attr("type") == "text") {
            $("#" + inputId).attr({
              maxLength: infos[prop].maxLength
            });
          }

          // add oninput attribute
          if (infos[prop].special == "color") {
            $("#" + inputId).attr({
              class: 'jscolor {onFineChange:\'infos.' + prop + '.value = this.toHEXString().toLowerCase(); infos.' + prop + '.oninput(this.toHEXString().toLowerCase());\', uppercase:false, hash:true}'
            });
          } else {
            $("#" + inputId).attr({
              oninput: 'infos.' + prop + '.value = htmlEncode(this.value); infos.' + prop + '.oninput(htmlEncode(this.value));'
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
  },
  open: function() {
    $("#paramsWindow").fadeIn(fadeSpeed);
    params = true;
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
