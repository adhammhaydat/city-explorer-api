'use strict';
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
module.exports=Movies;