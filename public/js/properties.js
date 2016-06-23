// Must be like userSchema.infos in /app/models/user.js
// And must have a defaultValue
var infos = {
  hexaSize: {
    type: Number,
    min: 0.4,
    max: 3,
    step: 0.02,
    defaultValue: 1,
    oninput: function(value){
      $(".hex, .preview").css('transform', 'rotate(120deg) scale(' + value + ')');
      grid.updateHexaPosition();
    }
  },
  hexaMargin: {
    type: Number,
    min: 0,
    max: 200,
    step: 2,
    defaultValue: 10,
    oninput: function(value){
      grid.updateHexaPosition();
    }
  },
  gradientSize: {
    type: Number,
    min: 0,
    max: 300,
    step: 2,
    defaultValue: 300,
    oninput: function(value){
      $("body").css('box-shadow', '0 0 ' + value + 'px ' + infos.backColor2.value + ' inset');
    }
  },
  backColor: {
    type: String,
    special: "color",
    maxLength: 7,
    defaultValue: "#e10000",
    oninput: function(value){
      $("body").css('background-color', value);
    }
  },
  backColor2: {
    type: String,
    special: "color",
    maxLength: 7,
    defaultValue: "#670000",
    oninput: function(value){
      $("body").css('box-shadow', '0 0 ' + infos.gradientSize.value + 'px ' + value + ' inset');
    }
  },
  lang: {
    type: String,
    maxLength: 2,
    defaultValue: 'fr',
    oninput: function(value){
      langManager.setLanguage();
    }
  },
  showSearchbar: {
    type: Boolean,
    defaultValue: true,
    oninput: function(value){
      search.update();
    }
  },
  searchPos: {
    type: Number,
    min: 0,
    max: 100,
    step: 0.5,
    defaultValue: 10,
    oninput: function(value){
      $("#searchBar").css('top', 'calc(' + value + '% - 25px)');
    }
  },
  backCenter: {
    type: Boolean,
    defaultValue: false,
    oninput: function(value){
      if (value) {
        $("body").css('background-position', 'center');
      } else {
        $("body").css('background-position', 'left top');
      }
    }
  },
  backRepeat: {
    type: Boolean,
    defaultValue: false,
    oninput: function(value){
      if (value) {
        $("body").css('background-repeat', 'repeat');
      } else {
        $("body").css('background-repeat', 'no-repeat');
      }
    }
  },
  backAjust: {
    type: Boolean,
    defaultValue: false,
    oninput: function(value){
      if (value) {
        $("body").css('background-size', 'cover');
      } else {
        $("body").css('background-size', 'auto');
      }
    }
  },
  backImage: {
    type: String,
    maxLength: 250,
    defaultValue: "",
    oninput: function(value){
      $("body").css('background-image', 'url(' + value + ')');
      infos.backCenter.oninput(infos.backCenter.value);
      infos.backRepeat.oninput(infos.backRepeat.value);
      infos.backAjust.oninput(infos.backAjust.value);
    }
  }
};
