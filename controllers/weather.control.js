'use strict';
const Forecast=require('../model/weather.model')
const axios = require('axios')
const weatherControler= (req, response) => {

  let url = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${req.params.lat}&lon=${req.params.lon}`

  let newWeather = []
  axios.get(url).then(weatherData => {
    weatherData.data.data.map((day)=> newWeather.push(new Forecast(day)));
   
    response.send(newWeather);

  })
    .catch((error) => {
      console.log(error)
      response.status(500).send('the location  was not found');
    })
}

module.exports=weatherControler;