"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var city = req.body.queryResult.parameters['geo-city'];
  var name = req.body.queryResult.parameters['name'];
  // var antwoord = "Allright " + name + ", the Cappucino is free today in " + city;

  https.get('https://api.worldweatheronline.com/premium/v1/weather.ashx?key=86840a75efc34f51aaa130030182905&q=Eindhoven&format=json&date=today', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    var weatherDescription = JSON.parse(data).data.current_condition[0].weatherDesc[0].value
     return res.json({
    fulfillmentText: "I would the describe the weather as " + weatherDescription + "today."
  });
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 
  

 
});



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

