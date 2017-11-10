let express = require('express'),
	Order = require('../models/order'),
	router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
	Order.find()
        .then(orders => {
            res.render('user', {
                username: req.user.username,
                title: 'Главная страница',
                order: orders
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;