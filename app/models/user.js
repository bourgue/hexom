var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  user: {
    username: String,
    email: String,
    password: String
  },
  infos: {
    hexaSize: Number,
    hexaMargin: Number,
    hexagons: String,
    gradientSize: Number,
    backColor: String,
    backColor2: String,
    lang: String,
    showSearchbar: Boolean,
    searchPos: Number,
    backCenter: Boolean,
    backRepeat: Boolean,
    backAjust: Boolean,
    backImage: String
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.user.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
