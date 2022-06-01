const mongoose = require('mongoose');

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const dataBase = mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

module.exports = dataBase;
