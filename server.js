'use strict'
const express = require('express') // require the express package
const server = express() // initialize your express app instance
const cors = require('cors'); // after you initialize your express app instance
require('dotenv').config();
const PORT=process.env.PORT;
const axios=require('axios');
const weather=require('./data/weather.json');
server.use(cors());
// a server endpoint

server.listen(PORT,()=>{
  console.log(`server is runiing in port ${PORT}`)
})
server.get('/',(req,res)=>{
  res.send('hello adham')
})
server.get('/weather',(req,res)=>{               
  res.send(weather)
}); 



server.get('/weather/:lon/:lat/:city_name',(req,res)=>{
  const data= weather.find((element)=>+element.lon === +req.params.lon &&
  +element.lat === +req.params.lat &&
  element.city_name === req.params.city_name);
  
  if(data){res.send(data)
  }else{res.send('the country not found')}
  
    
  
});

server.get('/weather/:city_name',(req,res)=>{
  let newWeather=[];
  const findCity=weather.find((element)=>element.city_name === req.params.city_name);
  if(findCity){
    findCity.data.map((day)=>newWeather.push(new Forecast(day)));
    res.send(newWeather);
    
  }else{
    res.status.send('the location  was not found');
  }
})



class Forecast {
  constructor(city) {
      this.date = city.datetime;
      this.description = city.weather.description
  }
};