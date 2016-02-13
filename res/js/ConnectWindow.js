function ConnectWindow() {
  $("body").prepend('<div id="connectWindow" class="window unselectable">' +
    '<span id="closeIcon" class="ui-icon ui-icon-close"></span>' +
    '<div class="titre" id="connectTitle"></div>' +
    '<form id="formLogin" method="post" action="">' +
    '<ul>' +
    '<li>' + '<div id="id"></div><input type="text" id="username" maxLength="15" autofocus/>' + '</li>' +
    '<li>' + '<div id="mdp"></div><input type="password" id="password" maxLength="15"/>' + '</li>' +
    '<li>' + '<input id="connectSubmit" type="submit" class="button"></div>' + '</li>' +
    '</ul>' +
    '</form>' +
    '</div>');

  $("#connectWindow").draggable({
    containment: "body",
    scroll: false
  });

  langManager.setLanguage();

  $("#connectWindow").hide();
  $("#connectWindow").fadeIn(fadeSpeed);

  $("#connectWindow #closeIcon").click(function() {
    ConnectWindow.prototype.close();
  });

  $("#connectSubmit").click(function() {
    $.post("res/php/login.php", {
        username: $("#username").val(),
        password: $("#password").val()
      },
      function(data) {

      },
      'text'
    );
  });

  $("#formLogin").on("submit", function() {
    var username = $("#username").val();
    var password = $("#password").val();

      $.ajax({
        type: "POST",
        url: "res/php/login.php",
        data: 'username=' + username + "&password=" + password
      }).done(function(data){
        $("body").prepend(data);
      });
  });
}

ConnectWindow.prototype = {
  constructor: ConnectWindow,
  close: function() {
    $("#connectWindow").fadeOut(fadeSpeed, function() {
      $("#connectWindow").remove();
    });

  }
};
