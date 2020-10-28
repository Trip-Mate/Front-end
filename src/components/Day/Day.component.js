import React, { Fragment } from 'react';

/* Demo Component */

const Day = ({ day: { events, date, country, place, accommodation, attachments, photos } }) => (
    <Fragment>
        <h2>{country}</h2>
        <p>{date}</p>
    </Fragment>
);

export default Day;