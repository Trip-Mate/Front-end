import React, { useContext, useState } from 'react';
import axios from 'axios';
import Dialog from '../../../components/Dialog/Dialog';


/* React Hook Form */
import { useForm } from 'react-hook-form';

// Currencies for the autocomplete field
import currencies from '../../../currencies';

/* Material UI core*/
import {
  makeStyles,
  Container,
  Paper,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
} from '@material-ui/core';

import WbSunnyIcon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
    marginBottom: '55px',
	},
	paper: {
		margin: theme.spacing(1, 0),
		padding: theme.spacing(2, 2),
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: theme.spacing(0),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	// submit: {
	// 	margin: theme.spacing(2, 0, 1),
	// },
	// datePickerContainer: {
	// 	display: 'flex',
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// },
	// datePickers: {
	// 	margin: theme.spacing(3, 0, 2),
	// },
	// durationIconContainer: {
	// 	padding: theme.spacing(5),
	// },
	// durationIcon: {
	// 	width: theme.spacing(7),
	// 	height: theme.spacing(7),
	// },
	// error: {
	// 	padding: theme.spacing(0, 2),
	// },
	// inputFields: {
	// 	margin: theme.spacing(0.5, 0),
	// },
}));

// Day component
function Day(props) {
  const classes = useStyles();

  const [country, setCountry] = React.useState('');

	// Sets validation handler
	const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'all',
		defaultValues: {
			country: '',
		},
	});
	// Submit handler
	const onSubmit = async (data) => {
		try {
			console.log('Hello from submit function');
		} catch (error) {
			console.log(error);
		}
  };
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value || '');
    console.log(country);
  };

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.container}>
				<Paper elevation={3} className={classes.paper}>
					{/* Icon and title*/}
					<div className={classes.titleContainer}>
						<Avatar className={classes.avatar}>
							<WbSunnyIcon className={classes.durationIcon} />
						</Avatar>
						{/* Title */}
						<Typography component='h1' variant='h5'>
							Day 1
						</Typography>
					</div>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='country-picker'>Country</InputLabel>
							<Select
								native
								value={country}
								onChange={handleCountryChange}
								input={<Input id='country-picker' />}
							>
								<option value={'Spain'}>Spain</option>
								<option value={'Italy'}>Italy</option>
								<option value={'United Kingdom'}>United Kingdom</option>
								<option value={'India'}>India</option>
							</Select>
						</FormControl>
					</form>
				</Paper>
			</div>
		</Container>
	);
}

export default Day
