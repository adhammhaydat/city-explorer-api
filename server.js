'use strict'
const express = require('express') // require the express package
const server = express() // initialize your express app instance
const cors = require('cors'); // after you initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT;
server.use(cors());
const weatherControler=require('./controllers/weather.control')
const moveController=require('./controllers/move.control')
// a server endpoint
server.get('/', (req, res) => {
  res.send('hello adham')
})

server.listen(PORT || 3001, () => {
  console.log(`server is runiing in port ${PORT}`)
})




server.get('/weather/:lat/:lon', weatherControler)

server.get('/movies/:city_name',moveController)