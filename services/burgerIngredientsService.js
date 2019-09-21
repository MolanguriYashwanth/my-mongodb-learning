const burgerIngredientsService = {};
const mongoAdapter = require('../adapters/mongodbAdapter');
import loginMiddleWare from "../middleware";

function getIngredientDetailsFromMongo(cb) {
  mongoAdapter.find(
    'ingredients',
    {}
    , cb,
  );
}
burgerIngredientsService.getQueryOutput = function (req, res) {
  var decodedMessage = loginMiddleWare.checkTokenForAuthentication(req.headers['authorization']);
  if (decodedMessage.username === "admin@gmail.com") {
    getIngredientDetailsFromMongo((err, document) => {
      if (err) {
        console.log('Error', err)
        return;
      }
      res.status(200).send(document);
    });
  }
};


module.exports = burgerIngredientsService;
