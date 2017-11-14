let express = require('express'),
    Order = require('../models/order'),
    multipart = require('connect-multiparty'),
    path = require('path'),
    router = express.Router();

function orderSave(req) {
    return new Promise((resolve, reject) => {
        if(!req.body) reject(false);
        let order = new Order(req.body);
        order.save() ? resolve(true) : reject(false);
    });
}

router.post('/order', multipart({uploadDir: path.join(__dirname, '../public/upload/')}), (req, res) => {
   orderSave(req)
       .then((orders) => res.send(orders))
       .catch((err) => res.send(err));
});

module.exports = router;