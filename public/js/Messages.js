function Messages(){
  this.mess = [{id: "welcome"}, {id: "whereaddhexa"}, {id: "modifyhexaprop"}, {id: "modifygeneralprop"}, {id: "choosehexatomod"}];
  this.init();
}

Messages.prototype = {
  constructor: Messages,
  init: function(){
    for(var i = 0; i < this.mess.length; ++i){
      $("#messagesContainer").append('<div id="' + this.mess[i].id + '_mess" class="messages"></div>');
    }
  },
  open: function(messId, delay){
    $(".messages").slideUp(300);
    if(typeof delay !== "undefined")
      $("#" + messId + "_mess").slideDown(300).delay(delay).slideUp(300);
    else
      $("#" + messId + "_mess").slideDown(300);
  },
  close: function(messId){
    $("#" + messId + "_mess").slideUp(300);
  },
  closeAll: function(){
    $(".messages").slideUp(300);
  }
};
