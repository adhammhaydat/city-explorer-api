'use strict'
const express = require('express') // require the express package
const server = express() // initialize your express app instance
const cors = require('cors'); // after you initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT;
const axios = require('axios');
const weather = require('./data/weather.json');
server.use(cors());
// a server endpoint
server.get('/', (req, res) => {
  res.send('hello adham')
})
server.get('/weather', (req, res) => {
  res.send(weather)
});



server.get('/weather/:lon/:lat/:city_name', (req, res) => {
  const data = weather.find((element) => +element.lon === +req.params.lon &&
    +element.lat === +req.params.lat &&
    element.city_name === req.params.city_name);

  if (data) {
    res.send(data)
  } else { res.send('the country not found') }



});

server.get('/weather/:city_name', (req, res) => {
  let newWeather = [];
  const findCity = weather.find((element) => element.city_name === req.params.city_name);
  if (findCity) {
    findCity.data.map((day) => newWeather.push(new Forecast(day)));
    res.send(newWeather);

  } else {
    res.status.send('the location  was not found');
  }
})
server.listen(PORT || 3001, () => {
  console.log(`server is runiing in port ${PORT}`)
})




server.get('/weather/:lat/:lon', (req, response) => {

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
})
server.get('/movies/:city_name', (req, response) => {

  let url=`https://api.themoviedb.org/3/search/multi?api_key=f5356a61e35f07e882c6695ed15ea127&query=${req.params.city_name}`
  


  let newMovies = []
  axios.get(url).then(MoviesData => {
    MoviesData.data.results.forEach((ele)=> newMovies.push(new Movies(ele)));
    console.log(newMovies)
    response.send(newMovies);

  })
    .catch((error) => {
      console.log(error)
      response.status(500).send('the Movies was not found');
    })
})

class Movies {
  constructor(city){

    this.title=city.title;
    this.overview=city.overview;
    this.average_votes=city.vote_average;
    this.total_votes=city.vote_count;
    this.image_url=`https://image.tmdb.org/t/p/w500/${city.poster_path}`;
    this.popularity=city.popularity;
    this.released_on=city.release_date;

  }
}


class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.description = city.weather.description
  }
};