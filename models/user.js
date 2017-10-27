let beautifyUnique = require('mongoose-beautiful-unique-validation'),
	mongoose = require('../bin/mongoose'),
	passportLocalMongoose = require('passport-local-mongoose'),
	Schema = mongoose.Schema;

let schema = new Schema({
	username: {
		type: String,
		unique: 'Пользователь {VALUE} уже существует',
		required: true
	},
	password: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.plugin(beautifyUnique);
schema.plugin(passportLocalMongoose, {
	errorMessages: {
		UserExistsError: 'Данный пользовательуже зарегестрировался'
	}
});

module.exports = mongoose.model('User', schema);