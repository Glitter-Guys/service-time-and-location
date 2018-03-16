const { MongoClient } = require('mongodb');
const faker = require('faker');

const URL = 'mongodb://localhost:27017';

// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, 'weekly', 'monthly'];
  const randomIdx = Math.floor(Math.random() * seriesValues.length);
  return seriesValues[randomIdx];
};

const createFakeData = (i) => {
  const data = {};
  data.eventId = i;
  data.startTime = faker.date.past();
  data.endTime = faker.date.future();
  data.series = createRandomSeries();
  data.series = Math.random() >= 0.5;
  data.venueName = faker.company.companyName();
  data.address = faker.address.streetAddress();
  data.city = faker.address.city();
  data.state = faker.address.state();
  data.longitude = faker.address.longitude();
  data.latitude = faker.address.latitude();
  return data;
};

const createDataNTimes = (start, end) => {
  const data = [];
  for (let i = start; i < end; i += 1) {
    data.push(createFakeData(i));
  }
  return data;
};

let total = 0;
let batchNum = 10;
const increments = 10;
const limit = 10000000;
const processes = limit / batchNum;
const oneTenth = limit / 10;

async function seedData() {
  const client = await MongoClient.connect(URL);
  const db = client.db('tests');
  const collection = db.collection('timelocations');
  const begin = new Date().getTime() / 60000;
  for (let i = 0; i < processes; i += 1) {
    const data = createDataNTimes(total, batchNum);
    await collection.insertMany(data);
    total += increments;
    batchNum += increments;
    if (total % oneTenth === 0) {
      console.log(total);
    }
  }
  const end = new Date().getTime() / 60000;
  const time = (end - begin).toFixed(4);
  console.log('Execution time: ' + time + ' minutes');
  client.close();
  process.exit();
}

seedData();

module.exports = {
  seed: seedData,
  createData: createDataNTimes,
};
