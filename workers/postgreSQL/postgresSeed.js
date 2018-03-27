const pgp = require('pg-promise')({});
const generator = require('../dataGenerator.js');
const path = require('path');
const columnSet = require('./columnSet.js');

const { QueryFile } = pgp;

const sql = (file) => {
  const filePath = path.join(__dirname, file);
  return new QueryFile(filePath, { minify: true });
};

const schema = sql('./create_schema.sql');
const table = sql('./create_table.sql');
const tableName = { table: 'timelocations' };

const createTable = async () => {
  let db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'Joe',
  });
  await db.none(schema);
  db.$pool.end;
  db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'events',
    user: 'Joe',
  });
  return db.none(table).then(() => db);
};

function getNextData(t, pageIndex, batchSize, amountOfBatches) {
  let data = null;
  const oneTenth = amountOfBatches / 10;
  if (pageIndex < amountOfBatches) {
    if (pageIndex % oneTenth === 0) {
      console.log(pageIndex * batchSize);
    }
    data = [];
    for (let i = 0; i < batchSize; i += 1) {
      const id = (pageIndex * batchSize) + i;
      data.push(generator.camelToUnder(generator.createSingleData(id)));
    }
  }
  return Promise.resolve(data);
}

const batchSize = 1000;
const amountOfBatches = 10000;

const seed = async () => {
  const db = await createTable();
  const cs = new pgp.helpers.ColumnSet(columnSet, tableName);
  console.time('Seed Time');
  const response = await db.tx('massive-insert', (t) => {
    return t.sequence((index) => {
      return getNextData(t, index, batchSize, amountOfBatches)
        .then((data) => {
          if (data) {
            const insert = pgp.helpers.insert(data, cs);
            return t.none(insert);
          }
        });
    });
  });
  // await db.none(index);
  console.timeEnd('Seed Time');
  console.log('Total batches:', response.total, ', Duration:', response.duration / 60000);
  db.$pool.end;
};

seed();

exports.module = {
  nextData: getNextData,
};
