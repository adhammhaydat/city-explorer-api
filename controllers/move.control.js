'use strict';
const Movies=require("../model/move.modle");
const  axios=require('axios');
const Cash = require("../model/Cashe");

let newCache = new Cash([])
function moveController (req, response){
  let newMovies = []
  let url=`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${req.params.city_name}`
  let key=`movies${req.params.city_name}`
  console.log(key)
  if(newCache[key]&& Date.now()){
    console.log("ok")
      response.send(newCache[key].data);
  }else{
    axios.get(url).then(MoviesData => {
      MoviesData.data.results.forEach((ele)=> newMovies.push(new Movies(ele)));
      response.send(newMovies);
      newCache[key].data=newMovies;
    })
      .catch((error) => {
        console.log(error)
        response.status(500).send('the Movies was not found');
      })
      
  }

  
  
  
}
module.exports=moveController;