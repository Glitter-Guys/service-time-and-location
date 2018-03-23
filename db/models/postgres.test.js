const pgp = require('pg-promise')({});
const path = require('path');
const seed = require('../workers/postgreSQL/postgresSeed.js');
const { QueryFile } = pgp;

const sql = (file) => {
  const filePath = path.join(__dirname, file);
  return new QueryFile(filePath, { minify: true });
};

xdescribe('tests for PostgreSQL', () => {
  let db;
  let schema;

  beforeAll((done) => {
    schema = sql('../db/models/create_schema.sql');
    db = pgp({
      host: 'localhost',
      port: 5432,
      database: 'test',
      user: 'Joe',
    });
    done();
  });

  beforeEach((done) => {
    db.any(schema, [true])
      .then((data) => {
        done();
      })
      .catch((error) => {
        console.log(error);
      });
    done();
  });

  afterAll((done) => {
    db = undefined;
  });
  test('test', (done) => {
    expect(2).toBe(2);
    done();
  });
  // test('getNextData should resolve to a array of length 20', (done) => {
  //   const data = seed.nextData(null, 1, 20, 1);
  //   expect(data).resolves.toHaveLength(20);
  //   done();
  // });
});
