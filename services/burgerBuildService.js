const burgerBuildService = {};
const mongoAdapter = require('../adapters/mongodbAdapter');

function getBurgerDetailsFromMongo(cb) {
    mongoAdapter.find(
        'orders',
          {}
        , cb,
      ); 
    }
burgerBuildService.getQueryOutput = function (req, res) {
    getBurgerDetailsFromMongo((err, document) => {
    if (err) {
      console.log('Error',err)  
      return;
    }
    res.status(200).send(document);
  });
};

burgerBuildService.storeOrdersinDB = function(req,res){
  console.log(req.body);
  const reqBody = JSON.parse(JSON.stringify(req.body));
  mongoAdapter.insert(
    'orders',
    reqBody
    , ((err, docs) => {
      if (err) {
        console.log('Error',err)  
        return;
      }
      res.status(200).send(docs);
    })
  ); 
}


module.exports = burgerBuildService;
