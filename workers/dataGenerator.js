const faker = require('faker');
// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, "weekly", "monthly"];
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

module.exports = createDataNTimes;
