const express = require('express');
const path = require('path');
let products = require('./routes/products');
let reviews = require('./routes/reviews');
let questionsAndAnswers = require('./routes/questionsAndAnswers');
let cart = require('./routes/cart');
let interactions = require('./routes/interactions');

let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

products(app);
reviews(app);
questionsAndAnswers(app);
cart(app);
interactions(app);

module.exports = app;
