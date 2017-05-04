/*jshint esversion: 6*/
const path = require('path');
const express = require('express');
const galleryRoute = require('./routes/galleryRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// session
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

//sequelize
const db = require('./models');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 8888;
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(session({
  store: new RedisStore(),
  secret: 'this_can_be_anything_so_i_wrote_this',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (
  (username, password, done) => {
    User.findOne({
      where: {
        username: username
      }})
      .then ( user => {
        if (user === null) {
          return done(null, false, {message: 'Login Failed - Wrong Input'});
        } else {
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Login Failed - Wrong Input'});
            }
          });
        }
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }
));

passport.serializeUser(function(user, done) {
  return done(null, {
    id: user.id,
    username: user.username,
    firstname: user.firstname
  });
});

passport.deserializeUser(function(user, done) {
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, {
      id: user.id,
      username: user.username,
      firstname: user.firstname
    });
  });
});

app.use(express.static('public'));

app.use('/gallery', galleryRoute);
app.use('/login', loginRoute);

app.get('/',(req, res) => {
  res.redirect('/gallery');
});

// new user section
app.post('/user/new', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log(req.body);
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hash
      })
      .then( (user) => {
        res.redirect('/');
      });
    });
  });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/gallery');
});

app.get('*', function(req, res){
  res.render('error404');
});

app.listen(PORT, () => {
  db.sequelize.sync();
});