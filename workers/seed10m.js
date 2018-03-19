const { MongoClient } = require('mongodb');
const assert = require('assert');
const generateData = require('./dataGenerator.js');

const URL = 'mongodb://localhost:27017';
const dbName = 'tests';
const collectionName = 'timelocations';

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected to DB');
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  seedData(collection, db);
});

let total = 0;
let batchNum = 100;
const increments = 100;
const limit = 10000000;
const processes = limit / batchNum;
const oneTenth = limit / 10;

async function seedData(collection, db) {
  console.time('Seed Time');
  for (let i = 0; i < processes; i += 1) {
    const data = generateData(total, batchNum);
    await collection.insertMany(data);
    total += increments;
    batchNum += increments;
    if (total % oneTenth === 0) {
      console.log(total);
    }
  }
  console.timeEnd('Seed Time');
  db.close();
  process.exit();
}

module.exports = {
  seed: seedData,
};
