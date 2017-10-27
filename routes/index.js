const express = require('express'),
	passport = require('passport'),
	localPassport = require('../boot/passport'),
	User = require('../models/user');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { user: req.user });
});

// router.post('/', passport.authenticate('local'), (req, res) => {
// 	res.redirect('/users');
// });
router.post('/', (req, res) => {
	User.register({username: 'username'}, 'password', (err, user) => {
		if (err){
			return res.render('index', {message: err});
		}
		User.authenticate('username', 'password', (err, result) => {
			if(err){
				return res.render('index', {message: err});
			}
			console.log(result);
			res.redirect('/users');
		});
	});
});

router.get('/registration', (req, res) => {
	res.render('registration', {
	});
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

module.exports = router;
