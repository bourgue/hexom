function ConnectWindow() {
  $("body").prepend('<div id="connectWindow" class="window unselectable">' +
    '<span id="closeIcon" class="close"></span>' +
    '<div class="titre" id="connectTitle"></div>' +
    '<ul>' +
    '<li>' + '<div id="id"></div><input type="text" id="username" maxLength="15"/>' + '</li>' +
    '<li>' + '<div id="mdp"></div><input type="password" id="password" maxLength="15"/>' + '</li>' +
    '<p id="no_account" class="error"></p>' +
    '<p id="err_mdp" class="error"></p>' +
    '<li>' + '<div id="connectSubmit" class="button"></div>' + '</li>' +
    '</ul>' +
    '</div>');

  $("#connectWindow").draggable({
    containment: "body",
    scroll: false,
    handle: "#connectTitle"
  });

  langManager.setLanguage();

  $("#connectWindow").hide();
  $("#connectWindow").fadeIn(fadeSpeed);

  $(".error").hide();

  $("#connectWindow #closeIcon").click(function() {
    ConnectWindow.prototype.close();
  });

  $("#connectSubmit").click(function() {
    if (!connected) {
      ConnectWindow.prototype.closeErrors();
      tools.login($("#username").val(), $("#password").val());
    }
  });
}

ConnectWindow.prototype = {
  constructor: ConnectWindow,
  close: function() {
    $("#connectWindow").fadeOut(fadeSpeed, function() {
      $("#connectWindow").remove();
    });
  },
  openError: function(error) {
    error.slideDown("fast");
  },
  closeErrors: function() {
    $(".error").slideUp("fast");
  }
};
