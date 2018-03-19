const seed = require('../workers/seed10m.js');
const db = require('../db/models/testSchemas.js');
const mongoose = require('mongoose');

describe('Seeding Tests', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/test');
  });
  afterEach(async (done) => {
    await mongoose.connection.test.dropCollection('testmodels');
  });
  afterAll((done) => {
    mongoose.disconnect(done);
  });
  test('1 + 1', () => {
    expect(db.t()).toBe(2);
  });
  test('seed 5000 data points', async () => {
    db.all((err, data) => {
      if (err) console.log('error');
      expect(data.length).toBe(5000);
    });
  });
});
