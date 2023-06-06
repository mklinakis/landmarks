const express = require('express');
const app = express()
const rateLimit = require('express-rate-limit') 
const limitConfig = require('./config/limiter').config


//Configuration for limiter
const limiter = rateLimit(limitConfig)

// Apply the rate limiting middleware to login requests
app.use('/parse/functions/login',limiter)


module.exports = app;