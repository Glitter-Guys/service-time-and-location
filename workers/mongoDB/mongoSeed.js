const { MongoClient } = require('mongodb');
const assert = require('assert');
const insert = require('./mongoInsert.js');
const query = require('./mongoQuery.js');

const URL = 'mongodb://localhost:27017';
const dbName = 'YouDown';
const collectionName = 'timelocations';

const batchSize = 1000;
const totalEntries = 10000000;

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected to DB');
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  insert(collection, db, batchSize, totalEntries, (error, success) => {
    if (error) throw error;
    console.log(success);
    client.close();
  });
});

module.exports = {
  insert: insert,
  query: query,
};
