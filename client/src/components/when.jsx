import React from 'react';
import SVG from 'react-inlinesvg';
import Moment from 'react-moment';
import TextSectionsStyle from './../../dist/styles/textSections.css';
import ReusableStyles from './../../dist/styles/reusable.css';


const When = ({ whenData }) => {
  const dateTimeFormat = 'dddd, MMMM D YYYY h:mm A';
  const dateFormat = 'dddd, MMMM D YYYY';
  const timeFormat = 'h:mm A';

  let seriesText = '';
  if (whenData.series) {
    if (whenData.series === 'weekly') {
      seriesText = 'Repeats every week';
    } else if (whenData.series === 'monthly') {
      seriesText = 'Repeats every month';
    }
  }

  return (
    <div className={TextSectionsStyle.textSection}>
      <div className={TextSectionsStyle.icon}>
        <SVG viewBox="0 0 24 24" height="24" width="24" src="../dist/icons/clock.svg" />
      </div>
      <div className="when__text">
        {whenData.multiDay ?
          <span>
            <span className="when__start">
              <Moment format={dateTimeFormat}>{whenData.startTime}</Moment>
            </span>
            <span className="when__end">
              to&nbsp;<Moment format={dateTimeFormat}>{whenData.endTime}</Moment>
            </span>
          </span>
        :
          <span>
            <span className="when__date">
              <Moment format={dateFormat}>{whenData.startTime}</Moment>
            </span>
            <span className="when__time">
              <Moment format={timeFormat}>{whenData.startTime}</Moment>&nbsp;to&nbsp;
              <Moment format={timeFormat}>{whenData.endTime}</Moment>
            </span>
          </span>
        }
        <span data-test="when__series" className={ReusableStyles.secondaryText}>{seriesText}</span>
      </div>
    </div>
  );
};

export default When;
