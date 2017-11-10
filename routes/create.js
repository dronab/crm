let express = require('express'),
    Order = require('../models/order'),
    router = express.Router();

router.post('/zakaz', (req, res) => {
   console.log(req.body);
   if (!req.body) res.send(false);
   let order = new Order(req);
   res.send(true);
   // order.save()
   //     .then((order) => console.log('Сохранеине объекта '+order))
   //     .catch((err) => console.log('Произошла ошибка '+err));
});

module.exports = router;