var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
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
    save(data, req, res);
    res.redirect('/');
  });

  // UPLOAD
  app.post('/upload', isLoggedIn, function(req, res) {
    var data = req.body;

    upload(data, req, res);
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

function save(data, req) {
  User.findOne({
    'user.username': req.user.user.username
  }, function(err, userDoc) {
    if (userDoc) {
      userDoc.infos.hexagons = data.hexagons;
      userDoc.infos.hexa_size = data.hexa_size;
      userDoc.infos.hexa_margin = data.hexa_margin;
      userDoc.infos.gradient_size = data.gradient_size;
      userDoc.infos.bg_color = data.bg_color;
      userDoc.infos.bg_color2 = data.bg_color2;
      userDoc.infos.lang = data.lang;
      userDoc.infos.show_searchbar = data.show_searchbar;

      userDoc.save();
    }
  });
}

function upload(data, req, res) {
  cloudinary.v2.uploader.upload(data.uri, {
      public_id: req.user.user.username + "/" + data.id
    },
    function(error, result) {
      return res.send({
        imgUrl: result.secure_url
      });
    });
}
