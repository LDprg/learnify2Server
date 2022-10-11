const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.set = require("./set.model");
db.stat = require("./stat.model");

module.exports = db;
