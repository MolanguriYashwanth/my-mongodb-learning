const burgerIngredientsService = {};
const mongoAdapter = require('../adapters/mongodbAdapter');

function getIngredientDetailsFromMongo(cb) {
    mongoAdapter.find(
        'ingredients',
          {}
        , cb,
      ); 
    }
burgerIngredientsService.getQueryOutput = function (req, res) {
    getIngredientDetailsFromMongo((err, document) => {
    if (err) {
      console.log('Error',err)  
      return;
    }
    res.status(200).send(document);
  });
};


module.exports = burgerIngredientsService;
