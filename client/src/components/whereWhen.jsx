import React from 'react';
import When from './when.jsx';
import Where from './where.jsx';
import Map from './map.jsx';
import WhereWhenStyles from './../../dist/styles/whereWhen.css';

export default class WhereWhen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whereData: {},
      whenData: {},
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const urlEnd = url.split('/event/')[1];
    const eventId = urlEnd.split('/')[0];
    fetch(`http://127.0.0.1:9000/api/event/${eventId}`).then((response) => {
      return response.json();
    }).then((jsonData) => {
      console.log(jsonData);
      this.setState({
        whereData: jsonData.whereData,
        whenData: jsonData.whenData,
      });
    }).catch((err) => {
      throw new Error(err);
    });
  }

  render() {
    const { whereData } = this.state;
    return (
      <div className={WhereWhenStyles.whereWhen}>
        <When whenData={this.state.whenData} />
        <Where whereData={whereData} />
        {whereData.venueName &&
          <Map
            latitude={whereData.latitude}
            longitude={whereData.longitude}
            whereData={whereData}
          />
        }
      </div>
    );
  }
}
