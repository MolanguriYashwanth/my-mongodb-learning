const burgerBuildService = {};
import mongoAdapter from "../adapters/mongodbAdapter";
import loginMiddleWare from "../middleware";
function getBurgerDetailsFromMongo(cb) {
  mongoAdapter.find(
    'orders',
    {}
    , cb,
  );
}
burgerBuildService.getQueryOutput = function (req, res) {
  var decodedMessage = loginMiddleWare.checkTokenForAuthentication(req.headers['authorization']);
  console.log("DM", decodedMessage);
  if (decodedMessage.username === "admin@gmail.com") {
    getBurgerDetailsFromMongo((err, document) => {
      if (err) {
        console.log('Error', err)
        return;
      }
      res.status(200).send(document);
    });
  } else {
    res.status(404).send(decodedMessage);
  }
};

burgerBuildService.storeOrdersinDB = function (req, res) {
  var decodedMessage = loginMiddleWare.checkTokenForAuthentication(req.headers['authorization']);
  const reqBody = JSON.parse(JSON.stringify(req.body));
  if (decodedMessage.username === "admin@gmail.com") {
    mongoAdapter.insert(
      'orders',
      reqBody
      , ((err, docs) => {
        if (err) {
          console.log('Error', err)
          return;
        }
        res.status(200).send(docs);
      })
    );
  }
}


module.exports = burgerBuildService;
