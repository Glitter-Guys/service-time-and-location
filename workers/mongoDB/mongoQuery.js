const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017';
const dbName = 'YouDown';
const collectionName = 'timelocations';

let db;
let collection;

MongoClient.connect(URL, (err, client) => {
  db = client.db(dbName);
  collection = db.collection(collectionName);
  query((error, count) => {
    if (error) throw error;
    // console.log('Average read time ', time / 10);
    console.log(count, 'was queried');
    client.close();
  });
});

function generateRandomID() {
  return Math.floor(Math.random() * 10000000);
}

async function query(callback) {
  let counter = 0;
  for (let i = 0; i < 10; i += 1) {
    console.time('Single Query Time');
    const id = generateRandomID();
    const data = await collection.findOne({ eventId: id });
    console.log('searching for event id', id);
    counter += 1;
    console.timeEnd('Single Query Time');
  }
  callback(null, counter);
}
