const mongo = require('mongodb');
const config = require('../config');

const mongoDbAdapter = {};

function connectToMongo(url, cb) {
  mongo.MongoClient.connect(url,{ useNewUrlParser: true },(err, db) => {
    if (err) {
        console.log('unable to connect to Mongo DB', 'error')
        }
    cb(err, db);
  });
}

function getData(collectioName, selector, db,client, cb) {
  db.collection(collectioName).find(selector).toArray((err, docs) => {
    if (!err) {
      client.close();
      cb(err, docs);
    } else {
      console.log(err, 'error');
      cb(err, null);
    }
  });
}

function getConnectionOnCollectionType(collectioName) {
  switch (collectioName) {
    default:
      return config.serverConfig().mongoConfig.burgerDB;
  }
}

mongoDbAdapter.find = function (collectioName, selector, cb) {
  connectToMongo(getConnectionOnCollectionType(collectioName), (err, client) => {
    var db = client.db('burger');
    if (!err) {
      getData(collectioName, selector, db,client, cb);
    } else {
      console.log(err, 'error');
      cb(err, null);
    }
  });
};


mongoDbAdapter.update = function (collectioName, selector, document, option, cb) {
  connectToMongo(getConnectionOnCollectionType(collectioName), (err, client) => {
    const db = client.db;    
    if (!err) {
      db.collection(collectioName).findOneAndUpdate(
        selector,
        { $set: document },
        option,
        (error, docs) => {
          if (!error) {
            client.close();
          } else {
            console.log(error, 'error');
          }
          cb(error, docs);
        },
      );
    }
  });
};

mongoDbAdapter.insert = function (collectioName, document, cb) {
  connectToMongo(getConnectionOnCollectionType(collectioName), (err, client) => {
    const db = client.db;    
    if (!err) {
      db.collection(collectioName).insert(document, (error, docs) => {
        if (!error) {
          client.close();
        }
        cb(error, docs);
      });
    }
  });
};

mongoDbAdapter.replaceOne = function (collectionName, filter, document, options, cb) {
  connectToMongo(getConnectionOnCollectionType(collectionName), (err, client) => {
    logAdapter.log(document);
    const db = client.db;  
    if (!err) {
      db.collection(collectionName).replaceOne(filter, document, options, (error, docs) => {
        if (!error) {
          client.close();
        }
        cb(error, docs);
      });
    }
  });
};


mongoDbAdapter.insertMany = function (collectionName, documents, cb) {
  connectToMongo(getConnectionOnCollectionType(collectionName), (err, client) => {
    const db = client.db;    
    if (!err) {
      db.collection(collectionName).insertMany(documents, (error, docs) => {
        if (!error) {
          client.close();
        }
        cb(error, docs);
      });
    }
  });
};


mongoDbAdapter.aggregate = function (collectionName, query, cb) {
  connectToMongo(getConnectionOnCollectionType(collectionName), (err, client) => {
    const db = client.db;    
    if (!err) {
      db.collection(collectionName).aggregate(query, (error, docs) => {
        if (!error) {
          client.close();
        }
        cb(error, docs);
      });
    }
  });
};


module.exports = mongoDbAdapter;
