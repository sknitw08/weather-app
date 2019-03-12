const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");
const publicPath = path.join(__dirname, "..", "public");

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Sanjay Kumar"
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: "Provide location"});
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(lat, long, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            //console.log(forecastData);
            return res.send({
                forecast: forecastData,
                location, 
                address: req.query.address});
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found",
        name: "Sanjay Kumar"
    })
})

app.listen(3000);