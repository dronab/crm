let express = require('express'),
	Order = require('../models/order'),
    moment = require('moment'),
	router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
	Order.find()
        .then(orders => {
            orders = orders.map((order) => {
                order.time = moment(order.time).local('ru').format('DD MMMM YYYY');
                console.log(order);
                return order;
            });
            res.render('user', {
                username: req.user.username,
                title: 'Главная страница',
                order: orders
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;