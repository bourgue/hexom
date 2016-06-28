var params = false;
var paramsMenuOpen = false;

var dataFromDB = {};

var around = [{
  x: -1,
  y: -1
}, {
  x: 0,
  y: -1
}, {
  x: 1,
  y: 0
}, {
  x: 0,
  y: 1
}, {
  x: -1,
  y: 1
}, {
  x: -1,
  y: 0
}];

var previewing = false;
var editing = false;
var modifying = false;

var tmp_hover;

var inputMaxLength = 20;
var inputMinLength = 5;

var username;
var grid = new Grid();
var langManager = new LangManager();
var search = new Search();
var tools = new Tools();
var paramsWindow = new ParamsWindow();
var paramsMenu = new ParamsMenu();
var paramsWindowHexa = new ParamsWindowHexa();
var messages = new Messages();

var fadeSpeed = 150;

function init(username, datas) {
  username = username;
  datas = tools.setInfosValid(datas);

  for (var data in datas) {
    if (infos[data]) {
      var inputId;
      infos[data].value = datas[data];

      if (infos[data].type != Boolean) {
        inputId = data + "_ipt";
        if(infos[data].type == Number)
          $("#" + inputId).slider({value: datas[data]});
        else
          $("#" + inputId).val(datas[data]);

        infos[data].oninput(datas[data]);
      } else {
        inputId = data + "_cb";
        $("#" + inputId).prop('checked', datas[data]);
        infos[data].oninput(datas[data]);
      }
    }
  }

  grid.init();

  grid.update(tools.parseIfString(datas.hexagons));
  search.update();

  langManager.lang = infos.lang.value;
  langManager.setLanguage();

  // Init all jscolor
  for(var i = 0; i < $(".jscolor").length; ++i){
    $(".jscolor")[i].jscolor.fromString($(".jscolor")[i].value);
  }
}

function subtitleClick(subtitle){
  $('.group:not(#' + subtitle.id + ')').slideUp(500);
  $(".subtitle").attr({
    "class": "subtitle"
  });
  if ($('#' + subtitle.id + ".group").css("display") == "block") {
    $('#' + subtitle.id + ".group").slideUp(500);
  } else {

    if (subtitle.id == "importExport_grp") {
      $("#import_ipt").val("");
      $("#codeError").hide();
      $("#export_p").html(JSON.stringify(tools.compactInfos(infos)));
    }

    $('#' + subtitle.id + ".group").slideDown(500);
    $('#' + subtitle.id + ".subtitle").attr({
      "class": "subtitle selected"
    });
  }
}

var mouse = {
  x: 0,
  y: 0
};

$(document).mousedown(function(e) {
  mouse = {
    x: e.pageX,
    y: e.pageY
  };
});

$("body").click(function(handler) {
  if (handler.target.id != "0")
    if (handler.target.classList[0] != "textHexa")
      paramsMenu.close();
});

$(window).resize(function() {
  grid.updateHexaPosition();
});

function htmlEncode(value) {
  return $('<div/>').text(value).html();
}

function htmlDecode(value) {
  return $('<div/>').html(value).text();
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
