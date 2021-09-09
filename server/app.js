const express = require('express');
let products = require('./routes/products');
let reviews = require('./routes/reviews');
let questionsAndAnswers = require('./routes/questionsAndAnswers');
let cart = require('./routes/cart');
let interactions = require('./routes/interactions');

let app = express();

products(app);
reviews(app);
questionsAndAnswers(app);
cart(app);
interactions(app);

app.use(express.json());
app.use(express.static('client'));

module.exports = app;