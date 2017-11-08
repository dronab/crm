let passport = require('passport'),
	User = require('../models/user'),
	localPassport = require('passport-local').Strategy;

passport.use(new localPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = localPassport;