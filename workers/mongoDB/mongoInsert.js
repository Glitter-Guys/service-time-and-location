const generator = require('../dataGenerator.js');

async function insertData(collection, db, batchSize, totalEntries, callback) {
  console.time('Seed Time');
  console.log('Seeding Begins');
  let totalSeeded = 0;
  const amountOfBatches = totalEntries / batchSize;
  try {
    for (let i = 0; i < amountOfBatches; i += 1) {
      const data = generator.createNData(totalSeeded, batchSize);
      await collection.insertMany(data);
      totalSeeded += batchSize;
      if (totalSeeded % (totalEntries / 10) === 0) {
        console.log(totalSeeded, 'entries seeded');
      }
    }
    console.log('Seeding finished');
    console.log('creating indexes');
    await collection.createIndex({ eventId: 1 });
    console.log('indexing done');
  } catch (error) {
    callback(error);
  }
  console.timeEnd('Seed Time');
  callback(null, 'successful seed');
}

module.exports = insertData;
