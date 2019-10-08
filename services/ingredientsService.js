const ingredientservice = {};
import mongoAdapter from "../adapters/mongodbAdapter";

ingredientservice.storeOrdersinDB = function (req, res) {
  const reqBody = JSON.parse(JSON.stringify(req.body));
    mongoAdapter.insert(
      'mydatatest',
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

function getIngredientDetailsFromMongo(cb) {
    mongoAdapter.find(
      'mydatatest',
      {}
      , cb,
    );
  }
  ingredientservice.getQueryOutput = function (req, res) {
      getIngredientDetailsFromMongo((err, document) => {
        if (err) {
          console.log('Error', err)
          return;
        }
        res.status(200).send(document);
      });
  };

  function getIngredientDetailsFromMongoByTitle(title,cb) {
    mongoAdapter.find(
      'mydatatest',
      {"title":title}
      , cb,
    );
  }
  ingredientservice.getQueryOutputByTitle = function (req, res) {
    var title = req.query.title;
      getIngredientDetailsFromMongoByTitle(title,(err, document) => {
        if (err) {
          console.log('Error', err)
          return;
        }
        res.status(200).send(document);
      });
  };
ingredientservice.removeIngredientBasedOnId = function(req,res){
    var id = req.query.deletedId;
    var title = req.query.title;
    var lastTryObject = {"_id": { "$oid" : id }}
    var titlleTestObj = {"title":title};
    mongoAdapter.deleteOne('mydatatest',titlleTestObj,((err, docs) => {
        if (err) {
          console.log('Error', err)
          return;
        }
        res.status(200).send(docs);
      }))
}

module.exports = ingredientservice;
