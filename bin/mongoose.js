let mongoose = require('mongoose'),
	config = require('../config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.get('mongoose:connection'), {
	useMongoClient: true,
});

mongoose.connection.on('error', (err) => {
	console.error('Ошибка подключение к базе данных '+err);
	console.error('Не запущен сервер MongoDb');
	process.exit(2);
});

mongoose.connection.on('connected', () => {
	console.info('Успешно подключена MongoDb');
});

module.exports = mongoose;