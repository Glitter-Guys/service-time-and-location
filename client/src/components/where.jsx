import React from 'react';
import SVG from 'react-inlinesvg';
import TextSectionsStyle from './../../dist/styles/textSections.css';
import ReusableStyles from './../../dist/styles/reusable.css';

const Where = ({ whereData }) => (
  <div className={TextSectionsStyle.textSection}>
    <div className={TextSectionsStyle.icon}>
      <SVG viewBox="0 0 24 24" height="24" width="24" src="../dist/icons/location.svg" />
    </div>
    <div className="where__text">
      {whereData.venuePublic ?
        <span>
          <span>{whereData.venueName}</span>
          <address className={ReusableStyles.secondaryText}>
            {whereData.address1}
            {whereData.address2}
            {whereData.address3} ∙ {whereData.city}
          </address>
        </span>
      : <span className="where__default">Needs a location</span>}
    </div>
  </div>
);

export default Where;
