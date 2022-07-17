const express = require('express');

require('dotenv').config();
const { client } = require('./config/redis');
const usersRouter = require('./routes/users');

const ApiRoute = require('./const');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRouter)

module.exports = app;