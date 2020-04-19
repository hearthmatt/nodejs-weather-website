const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Set base directory for express static content
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));


//Set up handlebars and override handlebars default "views" directory to "templates/views"
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// Set directory for hbs partials
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);


//Display page and inject data into .hbs page variables
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matthew Evans'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Matthew Evans'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:  'Matthew Evans',
        message: "It's so easy, you won't need help.",
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address.'
        });
    };

    // Note for ME in the future!
    // There was a problem with the geocode callback when an invalid address was called.  This was due to the
    // use of destructuring for the geocode data on an undefined object.  Resolved by setting a default value of
    // null for the geocode data, i.e. = {}
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            });
        };
        
        forecast(latitude, longitude, location, (error, { location, description, temperature, feelslike }) => {
            if (error) {
                return res.send({
                    error: error
                })
            };
            res.send({
                address: req.query.address,
                location: location,
                description: description,
                temperature: temperature,
                feelslike: feelslike
            });
 
        });
    });

});



// Match with any invalid help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Matthew Evans',
        errorMessage: "Help article not found",
    });
});

// Match with anything else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Matthew Evans',
        errorMessage: "Page not found",
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});