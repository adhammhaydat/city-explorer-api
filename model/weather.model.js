'use strict';
class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.description = city.weather.description
  }
};
module.exports=Forecast;