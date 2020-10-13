import React, { useEffect, useContext } from 'react';

import axios from 'axios';

/* Date format to be YYYY-MM */
import moment from 'moment';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	ListSubheader,
	IconButton,
	Link,
	ButtonGroup,
	Button,
	Typography,
} from '@material-ui/core';

/* Icons */
import InfoIcon from '@material-ui/icons/Info';

/* Empty Message */
import { Alert, AlertTitle } from '@material-ui/lab';

/* User Trips Context */
import UserTripsContext from '../../../contexts/user-trips/user-trips.context';

/* Redirect */
import { NewTripRoute } from '../../../Routing';

/* Styling Components */
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'flex-start',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	// Container
	gridList: {
		width: '100%',
		height: '100%',
	},
	gridListCurrent: {
		width: '100%',
		height: '20%',
		marginBottom: '5px',
	},
	// Navigation Bar
	title: {
		textAlign: 'center',
	},
	// Info
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	buttonGroup: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	button: {
		width: '50%',
		fontSize: '16px',
		textAlign: 'center',
	},
}));

const MyTrips = () => {
	/* getting user trips context */
	const { userTrips, setUserTrips } = useContext(UserTripsContext);

	/* Styling Components */
	const classes = useStyles();

	/* get user trips only once */
	useEffect(() => {
		(async () => {
			try {
				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;

				/* getting authorized response */
				const res = await axios.get('/trips', {
					headers: {
						'x-auth-token': token,
					},
				});

				/* getting user trips */
				const trips = res.data.trips;

				/* passing user trips data to user trips context*/
				setUserTrips(trips);
			} catch (error) {
				console.log('Error', error.message);
			}
		})();
	}, []);

	return (
		<div className={classes.root}>
			<ButtonGroup
				className={classes.buttonGroup}
				variant='text'
				color='primary'
				aria-label='text primary button group'
			>
				<Button className={classes.button}>Future trips</Button>
				<Button className={classes.button}>Past trips</Button>
			</ButtonGroup>

			{/* <GridListTile cols={1} style={{ height: 'auto' }}>
				<ListSubheader
					color='primary'
					className={classes.title}
					component='div'
				>
					Current Trips
				</ListSubheader>
			</GridListTile>

			<GridListTile cols={1} style={{ height: 'auto' }}>
				<ListSubheader
					color='primary'
					className={classes.title}
					component='div'
				>
					Past Trips
				</ListSubheader>
			</GridListTile> */}
			<GridList cellHeight={180} className={classes.gridList}>
				{/* Navigation Bar */}

				{/* Trips Collection */}

				{!userTrips ? (
					<div style={{ width: '100%', position: 'absolute', top: '20vh' }}>
						<Alert severity='info'>
							{/* Link to redirect the user to Create New Trip Page  */}
							<AlertTitle>It seems like you have no trips yet</AlertTitle>
							Click{' '}
							<Link href={NewTripRoute} style={{ fontWeight: 'bold' }}>
								here
							</Link>{' '}
							and start your journey
						</Alert>
					</div>
				) : (
					userTrips.map(({ backgroundImage, from, title, to, _id }) => {
						/* Sets a flag on the original moment to use UTC to display a moment instead of the original moment's time. */
						const utcStart = new moment(from).utc();
						const utcEnd = new moment(to).utc();

						return (
							<GridListTile key={_id}>
								<img src={backgroundImage} alt={title} />

								<GridListTileBar
									key={_id}
									title={title}
									subtitle={
										<span>
											{utcStart.format('YYYY-MM')} - {utcEnd.format('YYYY-MM')}
										</span>
									}
									actionIcon={
										<IconButton
											aria-label={`info about ${title}`}
											className={classes.icon}
										>
											<InfoIcon />
										</IconButton>
									}
								/>
							</GridListTile>
						);
					})
				)}
			</GridList>
		</div>
	);
};

export default MyTrips;
