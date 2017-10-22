let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Авторизация' });
});

router.get('/registration', (req, res, next) => {
    res.render('registration', {
        title: 'Регитрация',
    })
});

router.post('/registration', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    let data = new User(user);
    data.save().then((doc) => {
        console.log('Сохранение объекта', doc);
        res.redirect('/')
    }).catch((err) => {
        console.error(err);
        res.render('registration', {
            title: 'Регистрация',
            message: err.errors.username
        });
    })
});

module.exports = router;
