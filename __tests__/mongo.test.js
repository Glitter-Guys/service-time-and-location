const { MongoClient } = require('mongodb');
const insert = require('../workers/mongoDB/mongoInsert.js');
const query = require('../workers/mongoDB/mongoQuery.js');

const URL = 'mongodb://localhost:27017/';
const dbName = 'tests';
const collectionName = 'timelocations';

describe('Tests for MongoDB', () => {
  let connection;
  let db;
  let collection;

  beforeAll((done) => {
    MongoClient.connect(URL, (err, client) => {
      if (err) throw err;
      connection = client;
      db = connection.db(dbName);
      collection = db.collection(collectionName);
      done();
    });
  });
  afterAll((done) => {
    collection.remove({}, (err, succ) => {
      if (err) throw err;
      connection.close();
      done();
    });
  });

  test('should insert 10,000 data points into timelocations', async (done) => {
    await insert(collection, db, 1000, 10000, (err, succ) => {
      if (err) throw err;
      collection.count({}, (error, count) => {
        expect(count).toBe(10000);
        expect(succ).toBe('successful seed');
        done();
      });
    });
  });
  test('should query event id 123', (done) => {
    query.singleQuery(collection, 123, (err, data) => {
      if (err) throw err;
      expect(data.eventId).toBe(123);
      expect(typeof data).toBe('object');
      done();
    });
  });
  test('should query 10 random ids', (done) => {
    query.randomQueries(collection, 10000, (err, data) => {
      if (err) throw err;
      console.log(collection);
      console.log('queried data',data);
      expect(data.length).toBe(10);
      expect(typeof data[9]).toBe('object');
      done();
    });
  });
});
