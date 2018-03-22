const faker = require('faker');


// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, 'weekly', 'monthly'];
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
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (/[A-Z]/.test(keys[i])) {
      newObj[keys[i].replace(/([A-Z])/g, '_$1').toLowerCase()] = obj[keys[i]];
    } else {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
}


module.exports = {
  randomSeries: createRandomSeries,
  createNData: createDataNTimes,
  createSingleData: createSingleData,
  camelToUnder: camelToUnderscore,
};
