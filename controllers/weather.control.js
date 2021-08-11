'use strict';
const Forecast=require('../model/weather.model')
const weatherControler= (req, response) => {

  let url = `https://api.weatherbit.io/v2.0/forecast/daily/?key=574ce3e321f542a8aca3544a43bbfc2f&lat=${req.params.lat}&lon=${req.params.lon}`

  let newWeather = []
  axios.get(url).then(weatherData => {
    weatherData.data.data.forEach((day)=> newWeather.push(new Forecast(day)));
   
    response.send(newWeather);

  })
    .catch((error) => {
      console.log(error)
      response.status(500).send('the location  was not found');
    })
}

module.exports=weatherControler;