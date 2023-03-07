// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

var selectedID = "";
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// home page 
app.get('/', function(req, res) {  
    // this will render our new home page 
    res.render("pages/home");
});

// this is the form that is presented to user upon landing of home page
// when filled out and submitted, information requested will be sent to server
app.post('/process_form', function(req, res){
    // create a variable to hold the user_input parsed from the request body
    var user_input = req.body.superhero;
  
    // superhero API CALL + "user_input". The user_input will be added after the API token to narrow down the search result.
    axios.get('https://superheroapi.com/api/103398715680585/search/' + user_input)
    .then((response)=>{
      if (response.data.results && response.data.results.length > 0) {
        // for the response, we only view the first result if there are mutiple hero/villain with identical name by indexing zero, or the first of the list if list is present.
        // Store the response data 
        let user_input = response.data.results[0];
        // res.render will render the response through the EJS file/page that is stated, in this case our home page. for easy calling in EJS file, we assign the response
        // data to a new variable called 'hero'.
        res.render('pages/home', {
          hero: user_input,
          message: null // no message to display
        });
      } else {
        res.render('pages/home', {
          hero: null, // no hero to display
          message: 'No results were found for your search. Please try again.' // message to display
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  });
  

// the web application will "listen" or wait for any requests through the port 8080.
app.listen(8080);
// console.log will let programmer know that web application has received a request through port 8080.
console.log('8080 is the magic port');