const generator = require('../dataGenerator.js');

async function seedData(collection, db, start, batch, increments, totalEntries, callback) {
  console.time('Seed Time');
  let total = start;
  let batchSize = batch;
  const amountOfBatches = totalEntries / batchSize;
  try {
    for (let i = 0; i < amountOfBatches; i += 1) {
      const data = generator.createNData(total, batchSize);
      await collection.insertMany(data);
      total += increments;
      batchSize += increments;
      if (total % (totalEntries / 10) === 0) {
        console.log(total);
      }
    }
  } catch (error) {
    callback(error);
  }
  console.timeEnd('Seed Time');
  callback(null, 'successful seed');
  // db.close();
  // process.exit();
}

module.exports = seedData;
