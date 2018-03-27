function generateRandomID(max) {
  return Math.floor(Math.random() * max);
}

async function randomQueries(collection, max, callback) {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    console.time('Single Query Time');
    const id = generateRandomID(max);
    const result = await collection.findOne({ eventId: id });
    console.log('searching for event id', id);
    data.push(result);
    console.timeEnd('Single Query Time');
  }
  callback(null, data);
}

function singleQuery(collection, redis, id, callback) {
  redis.get(id, (err, reply) => {
    if (err) callback(null);
    else if (reply) callback(null, JSON.parse(reply));
    else {
      collection
        .findOne({ eventId: id })
        .then((data) => {
          redis.set(id, JSON.stringify(data), () => {
            callback(null, data);
          });
        })
        .catch((error) => {
          throw error;
        });
    }
  });
}

module.exports = {
  singleQuery: singleQuery,
  randomQueries: randomQueries,
};
