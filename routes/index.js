let express = require('express'),
	passport = require('passport'),
	localPassport = require('../boot/passport'),
	User = require('../models/user');

let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	req.isAuthenticated()
		? res.redirect('/users')
		: res.render('index', { user: req.user, title: 'Авторизация' });
});

router.post('/', (req, res) => {
	let authenticate = User.authenticate();
	authenticate(req.body.username, req.body.password, (err, result) => {
		if (err) {
			return res.render('index', {message: err});
		}
		if (result === false){
			return res.render('index', {message: 'Неверный логи или пароль'});
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/users');
		});
	});
});

router.get('/registration', (req, res) => {
	req.isAuthenticated()
		? res.redirect('/users')
		: res.render('registration', {title: 'Регистрация'});
});

router.post('/registration', (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, account) => {
		if(err){
			return res.render('registration', {account: account, message: err.message});
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
