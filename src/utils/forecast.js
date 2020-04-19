const request = require('request');

//Function to retreive weather for any co-ordinates.
// Parameters are the co-ordinates to check for and the callback function
const forecast = (longitude, latitude, location, callback) => {
    // Build the URL
    const weatherStackUrl = ('http://api.weatherstack.com/current');
    const weatherStackAPIKey = ('0525ad3a8406f3aa30f2fd4e8c7e5e7b');
    const units = 'm';
    const url = (`${weatherStackUrl}?access_key=${weatherStackAPIKey}&query=${latitude},${longitude}&units=${units}`);

    // Try the request
    // request({ url: url, json: true }, (error, response) => { --> destructured to:
    request({ url, json: true }, (error, { body }) => {    
        if (error) {
            callback('Unable to connect to weather services!', undefined);  // Invoke callback with error message and no data
        // } else if (response.body.error) {
        } else if (body.error) {
            callback('Location not found.  Try another search', undefined); // Invoke callback with error message and no data
        } else {
            callback(undefined, {
                // description: response.body.current.weather_descriptions[0],
                // temperature: response.body.current.temperature,
                // feelslike: response.body.current.feelslike
                location: location,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                winddirection: body.current.wind_dir,
                iconurl: body.current.weather_icons[0]
            });
        };
    });
};

module.exports = forecast;
