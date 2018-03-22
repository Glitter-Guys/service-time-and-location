const { MongoClient } = require('mongodb');
const assert = require('assert');
const seed = require('./mongoInsert.js');

const URL = 'mongodb://localhost:27017';
const dbName = 'tests';
const collectionName = 'timelocations';

const total = 0;
const batchSize = 100;
const increments = 100;
const totalEntries = 10000000;

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected to DB');
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  seed(collection, db, total, batchSize, increments, totalEntries, (error, success) => {
    if (error) throw error;
    console.log(success);
    client.close();
  });
});
