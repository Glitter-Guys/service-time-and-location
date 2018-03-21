const { MongoClient } = require('mongodb');
// const seed = require('../workers/seed10m.js');
const generateData = require('../workers/dataGenerator.js');

const URL = 'mongodb://locahost:27017';
const dbName = 'tests';
const collectionName = 'timelocations';

describe('Tests for MongoDB', () => {
  let db;
  let collection;

  beforeAll((done) => {
    MongoClient.connect(URL, (err, client) => {
      if (err) throw err;
      db = client.db(dbName);
      collection = db.collection(collectionName);
      done();
    });
  });
  afterAll((done) => {
    collection.remove({}, (err, success) => {
      if (err) throw err;
      client.close();
      done();
    });
  });

  test('should create an array of 500 data points', (done) => {
    const start = 0;
    const end = 500;
    const data = generateData(start, end);
    console.log(data.length);
    expect(data.length).toBe(500);
    done();
  });
});
