import React, { useEffect, useState, useRef, useCallback } from 'react';

import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// DayComponent needs to be implemented
import Day from '../../../components/Day/Day.component';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex', 
		flexDirection: 'column', 
		justifyContent: 'space-evenly', 
		alignItems: 'center', 
		contentVisibility: 'auto', 
		marginBottom: '60px',
	},
}));

const TripPlan = ({ match }) => {

	const [ count, setCount] = useState(4);
	const [ loading, setLoading] = useState(true);
	const [ error, setError ] = useState(false);
	const [ days, setDays] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);

	const observer = useRef();
	const lastDayElementRef = useCallback(node => {

		/* If page is loading we do not want to trigger this callback */
		if (loading) return

		/* If last day ref exists disconnect from it to be able to look for the next one*/
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			/* Entries refers to all the Day component we receive */
			/* Position 0 is because we need to consider one node at the time */
			if (entries[0].isIntersecting && hasMore) {
				/* Increase Day to be displayed*/
				setCount(prevCount => prevCount + 2 )
				console.log('Visible', node)
			}
		})

		/* Node refers to the Day Component itself */
		if (node) observer.current.observe(node)
	}, [loading, hasMore]);

	/* Styling Components */
	const classes = useStyles();

    useEffect(() => {
		(async () => {

			let cancel
			try {
				setLoading(true);
				setError(false);
				
				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;
				const tripID = match.params.id;

				/* getting authorized response */
				const res = await axios({
					method: 'get',
					url: `/trips/${tripID}/trip-plan`,
					headers: {
						'x-auth-token': token,
					},
					params: {
						'id': tripID,
					},
					cancelToken: axios.CancelToken(c => cancel = c)
				});
				/* Define Days Array passing as a single Set both Days already load and Days to be loaded*/
				setDays(prevDays => {
					return [...new Set([ ...prevDays, ...res.data.days.map(d => d._id)])]
				});
				/* Checking if there are days left to be loaded */
				setHasMore(res.data.days.length > count)
				setLoading(false)
				setIsLoaded(true);

			} catch (error) {
				setError(true)
				if (axios.isCancel(error)) return;
			}
			return () => cancel()
		})();
	}, [count, match.params.id]);
	
	console.log('Has More', hasMore)

    return (
			<Container className={classes.root} maxWidth='sm'>
				{isLoaded ? (
					!days?.length > 0 ? (
						<h2>There are no days in here</h2>
					) : (
						days
							.filter((day, index) => index < count)
							.map((day, index) => {
								if (count === index + 1) {
									return (
										<Day key={day} ref={lastDayElementRef} index={index}>
											{index}
										</Day>
									);
								} else {
									return (
										<Day key={day} index={index}>
											{index}
										</Day>
									);
								}
							})
					)
				) : (
					<Spinner />
				)}
			</Container>
		);
};

export default TripPlan;