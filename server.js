const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mkdirp = require('mkdirp');
const axios = require('axios');
const ejs = require('ejs'); // Add the 'ejs' package

var selectedID = "";
app.use(express.urlencoded({ extended: true }));

// Set up the view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define the routes
app.get('/', function(req, res) {
    res.render('pages/home');
});

app.post('/process_form', function(req, res){
    var user_input = req.body.superhero;
  
    axios.get('https://superheroapi.com/api/103398715680585/search/' + user_input)
    .then((response)=>{
      if (response.data.results && response.data.results.length > 0) {
        let user_input = response.data.results[0];
        res.render('pages/home', {
          hero: user_input,
          message: null
        });
      } else {
        res.render('pages/home', {
          hero: null,
          message: 'No results were found for your search. Please try again.'
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  });
  

app.listen(8080);
console.log('8080 is the magic port');
