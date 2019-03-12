const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2tuaXR3MDgiLCJhIjoiY2pzeXY4ejZ5MDVhMTQ1cGxjem8xejV0bCJ9.M43g2IHMcfw5D5Qm2mhhOA&limit=1`;

    request( {url, json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to Mapbox service!');
        } else if(body.features.length === 0) {
            callback('Try valid location');
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;

