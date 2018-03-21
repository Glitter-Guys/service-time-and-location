const faker = require('faker');


// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, "weekly", "monthly"];
  const randomIdx = Math.floor(Math.random() * seriesValues.length);
  return seriesValues[randomIdx];
};

const createSingleData = (i) => {
  const data = {};
  data.eventId = i;
  data.startTime = faker.date.past();
  data.endTime = faker.date.future();
  data.series = createRandomSeries();
  data.venuePublic = Math.random() >= 0.5;
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
    data.push(createSingleData(i));
  }
  return data;
};

function camelToUnderscore(obj) {
  const newObj = {};
  for (let key in obj) {
    newObj[key.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[key];
  }
  return newObj;
}


module.exports = {
  createNData: createDataNTimes,
  createSingleData: createSingleData,
  camelToUnder: camelToUnderscore,
};
