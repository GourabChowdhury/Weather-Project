const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){ //root or homepage of the website
  res.sendFile(__dirname + "/index.html");

  //  res.send("Server is up and runnning.")
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "c09fc549cb754f8cb2b8114bae4373c3";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

  // 1. parse
      const weatherData = JSON.parse(data); //this will turn a JSON in some sort of string format, say the hexadicimal, or binary, or text and then turn it into an actual Javascript object.  hexadicimal, or binary, or text --> javascript object
      console.log(weatherData );

  // 2. stringify
      const object = {
        name: "Gourab",
        favouriteFood: "Ramen"
      }
      console.log(JSON.stringify(object)); //stringify is basically does the opposite of parse. it will turn a javascript object into a string.

  // 3. only want to see the tempareture (perticular one data)
      const temp = weatherData.main.temp
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcius.</ h1>");
      res.write("<img src=" + imageURL +">");
      res.send();
    })
  })

})


app.listen(3000, function()  {
  console.log("Server is running on port 3000.");
})
