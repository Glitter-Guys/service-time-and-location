const pgp = require('pg-promise')({});
const generator = require('./dataGenerator.js');
const path = require('path');
const columnSet = require('../db/models/columnSet.js');

const { QueryFile } = pgp;

const sql = (file) => {
  const filePath = path.join(__dirname, file);
  return new QueryFile(filePath, { minify: true });
};

const schema = sql('../db/models/create_schema.sql');
const table = sql('../db/models/create_table.sql');
const tableName = { table: 'data' };

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
    database: 'timelocations',
    user: 'Joe',
  });
  return db.none(table).then(() => db);
};

function getNextData(t, pageIndex) {
  let data = null;
  if (pageIndex < 10000) {
    if (pageIndex % 1000 === 0) {
      console.log(pageIndex * 1000);
    }
    data = [];
    batchAmount = 1000;
    for (let i = 0; i < batchAmount; i += 1) {
      const id = (pageIndex * batchAmount) + i;
      data.push(generator.camelToUnder(generator.createSingleData(id)));
    }
  }
  return Promise.resolve(data);
}

const seed = async () => {
  console.time('Seed Time');
  const db = await createTable();
  const cs = new pgp.helpers.ColumnSet(columnSet, tableName);
  const response = await db.tx('massive-insert', (t) => {
    return t.sequence((index) => {
      return getNextData(t, index)
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
