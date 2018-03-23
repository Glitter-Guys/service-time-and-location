const generator = require('../workers/dataGenerator.js');

describe('tests for data generator', () => {
  test('should create an obj data point with correct value types', (done) => {
    const data = generator.createSingleData();
    expect(typeof data).toBe('object');
    expect(typeof data.startTime).toBe('object');
    expect(typeof data.endTime).toBe('object');
    expect(typeof data.venuePublic).toBe('boolean');
    expect(typeof data.venueName).toBe('string');
    expect(typeof data.address).toBe('string');
    expect(typeof data.city).toBe('string');
    expect(typeof data.state).toBe('string');
    expect(typeof data.longitude).toBe('string');
    expect(typeof data.latitude).toBe('string');
    done();
  });
  test('should return a random series', (done) => {
    const series = generator.randomSeries();
    expect(typeof JSON.stringify(series)).toBe('string');
    done();
  });
  test('should create an array of 10 objects', (done) => {
    const array = generator.createNData(10);
    expect(Array.isArray(array)).toBe(true);
    expect(typeof array[0]).toBe('object');
    expect(array.length).toBe(10);
    done();
  });
  test('should change only camel cases to underscores', (done) => {
    const obj = {
      camelCase: 1,
      upper_case: 2,
      lowerCase: 3,
      case: 4,
    };
    const newObj = generator.camelToUnder(obj);
    const objKeys = Object.keys(obj);
    const newObjKeys = Object.keys(newObj);
    expect(newObjKeys.length).toBe(objKeys.length);
    expect(newObjKeys[0]).toBe('camel_case');
    expect(newObjKeys[1]).toBe('upper_case');
    expect(newObjKeys[2]).toBe('lower_case');
    expect(newObjKeys[3]).toBe('case');
    done();
  });
});
