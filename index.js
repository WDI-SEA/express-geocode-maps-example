var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  db.place.findAll().then(function(places) {
    res.render('index', {places});
  }).catch(function(err) {
    res.send({message: 'error', error: err});
  })
});

app.post('/places', function(req, res) {
  db.place.create({
    name: req.body.name,
    address: req.body.address
  }).then(function(place) {
    res.redirect('/');
  }).catch(function(err) {
    res.send({message: 'error', error: err});
  })
});

app.listen(3000);
