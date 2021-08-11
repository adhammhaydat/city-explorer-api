'use strict';
const Movies=require("../model/move.modle")
const moveController= (req, response) => {

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
}
module.exports=moveController;