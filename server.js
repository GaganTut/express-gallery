/*jshint esversion: 6*/
const express = require('express');
const galleryRoute = require('./routes/galery.js');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 8888;

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use('/gallery', galleryRoute);

app.get('/',(req, res) => {
  res.render('home');
});

app.get('*', function(req, res){
  res.render('error404');
});

