const pgp = require('pg-promise');

const createTable = async() => {
  let db = pgp({
    host: 'localhost',
    port: 5554,
    database: 'timelocations',
    user: 'Joe',
  });
  await db.none
};