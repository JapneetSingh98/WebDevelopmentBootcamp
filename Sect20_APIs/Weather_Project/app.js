const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const apiKey = "efacd87ae38ffc91417a0f3c1a0a1a1d";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    console.log("getLatLon"+ req.body.cityName);
    const city = req.body.cityName;

    async function getLatLon() {

        return new Promise((resolve, reject) => {
            
            let latLong = [null, null];

            const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+",&limit=5&appid="+apiKey;
            https.get(geoUrl, function(response) {
                console.log("getLatLon Getting coordinates");
                console.log("getLatLon" + response.statusCode);
        
                response.on("data", function(data) {
                    const geoData = JSON.parse(data);
                    console.log("getLatLon" + geoData);
        
                    latLong[0] = geoData[0].lat;
                    latLong[1] = geoData[0].lon;

                    resolve(latLong);
                });
            });
        });
    };

    async function checkWeather() {

        const latLong = await getLatLon();

        console.log("Inside checking weather ---------");
        console.log(latLong[0]);
        console.log(latLong[1]);
        let units = "imperial";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat="+latLong[0]+"&lon="+latLong[1]+"&appid="+apiKey+"&units="+units;
        https.get(url, function(response) {
            console.log(url);
            console.log("Checking weather");
            console.log(latLong[0]);
            console.log(latLong[1]);
            console.log(response.statusCode);
    
            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                console.log(weatherData);
    
                const temperature = weatherData.main.temp;
                console.log("temp: " + temperature);
    
                const description = weatherData.weather[0].description
                console.log(description);
    
                const icon = weatherData.weather[0].icon;
                const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    
                res.write("<h1>The temperature in " + city +" is " + temperature + "&#8457</h1>");
                res.write("<p>The weather is " + description + "</p>");
                res.write("<img src=" + imgUrl + ">")
                res.send();
            });
        });
    };

    checkWeather();
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});

