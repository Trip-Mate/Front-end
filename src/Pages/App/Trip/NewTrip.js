import React, { Fragment } from 'react'
import axios from 'axios';

// Router
// TODO: Import route from Routing.js when we know where the user should go after successful submission
import { OverviewRoute } from '../../../Routing';
/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	Link,
	Grid,
	Typography,
	makeStyles,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

/* Material UI Icons */
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

// TODO: Remove user object when we have context API complete and pull in the user info

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function NewTrip(props) {
  	const { register, errors, handleSubmit, control } = useForm({
			mode: 'onChange',
			reValidateMode: 'onChange',
			defaultValues: {
// TODO: Add user here from the state here
        title: '',
        from: '',
        to: '',
        countries: [],
        baseCurrency: '',
        budget: '',
			},
    });
    
    const classes = useStyles();
    
  const onSubmit = async (data) => {

		try {
			const res = await axios.post('/trips', data);
      if (res) {
        // TODO: Think where the user should go after form submission
        // TODO: Save trip data to the state
        // TODO: Update user data with the new trip id to the userState
				props.history.push(OverviewRoute);
			}
		} catch (error) {
			console.log(error);
		}
	};
  return (
		<Container component='main' maxWidth='xs'>
			<DevTool control={control} />

			<div className={classes.paper}>
				{/* Icon */}

        <List>
      <ListItem>
        <ListItemAvatar>
				<Avatar className={classes.avatar}>
					<FlightTakeoffIcon />
				</Avatar>
        </ListItemAvatar>
        <ListItemText primary="New Trip"/>
      </ListItem>
      </List>
			</div>
		</Container>
	);
}

export default NewTrip
