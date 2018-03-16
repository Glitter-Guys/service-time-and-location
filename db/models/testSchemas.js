const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const testSchema = mongoose.Schema({
  eventId: {
    type: Number,
    unique: true,
  },
  time: Date,
  venueName: String,
  address: String,
});

const TestModel = mongoose.model('TestModel', testSchema);

function insertModel(data) {
  TestModel.create(data);
}

function findAll(cb) {
  TestModel.find().sort({ eventId: -1 }).exec(cb);
}

function test() {
  return 1 + 1;
}

// findAll((err, data) => {
//   if (err) console.log('error');
//   console.log(data.length);
// });

module.exports = {
  t: test,
  model: TestModel,
  insert: insertModel,
  all: findAll,
};
