// All properties (except id and position) must have a defaultValue
// oninput functions are called on init and when the value change, they have 2 parameters, the hexagon id and the value
var hexa_prop = {
  id: {
    type: Number
  },
  position: {
    type: Object
  },
  color: {
    type: String,
    special: "color",
    maxLength: 7,
    defaultValue: "#ffffff",
    oninput: function(hexagonId, value){
      $("#" + hexagonId + ".hex-in2").css("background-color", value);
    }
  },
  link: {
    type: String,
    maxLength: 100,
    defaultValue: "",
    oninput: function(hexagonId, value){

    }
  },
  text: {
    type: String,
    maxLength: 30,
    defaultValue: "",
    oninput: function(hexagonId, value){
      $("#" + hexagonId + " .textHexa").html(value);
    }
  },
  textColor: {
    type: String,
    special: "color",
    maxLength: 7,
    defaultValue: "#000000",
    oninput: function(hexagonId, value){
      $("#" + hexagonId + " .textHexa").css("color", value);
    }
  },
  image: {
    type: String,
    maxLength: 250,
    defaultValue: "",
    oninput: function(hexagonId, value){
      $("#" + hexagonId + ".hex-in2").css("background-image", 'url(' + value + ')');
    }
  },
  imgSize: {
    type: Number,
    min: 2,
    max: 400,
    step: 2,
    defaultValue: 100,
    oninput: function(hexagonId, value){
      $("#" + hexagonId + ".hex-in2").css("background-size", value + 'px');
    }
  }
};
