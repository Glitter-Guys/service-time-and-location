const faker = require('faker');


// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, 'weekly', 'monthly'];
  const randomIdx = Math.floor(Math.random() * seriesValues.length);
  return seriesValues[randomIdx];
};

const createSingleData = (id) => {
  const data = {
    eventId: id,
    startTime: faker.date.past(),
    endTime: faker.date.future(),
    series: createRandomSeries(),
    venuePublic: Math.random() >= 0.5,
    venueName: faker.company.companyName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
  };
  return data;
};

const createDataNTimes = (start, increment) => {
  const data = [];
  const end = start + increment;
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
