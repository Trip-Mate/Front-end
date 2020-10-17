import React, { useEffect, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import SingleTripContext from '../../../../contexts/single-trip/single-trip.context';
import Days from './Days'
import axios from 'axios';
import BottomNavigation from '../../../../components/layout/BottomNavigation';

const useStyles = makeStyles({
	title: {
    width: '100%',
    textAlign: 'center',
	},
});

const TripPlan = ({ match }) => {
    const classes = useStyles();
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
			<Typography className={classes.title} component='h1' variant='h6'>
				{singleTrip.title}
			</Typography>
			<div>
				<Days />
				<BottomNavigation />
			</div>
		</Fragment>
	);
}

export default TripPlan
