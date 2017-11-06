// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var hero = require("../models/hero.js");

var heroes = [
    {id: 1, name:'a'},
    {id: 2, name:'b'},
    {id: 3, name:'c'}
];

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/heroes')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        // set the hero's id and name (comes from the request)
        heroes.push({id: req.body.id, name: req.body.name});

        res.json({message: 'hero created!'});
    })

    // delete a hero by name
    .delete(function(req, res) {

        var needle = req.query.name;
        //let hero = heroes.find((hero) => hero.id === req.id);

        // iterate over each element in the array
        for (var i = 0; i < heroes.length; i++) {
            // look for the entry with a matching `code` value
            if (heroes[i].name === needle) {
                heroes.pop(heroes[i]);
                return res.json({message: 'hero deleted'});
            }
        }
        // in case we found nothing
        res.json({message: 'no hero found'});
    })

    // get all heroes
    .get(function(req, res) {
        res.json(heroes);
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/heroes/:id')

    // get the hero with that id (accessed at GET http://localhost:8080/api/bears/:id)
    .get(function(req, res) {

        var needle = parseInt(req.params.id, 10);

        // iterate over each element in the array
        for (var i = 0; i < heroes.length; i++) {
            // look for the entry with a matching value
            if (heroes[i].id === needle) {
                return res.json(heroes[i]);
            }
        }
        // in case we found nothing
        res.json({message: 'no hero found'});
    })

    // delete a hero
    .delete(function(req, res) {

        var needle = parseInt(req.params.id, 10);

        // iterate over each element in the array
        for (var i = 0; i < heroes.length; i++) {
            // look for the entry with a matching `code` value
            if (heroes[i].id === needle) {

                heroes.splice( i , 1);
                return res.json({message: 'hero deleted'});
            }
        }
        // in case we found nothing
        res.json({message: 'no hero found'});
    })

    // update hero name by id
    .put(function(req, res) {

        var needle = parseInt(req.params.id, 10);

        // iterate over each element in the array
        for (var i = 0; i < heroes.length; i++) {
            // look for the entry with a matching `code` value
            if (heroes[i].id === needle) {

                heroes[i].name = req.body.name;
                return res.json({message: 'hero updated'});
            }
        }
        // in case we found nothing
        res.json({message: 'no hero found'});

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

