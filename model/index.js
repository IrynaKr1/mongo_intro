const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, db_name } = require('./../config/mongoConfigs.json')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${db_name}`)
  .then(() => console.log('DB connection OK'))
  .catch(err => console.log('err', err));

module.exports.User = require('./user');
module.exports.Post = require('./post');
