var mongoose = require('mongoose');
mongoose.set('debug', true);
var config = require("../Utilities/config").config;

module.exports = function() {
mongoose.Promise = require('bluebird');
console.log(config.DB_URL.url);
var db = mongoose.connect('mongodb://localhost:27017/angular6-crud');
require('../Models/Document');
return db;

};
