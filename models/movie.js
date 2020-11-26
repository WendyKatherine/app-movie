'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = Schema({
    title: String,
    description: String,
    duration: String,
    category: String,
    trailer: String,
    releasedate: Number,
    image: String,
});

module.exports = mongoose.model('Movie',MovieSchema);