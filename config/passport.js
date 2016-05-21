var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

var minLength = 4;
var maxLength = 20;

module.exports = function(passport) {
  // passport session setup
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        var regexUsername = /^[A-Za-z0-9\-\_]+$/g;
        // Test if username is valid
        if (regexUsername.test(req.body.username)) {
          // Test username length
          if (req.body.username.length >= minLength) {
            if (req.body.username.length <= maxLength) {
              // Test password length
              if (req.body.password.length >= minLength) {
                if (req.body.password.length <= maxLength) {
                  var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  // Test if email is valid
                  if (regexEmail.test(req.body.email) && req.body.email.length <= 30) {
                    User.findOne({
                      'user.username': username
                    }, function(err, user) {
                      if (err)
                        return done(err);

                      if (user) {
                        return done(null, false, req.flash('signupMessage', 'username_exist'));
                      } else {
                        User.findOne({
                          'user.email': req.body.email
                        }, function(err, email) {
                          // return any error
                          if (err)
                            return done(err);

                          if (email) {
                            return done(null, false, req.flash('signupMessage', 'email_exist'));
                          } else {
                            var newUser = new User();

                            newUser.user.username = username;
                            newUser.user.email = req.body.email;
                            newUser.user.password = newUser.generateHash(password);

                            newUser.infos.hexagons = '[{ "id": 0, "color": "#000000", "image": "/img/gear.png", "imgSize": 80, "position": { "x": 0, "y": 0 }}]';
                            newUser.infos.hexa_size = 1;
                            newUser.infos.hexa_margin = 10;
                            newUser.infos.gradient_size = 300;
                            newUser.infos.bg_color = "#e10000";
                            newUser.infos.bg_color2 = "#670000";
                            newUser.infos.lang = "fr";
                            newUser.infos.show_searchbar = true;

                            newUser.save(function(err) {
                              if (err)
                                throw err;
                              return done(null, newUser);
                            });
                          }
                        });
                      }
                    });
                  } else {
                    return done(null, false, req.flash('signupMessage', 'email_invalid'));
                  }
                } else {
                  return done(null, false, req.flash('signupMessage', 'password_long'));
                }
              } else {
                return done(null, false, req.flash('signupMessage', 'password_short'));
              }
            } else {
              return done(null, false, req.flash('signupMessage', 'username_long'));
            }
          } else {
            return done(null, false, req.flash('signupMessage', 'username_short'));
          }
        } else {
          return done(null, false, req.flash('signupMessage', 'username_invalid'));
        }
      });
    }));


  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
      pseudoField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      if (username.length >= minLength && username.length <= maxLength) {
        User.findOne({
          'user.username': username
        }, function(err, user) {
          if (err)
            return done(err);

          if (!user)
            return done(null, false, req.flash('loginMessage', 'username_not_exist'));

          if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'password_wrong'));

          return done(null, user);
        });
      } else {
        return done(null, false, req.flash('loginMessage', 'username_not_exist'));
      }
    }));
};
