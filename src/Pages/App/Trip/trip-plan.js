import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import SingleTripContext from '../../../contexts/single-trip/single-trip.context';
import Spinner from '../../../components/Spinner/Spinner';

// DayComponent needs to be implemented
// import Day from '../../../components/Day/Day.component';

const TripPlan = ({ match }) => {

	const { singleTrip: { days }, setSingleTrip } = useContext(SingleTripContext);
	const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
			(async () => {
				try {
					/* getting user token */
					const user = JSON.parse(localStorage.getItem('user'));
					const token = user.token;
					const tripID = match.params.id;

					/* getting authorized response */
					const res = await axios.get(`/trips/${tripID}/trip-plan`, {
						headers: {
							'x-auth-token': token,
						},
						params: {
							id: tripID,
						},
					});

					/* getting trip days */
					const daysIDs = await res.data;
					console.log('Days Data', daysIDs);

					/* passing days Ids to Use State Days*/
					setSingleTrip(daysIDs);
					setIsLoaded(true)
				} catch (error) {
					console.log('Error', error.message);
				}
			})();
		}, [match.params.id, setSingleTrip]);

	console.log('Days Context', days);
    
    return (
			/* Demo Container */
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					contentVisibility: 'auto',
					marginBottom: '60px',
				}}
			>
				{isLoaded ? !days?.length > 0 ? (
					<h2>
						There are no days in here{' '}
						<span role='img' aria-label='Sad face'>
							😖
						</span>
					</h2>
				) : (
					days.map((day, idx) => (
						<div
							key={day._id}
							style={{
								height: '20vh',
								width: '50vw',
								margin: '5%',
								border: '1px solid black',
							}}
						>
							Day: {idx + 1}
						</div>
					))
				) : <Spinner />}
			</section>
		);
};

export default TripPlan;