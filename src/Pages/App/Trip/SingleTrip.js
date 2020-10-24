import React, { useContext, useEffect } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

/* Components */
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

/* Icons */
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DirectionsIcon from '@material-ui/icons/Directions';
import ExploreIcon from '@material-ui/icons/Explore';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LockOpenIcon from '@material-ui/icons/LockOpen';

/* Contexts */
import SingleTripContext from '../../../contexts/single-trip/single-trip.context';
import CurrentUserContext from '../../../contexts/current-user/current-user.context';

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100vw',
	  height: 'auto',
	  backgroundColor: theme.palette.background.paper,
	},
}));

const SingleTrip = ({ match }) => {

	/* getting single trip context */
	const { singleTrip, setSingleTrip } = useContext(SingleTripContext);

	/* getting name from current user context */
	const { currentUser: { name }} = useContext(CurrentUserContext);

	const classes = useStyles();

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
				console.log('Error getting trip Data', error.message);
			}
		})();
	}, []);

	const onDataSubmit = async () => {
		try {
			/* getting user token */
			const user = JSON.parse(localStorage.getItem('user'));
			const token = user.token;

			const data = match.params;

			const options = {
				headers: {
					'x-auth-token': token
				}
			}

			const res = await axios.post(`${match.url}/trip-plan`, data, options);
			
		} catch (error) {
			console.log('Error sending data', error.message);
		}
	};

	const { title, budget, countries, baseCurrency, from, createdAt} = singleTrip;
  
	return (
			<List 
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
			  <ListSubheader color="primary" component="h2" id="nested-list-subheader">
				Single Trip View
			  </ListSubheader>
			}
			className={classes.root}
			>
			  <ListItem>
				<ListItemAvatar>
				  <Avatar>
					<AccountCircleIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText primary="Travellers" secondary={name} />
			  </ListItem>
			  <ListItem>
				<ListItemAvatar>
				  <Avatar>
					<EventNoteIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText primary="Quick Notes" secondary={createdAt} />
			  </ListItem>
			  <ListItem 
			  button 
			  component={Link} 
			  to={`${match.url}/trip-plan`}
			  onClick={onDataSubmit}
			  >
				<ListItemAvatar>
					<Avatar>
						<DirectionsIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Trip Plan" secondary={title} />
			  </ListItem>
			  <ListItem>
				<ListItemAvatar>
				  <Avatar>
					<ExploreIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText primary="Map" secondary={countries} />
			  </ListItem>
			  <ListItem>
				<ListItemAvatar>
				  <Avatar>
					<LocalMallIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText primary="Briefing" secondary={from} />
			  </ListItem>
			  <ListItem>
				<ListItemAvatar>
				  <Avatar>
					<LockOpenIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText primary="Wallet" secondary={`${baseCurrency} ${budget}`} />
			  </ListItem>	  
			</List>
		  );
}


export default SingleTrip;
