require('newrelic');
// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const webpackOptions = require('./../webpack.config.js');
// const eventDB = require('./../db/models/timeLocation.js');
// const compiler = webpack(webpackOptions);
const cors = require('cors');
const path = require('path');
const express = require('express');
const parse = require('../workers/parseAPIdata.js');
const redisClient = require('redis').createClient;
const { MongoClient } = require('mongodb');

const redis = redisClient(6379, 'localhost');
const DB = require('../workers/mongoDB/mongoQuery.js');

const URL = 'mongodb://localhost:27017';
const dbName = 'YouDown';
const collectionName = 'timelocations';

const app = express();
app.use(cors());

let db;
let collection;

MongoClient.connect(URL, (err, client) => {
  if (err) throw 'Error connecting to database -' + err;
  db = client.db(dbName);
  collection = db.collection(collectionName);

  // Comment this line out for proxy server
  app.use('/event/:eventid', express.static(path.join(__dirname, './../client/dist')));

  // Comment the line in for proxy server
  // app.use(express.static(path.join(__dirname, './../client/dist')));

  // app.use(middleware(compiler, {
  //   publicPath: webpackOptions.output.publicPath,
  // }));

  app.get('/api/event/:eventid', (req, res) => {
    const eventId = Number(`${(req.params.eventid)}`);
    DB.singleQuery(collection, redis, eventId, (errr, eventDataFromAPI) => {
      if (errr) {
        res.status(500).send({ error: errr });
      } else {
        res.status(200).json({
          whereData: parse.createWhereData(eventDataFromAPI),
          whenData: parse.createWhenData(eventDataFromAPI),
        });
      }
    });
  });
  app.listen('9000', '127.0.0.1', () => console.log('Listening on http://127.0.0.1:9000'));
});
