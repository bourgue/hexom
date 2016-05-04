var express = require('express'),
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  env = process.env,
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  ent = require('ent');

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'djjdkerkf',
  api_key: '891293876686523',
  api_secret: 'T3p-fvCE-kVjlnbI8nMwH3PO5KY'
});

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var MongoStore = require('connect-mongo/es5')(session);

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({
  secret: "123jaimelescanards456",
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var IPADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.get('/health', function(req, res) {
  res.writeHead(200);
  res.end();
});

app.use('/', express.static(__dirname + '/public'));

app.use(function(req, res) {
  res.status(404);
  res.render('404.ejs');
});

server.listen(PORT, IPADDRESS);
