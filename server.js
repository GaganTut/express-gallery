/*jshint esversion: 6*/
const path = require('path');
const express = require('express');
const galleryRoute = require('./routes/galleryRoute.js');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

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
    console.log('runs before serializing');
    User.findOne({
      where: {
        username: username
      }})
      .then ( user => {
        if (user === null) {
          console.log('user failed');
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

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

app.use(express.static('public'));

app.use('/gallery', galleryRoute);

app.get('/',(req, res) => {
  res.redirect('/login');
});

app.get('/login/new', (req, res) => {
  res.render('LoginViews/newUserPage');
});

app.get('/login', (req, res) => {
  res.render('LoginViews/loginPage');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));

// new user section
app.post('/user/new', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.username,
        password: hash
      })
      .then( (user) => {
        res.redirect('/');
      });
    });
  });
});

// secure routes
function isAuthenticated (req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }else {
    res.redirect('/login');
  }
}

app.get('*', function(req, res){
  res.render('error404');
});

app.listen(PORT, () => {
  db.sequelize.sync();
});