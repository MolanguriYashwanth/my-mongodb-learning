const burgerBuildService = {};
import mongoAdapter from "../adapters/mongodbAdapter";
import loginMiddleWare from "../middleware";
function getBurgerDetailsFromMongo(userId,cb) {
  mongoAdapter.find(
    'orders',
    {
      "userId":userId
    }
    , cb,
  );
}
burgerBuildService.getQueryOutput = function (req, res) {
  var decodedMessage = loginMiddleWare.checkTokenForAuthentication(req.headers['authorization']);
  var userId = req.query.userId;
  console.log("DM", decodedMessage);
  if (decodedMessage.username === "admin@gmail.com") {
    getBurgerDetailsFromMongo(userId,(err, document) => {
      if (err) {
        console.log('Error', err)
        return;
      }
      document.loginExpiresIn = decodedMessage.exp;
      res.status(200).send(document);
    });
  } else {
    res.status(401).send(decodedMessage);
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
