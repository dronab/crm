let express = require('express'),
	Order = require('../models/order'),
    moment = require('moment'),
	router = express.Router();

moment.updateLocale('ru', {
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

/* GET users listing. */
router.get('/', (req, res) => {
	Order.find().lean()
        .then(orders => {
            orders = orders.map((order) => {
                if (order.status === 0){
                    order.status = 'Новый';
                } else if (order.status === 1){
                    order.status = 'Дизайнера';
                } else if (order.status === 2){
                    order.status = 'Мастера';
                }
                order.time = moment(order.time).local('ru').format('DD MMMM YYYY H:mm');
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