var mongoose = require('mongoose');
var User = require("./models/user.js");

module.exports = function(app, passport) {

  // HOME PAGE
  app.get('/', isLoggedInHOMEPAGE, function(req, res) {
    res.render('index.ejs', {
      username: req.user.user.username,
      infos: req.user.infos
    });
  });

  // LOGIN
  app.get('/login', isNotLoggedIn, function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // SIGNUP
  app.get('/signup', isNotLoggedIn, function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // LOGOUT
  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // SAVE
  app.post('/save', isLoggedIn, function(req, res) {
    var data = req.body;
    save(data, req);
    res.redirect('/');
  });
};

function isLoggedInHOMEPAGE(req, res, next) {
  if (req.isAuthenticated())
    return next();

  return res.redirect('/login');
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }

  return next();
}

// SAVE FUNCTION
function save(data, req){  // data is from /save
  User.findOne({
    'user.username': req.user.user.username
  }, function(err, userDoc) {

    if (userDoc) {
      userDoc.infos.hexa_pos = JSON.stringify(data.hexa_pos);
      userDoc.infos.hexa_colors = JSON.stringify(data.hexa_colors);
      userDoc.infos.hexa_links = JSON.stringify(data.hexa_links);
      userDoc.infos.hexa_images = JSON.stringify(data.hexa_images);
      userDoc.infos.hexa_img_sizes = JSON.stringify(data.hexa_img_sizes);
      userDoc.infos.hexa_size = data.hexa_size;
      userDoc.infos.shadow_color = data.shadow_color;
      userDoc.infos.shadow_size = data.shadow_size;
      userDoc.infos.bg_color = data.bg_color;
      userDoc.infos.lang = data.lang;

      userDoc.save();
    }
  });
}
