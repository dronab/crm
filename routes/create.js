let express = require('express'),
    Order = require('../models/order'),
    multiparty = require('multiparty'),
    router = express.Router();

router.post('/zakaz', (req, res) => {
    /** Приходит Post запроо от ajax и обрабатывается тут*/
   let form = new multiparty.Form();
    console.log(req.body);

    form.on('error', (err) => {
      console.log('Ошибка парсинга формы '+err);
   });

   form.on('part', (part) => {
      // if(!part.filename){
      //    console.log('Поле содержит текст '+ part.name);
      //    part.resume();
      // }
      if(part.filename){
         console.log('Поле содержит файл ' + part.name);
          part.resume();
      }
   });

   /** После успешной сохранение происходит close*/
    form.on('close', () => {
       console.log('Зарузка завершена');
    });

   form.parse(req);
   // console.log(req);
   // if (!req.body) res.send(false);
   // let order = new Order(req);
   res.send(true);
   // order.save()
   //     .then((order) => console.log('Сохранеине объекта '+order))
   //     .catch((err) => console.log('Произошла ошибка '+err));
});

module.exports = router;