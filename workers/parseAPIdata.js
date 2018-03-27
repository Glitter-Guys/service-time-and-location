const moment = require("moment");

const createWhereData = ({
  venuePublic,
  venueName,
  address1,
  address2,
  address3,
  city,
  state,
  longitude,
  latitude
}) => {
  let whereData = { venuePublic };
  if (venuePublic) {
    whereData = {
      venuePublic,
      venueName,
      city,
      state
    };
    if (address1) whereData.address1 = address1;
    if (address2) whereData.address2 = address2;
    if (address3) whereData.address3 = address3;
    if (longitude) whereData.longitude = longitude;
    if (latitude) whereData.latitude = latitude;
  }
  return whereData;
};

const createWhenData = ({ startTime, endTime, series }) => {
  const whenData = { startTime, endTime, series };
  const startDate = moment(startTime).format("MM-DD-YYYY");
  const endDate = moment(endTime).format("MM-DD-YYYY");
  if (startDate !== endDate) {
    whenData.multiDay = true;
  }
  return whenData;
};

module.exports = {
  createWhenData: createWhenData,
  createWhereData: createWhereData,
};
