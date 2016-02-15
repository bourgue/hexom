function UserInfo(){
  UserInfo.prototype.newState();
}

UserInfo.prototype = {
  constructor: UserInfo,
  newState: function(){
    if(connected){
      $("#user_info").html(user.username);
    }else{
      $("#user_info").html(langManager.words.CONNECT_INFO[langManager.langId[langManager.language]]);
    }
  }
};
