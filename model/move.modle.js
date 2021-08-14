'use strict';
class Movies {
  constructor(movies){

    this.title=movies.title;
    this.overview=movies.overview;
    this.average_votes=movies.vote_average;
    this.total_votes=movies.vote_count;
    this.image_url=`https://image.tmdb.org/t/p/w500/${movies.poster_path}`;
    this.popularity=movies.popularity;
    this.released_on=movies.release_date;

  }
}
module.exports=Movies;