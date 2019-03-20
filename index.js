const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
const databaseAddress = 'mongodb://localhost:27017/socialmanager';
const dbName = 'socialmanager';
const collectionName = 'posts';

// Connection establishes connection to DB and executes custom search
function _dbSearcher(dbAddress, dbName, collectionName, sender) {
  MongoClient.connect(dbAddress, function (err, client) {
    if (err) throw err;

    var db = client.db(dbName);
    db.collection(collectionName).find().toArray((err, result) => {
      if (err) throw err;
      sender.send(result);
    })
  })
}




app.use(express.static('public'))

app.get('/', (req, res) => {
  // _dbSearcher(databaseAddress, dbName, collectionName, res)
  res.renderFile('index.html');
});

app.get('/posts', (req, res) => {
  _dbSearcher(databaseAddress, dbName, collectionName, res)
});

app.listen(8000, () => {
  console.log('Server is indeed running');
});
