const request = require('request');

//Function to retreive co-ordinates for any address.  
// Parameters are the address to check for and the callback function
const geocode = (address, callback) => {
    // Build the URL
    const mapBoxUrl = ('https://api.mapbox.com/geocoding/v5/mapbox.places/');
    const mapBoxAPIKey = ('pk.eyJ1IjoiaGVhcnRobWF0dCIsImEiOiJjazkyMHpvZXkwM21iM3NsNWo1aHF0OHByIn0.4zyGE0kpXXS7ZEZceTTS7A');
    const limit = 1;
    const uriAddress = encodeURIComponent(address);
    const url = (`${mapBoxUrl}${uriAddress}.json?access_token=${mapBoxAPIKey}&limit=${limit}`);

    // Try the request
    //request({ url: url, json: true }, (error, response) => {  //--> detructured to:
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);  // Invoke callback with error message and no data
        } else if (body.features.length === 0) {
            callback('Location not found.  Try another search', undefined); // Invoke callback with error message and no data
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;
