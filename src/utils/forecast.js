const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/cdcfba1d350d9cc72635b7f82116612f/${lat},${long}?units=si`;
    request({ url, json: true }, (err, {body}) => {
        if(err) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability} % chance of rain.`);
        }
    })
}

module.exports = forecast;