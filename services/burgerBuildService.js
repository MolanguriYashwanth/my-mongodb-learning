const burgerBuildService = {};
const mongoAdapter = require('../adapters/mongodbAdapter');

function getBurgerDetailsFromMongo(cb) {
    mongoAdapter.find(
        'test',
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


module.exports = burgerBuildService;
