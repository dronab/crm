let mongoose = require('../bin/mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema;

let schema = new Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.plugin(passportLocalMongoose, {
	errorMessages: {
		UserExistsError: 'Данный пользователь уже зарегестрировался',
		IncorrectPasswordError: 'Неправильный логин или пароль',
		IncorrectUsernameError: 'Неправильный логин или пароль'
	}
});

module.exports = mongoose.model('User', schema);