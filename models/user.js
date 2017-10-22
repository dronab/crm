let crypto = require('crypto'),
    beautifyUnique = require('mongoose-beautiful-unique-validation'),
    mongoose = require('../bin/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    username: {
        type: String,
        unique: 'Пользователь {VALUE} уже существует',
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(beautifyUnique);

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', schema);