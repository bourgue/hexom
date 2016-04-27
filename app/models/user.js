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
    hexa_pos: String,
    hexa_colors: String,
    hexa_links: String,
    hexa_images: String,
    hexa_img_sizes: String,
    hexa_size: Number,
    shadow_color: String,
    shadow_size: Number,
    bg_color: String,
    lang: String
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
