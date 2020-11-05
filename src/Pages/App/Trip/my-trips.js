import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

/* Date format to be YYYY-MM */
import moment from 'moment';

/* Tab */
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	Link,
	Typography,
} from '@material-ui/core';

/* Icons */
import InfoIcon from '@material-ui/icons/Info';

/* Empty Message */
import { Alert, AlertTitle } from '@material-ui/lab';

/* Redirect */
import { NewTripRoute } from '../../../Routing';

/* Styling Components */
import Spinner from '../../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({

	root: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'flex-start',
		/* overflow: 'hidden', */
		backgroundColor: theme.palette.background.paper,
		paddingBottom: '50px'
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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
		role="tabpanel"
		hidden={value !== index}
		id={`nav-tabpanel-${index}`}
		aria-labelledby={`nav-tab-${index}`}
		{...other}
		>
		{value === index && (
			<Box p={2}>
			<Typography>{children}</Typography>
			</Box>
		)}
		</div>
	);
};

  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
	return {
	  id: `nav-tab-${index}`,
	  'aria-controls': `nav-tabpanel-${index}`,
	};
  };

  function LinkTab(props) {
	return (
	  <Tab
		component="a"
		onClick={(event) => {
		  event.preventDefault();
		}}
		{...props}
	  />
	);
  }

const MyTrips = () => {

	/* getting user trips context */
	const [userTrips, setUserTrips] = useState([]);
	// Loading handler
	const [isLoaded, setIsLoaded] = useState(false)

	/* Handle Tab View */
	const [ value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	let history = useHistory();

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
				setIsLoaded(true)

			} catch (error) {
				console.log('Error', error.message);
			}
		})();
	}, [setUserTrips]);
	
	/* Filtering trips by end date */
	let upcomingTrips = (trip) => ( (new Date(trip.to).getTime()) > (new Date().getTime()) );
	let pastTrips = (trip) => ( (new Date(trip.to).getTime()) < (new Date().getTime()) );
	function filterTripsByDate(value) {
		return value === 0 ? upcomingTrips : pastTrips
	};

	return (
		<div className={classes.root}>
			<AppBar position='sticky' color='inherit'>
				<Tabs
					variant='fullWidth'
					value={value}
					onChange={handleChange}
					aria-label='nav tabs example'
					textColor='secondary'
				>
					<LinkTab label='Upcoming Trips' {...a11yProps(0)} />
					<LinkTab label='Past Trips' {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<GridList cellHeight={180} className={classes.gridList}>
				{/* Trips Collection */}

				{isLoaded ? (
					!userTrips.length ? (
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
						userTrips
							.filter(filterTripsByDate(value))
							.map(({ backgroundImage, from, title, to, _id }) => {
								/* Sets a flag on the original moment to use UTC to display a moment instead of the original moment's time. */
								const utcStart = new moment(from).utc();
								const utcEnd = new moment(to).utc();

								/* passing trip id to path when user select a trip */
								function handleClick() {
									history.push(`/trips/${_id}`);
								}

								return (
									<GridListTile key={_id}>
										<img src={backgroundImage} alt={title} />

										<GridListTileBar
											key={_id}
											title={title}
											subtitle={
												<span>
													{utcStart.format('YYYY-MM')} -{' '}
													{utcEnd.format('YYYY-MM')}
												</span>
											}
											actionIcon={
												<IconButton
													aria-label={`info about ${title}`}
													className={classes.icon}
													onClick={handleClick}
												>
													<InfoIcon />
												</IconButton>
											}
										/>
									</GridListTile>
								);
							})
					)
				) : (
					<Spinner />
				)}
			</GridList>
		</div>
	);
};

export default MyTrips;
