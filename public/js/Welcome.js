function Welcome(){
  $("body").append('<div id="welcome">' +
  '<span class="glyphicon glyphicon-remove-circle" id="closeWelcome"></span>' +
  '<div id="welcomeTitle"></div>' +
  '<div id="welcomeText"></div>' +
  '</div>');

  $("#welcome").hide();
  $("#welcome").fadeIn(fadeSpeed);

  $("#closeWelcome").click(function(){
    $("#welcome").fadeOut(fadeSpeed, function(){
      $("#welcome").remove();
    });
  });

  Cookies.set('welcome', "", { expires: 365, path: '' });
}
