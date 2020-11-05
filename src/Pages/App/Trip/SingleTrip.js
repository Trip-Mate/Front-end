import React, { useState, useContext, useEffect } from 'react';
import Spinner from '../../../components/Spinner/Spinner';


import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

/* Components */
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

/* Icons */
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DirectionsIcon from '@material-ui/icons/Directions';
import ExploreIcon from '@material-ui/icons/Explore';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

/* Confirm Trip Delete Success Message */
import { Alert, AlertTitle  } from '@material-ui/lab';

/* Contexts */
import SingleTripContext from '../../../contexts/single-trip/single-trip.context';
// import CurrentUserContext from '../../../contexts/current-user/current-user.context';

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100vw',
	  height: 'auto',
		backgroundColor: theme.palette.background.paper,
		paddingBottom: '50px',
	},
	subHeader: {
	  textTransform: "uppercase",
	  fontSize: "20px",
	  fontStyle: "oblique",
		fontWeight: "bold",
		margin: '5px',
	},
	button: {
	  display: "flex",
	  justifyContent: "flex-end"
	},
	dialog: {
	  color: "red",
	  fontWeight: "bold"
	},
	alert: {
	  position: "absolute",
	  top: "15%",
	  left: "5%",
	}
}));

/* Slide Dialog to the top */
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const SingleTrip = ({ match }) => {

	/* Handle delete button toggle */
	const [open, setOpen] = useState(false);

	/* Handle Confirm Delete Message */
	const [isDeleted, setIsDeleted] = useState(false);

	/* getting single trip context */
	const { singleTrip, setSingleTrip } = useContext(SingleTripContext);

	/* getting name from current user context */
	// const { currentUser: { name }} = useContext(CurrentUserContext);
	const user = JSON.parse(localStorage.getItem('user'));
	const name = user.user.name;

	let history = useHistory();
	const classes = useStyles();

	/* Toggle Button */
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	/* getting single trip data */
	useEffect(() => {
		(async () => {
			try {
				// /* getting user token */
				const token = user.token;

				/* getting current path */ const url = match.url;

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
	}, [setSingleTrip, match.url, user.token]);

	const onDataSubmit = async () => {
		try {
			/* getting user token */
			// const user = JSON.parse(localStorage.getItem('user'));
			const token = user.token;

			const data = match.params;

			const options = {
				headers: {
					'x-auth-token': token
				}
			}

			/*const res = */await axios.post(`${match.url}/trip-plan`, data, options);
			
		} catch (error) {
			console.log('Error sending data', error.message);
		}
	};

	const confirmTripDelete = async () => {
		try {
			/* getting user token */
			const user = JSON.parse(localStorage.getItem('user'));
			const token = user.token;

			/* getting current path */
			const url = match.url;

			/* getting authorized response */
			const res = await axios.delete(`${url}`, {
				headers: {
					'x-auth-token': token,
				},
			});

			if (res.data) {
				setTimeout(() => {
					history.push(`/overview`);
				}, 1400);
				/* Close dialog */
				handleClose();
				/* Display success message */
				setIsDeleted(true);
			}
		} catch (error) {
			console.log('Error deleting trip', error.message);
		} 
	};

	const { title, budget, countries, baseCurrency, from, createdAt } = singleTrip;
	
	return singleTrip.title ? (
		<List
			component='nav'
			aria-labelledby='nested-list-subheader'
			subheader={
				<ListSubheader
					color='primary'
					component='h2'
					id='nested-list-subheader'
					className={classes.subHeader}
				>
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
				<ListItemText primary='Travellers' secondary={name} />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<EventNoteIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary='Quick Notes'
					secondary={createdAt?.substring(0, 10)}
				/>
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
				<ListItemText primary='Trip Plan' secondary={title} />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<ExploreIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary='Map' secondary={countries} />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<LocalMallIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary='Briefing' secondary={from?.substring(0, 10)} />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<LockOpenIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary='Wallet'
					secondary={baseCurrency && budget ? `${baseCurrency} ${budget}` : null}
				/>
			</ListItem>
			<ListItem className={classes.button} button={true}>
				<Button
					variant='outlined'
					color='secondary'
					size='small'
					startIcon={<DeleteIcon />}
					onClick={handleClickOpen}
				>
					Delete
				</Button>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-labelledby='alert-dialog-slide-title'
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogTitle id='alert-dialog-title'>
						{'Confirm deletion'}
					</DialogTitle>
					<DialogContent severity='warning'>
						<DialogContentText
							className={classes.dialog}
							id='alert-dialog-description'
						>
							Are you sure you want permanently delete this trip ?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={confirmTripDelete} color='primary'>
							Yes
						</Button>
						<Button onClick={handleClose} color='primary' autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>
				{isDeleted ? (
					<Alert className={classes.alert} severity='success'>
						<AlertTitle>Success</AlertTitle>
						<strong>Trip Deleted Successfully!</strong>
					</Alert>
				) : (
					''
				)}
			</ListItem>
		</List>
	) : <Spinner />
}


export default SingleTrip;
