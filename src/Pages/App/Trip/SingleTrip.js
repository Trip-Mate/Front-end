import React, { Fragment, useContext, useEffect } from 'react';

import axios from 'axios';

import SingleTripContext from '../../../contexts/single-trip/single-trip.context';

const SingleTrip = ({ match }) => {

	/* getting single trip context */
	const { singleTrip, setSingleTrip } = useContext(SingleTripContext);

	/* getting single trip data */
	useEffect(() => {
		(async () => {
			try {

				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;

				/* getting current path */
				const url = match.url;

				/* getting authorized response */
				const res = await axios.get(`${url}`, {
					headers: {
						'x-auth-token': token,
					},
				});

				/* getting current trip */
				const trip = res.data[0];

				/* passing current trip data */
				setSingleTrip(trip);

			} catch (error) {
				console.log('Error', error.message);
			}
		})();
	}, [setSingleTrip]);
  
	return (
			<Fragment>
				<li>{singleTrip.title}</li>
				<li>{singleTrip.from}</li>
				<li>{singleTrip.to}</li>
				<li>{singleTrip.budget}</li>
				<li>{singleTrip.baseCurrency}</li>
				<img src={singleTrip.backgroundImage} />
			</Fragment>
		);
}

export default SingleTrip;
