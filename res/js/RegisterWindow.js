function RegisterWindow() {
  $("body").prepend('<div id="registerWindow" class="window unselectable">' +
    '<span id="closeIcon" class="close glyphicon glyphicon-remove"></span>' +
    '<div class="titre" id="registerTitle"></div>' +
    '<ul>' +
    '<li><div id="registerId"></div><input type="text" id="registerUsername" maxLength="' + inputMaxLength + '" autofocus/></li>' +
    '<li><div id="registerMdp"></div><input type="password" id="registerPassword" maxLength="' + inputMaxLength + '"/></li>' +
    '<li><div id="registerEmail"></div><input type="text" id="registerMail" maxLength="' + inputMaxLength + '"/></li>' +
    '<p id="maxError" class="error"></p>' +
    '<p id="minError" class="error"></p>' +
    '<p id="emailError" class="error"></p>' +
    '<p id="usernameError" class="error"></p>' +
    '<li><div id="registerSubmit" class="button"></div></li>' +
    '</ul>' +
    '</div>');

  $("#registerWindow").draggable({
    containment: "body",
    scroll: false,
    handle: "#registerTitle"
  });

  registring = true;

  langManager.setLanguage();

  $("#registerWindow").hide();
  $("#registerWindow").fadeIn(fadeSpeed);

  $("#registerWindow #closeIcon").click(function() {
    RegisterWindow.prototype.close();
  });

  $(".error").hide();

  $("#registerSubmit").click(function() {
    RegisterWindow.prototype.closeErrors();
    var usernamev = $("#registerUsername").val();
    var passwordv = $("#registerPassword").val();
    var emailv = $("#registerMail").val();

    if(usernamev.length < inputMaxLength && passwordv.length < inputMaxLength && emailv.length < inputMaxLength){
      if(usernamev.length >= inputMinLength && passwordv.length >= inputMinLength && emailv.length >= inputMinLength){
        if(RegisterWindow.prototype.validateEmail(emailv)){
          $.post("res/php/register.php",
          {
            username: usernamev,
            password: passwordv,
            email: emailv
          },function(data){

            if(data != "err_username"){
              user.username = usernamev;
              user.email = emailv;
              news.add(langManager.words.NEW_USER[langManager.langId[langManager.language]]);
              tools.save();
              RegisterWindow.prototype.close();
            }else{
              RegisterWindow.prototype.openError($("#usernameError"));
            }
          });
        }else{
          RegisterWindow.prototype.openError($("#emailError"));
        }
      }else{
        RegisterWindow.prototype.openError($("#minError"));
      }
    }else{
      RegisterWindow.prototype.openError($("#maxError"));
    }


  });
}

RegisterWindow.prototype = {
  constructor: RegisterWindow,
  close: function() {
    $("#registerWindow").fadeOut(fadeSpeed, function() {
      $("#registerWindow").remove();
      registring = false;
    });
  },
  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  },
  openError: function(error){
    error.slideDown("fast");
  },
  closeErrors: function(){
    $(".error").slideUp("fast");
  }
};
