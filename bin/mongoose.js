let mongoose = require('mongoose'),
    config = require('../config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.get('mongoose:connection'), {
    useMongoClient: true,
});

module.exports = mongoose;