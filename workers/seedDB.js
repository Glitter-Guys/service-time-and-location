const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const moment = require('moment');
const timeLocationModel = require('./../db/models/timeLocation.js');

mongoose.connect('mongodb://localhost/timeLocations');
///

// Randomly create fake data for occasional event as weekly or monthly
const createRandomSeries = () => {
  const seriesValues = [null, null, null, null, null, 'weekly', 'monthly'];
  const randomIdx = Math.floor(Math.random() * seriesValues.length);
  return seriesValues[randomIdx];
};

// Convert Meetup data to start and end time using Moment JS
const convertToStartEndTime = ({ local_date, local_time, duration }) => {
  const dateAndTimeMoment = moment(`${local_date} ${local_time}`);
  const startTime = dateAndTimeMoment.toDate();
  dateAndTimeMoment.add(duration, 'ms');
  const endTime = dateAndTimeMoment.toDate();
  return [startTime, endTime];
};

// Structure data
const structureEventData = (seriesValue, startTime, endTime, { id, venue }) => {
  const structuredEvent = { startTime, endTime };
  structuredEvent.eventId = id;
  structuredEvent.series = seriesValue;
  structuredEvent.venuePublic = false;
  if (venue) {
    structuredEvent.venuePublic = true;
    structuredEvent.venueName = venue.name;
    if (venue.address_1) structuredEvent.address1 = venue.address_1;
    if (venue.address_2) structuredEvent.address2 = venue.address_2;
    if (venue.address_3) structuredEvent.address3 = venue.address_3;
    structuredEvent.city = venue.city;
    structuredEvent.state = venue.state;
    if (venue.lon) structuredEvent.longitude = venue.lon;
    if (venue.lat) structuredEvent.latitude = venue.lat;
  }
  return structuredEvent;
};

const insertEachEvent = () => {
  // Parse each event in the JSON data file
  const pathToJSON = path.join(__dirname, './150UpcomingEvents.json');
  const jsonData = fs.readFileSync(pathToJSON);
  const parsedData = JSON.parse(jsonData);
  let counter = 0;

  parsedData.events.forEach((event) => {
    const seriesValue = createRandomSeries();
    const [startTime, endTime] = convertToStartEndTime(event);
    const structuredEvent = structureEventData(seriesValue, startTime, endTime, event);

    // Write to database
    timeLocationModel.insertModel(structuredEvent, (err) => {
      if (err) console.log(err);
      counter += 1;
      if (counter === parsedData.events.length) {
        mongoose.disconnect();
      }
    });
  });
};

insertEachEvent();

exports.createRandomSeries = createRandomSeries;
exports.convertToStartEndTime = convertToStartEndTime;
exports.structureEventData = structureEventData;
exports.insertEachEvent = insertEachEvent;
