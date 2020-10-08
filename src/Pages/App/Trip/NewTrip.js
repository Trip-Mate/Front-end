import React, { Fragment, useContext } from 'react'
import axios from 'axios';
// Countries for the Autocomplete field
import countriesWithID from '../../../countries';
import currencies from '../../../currencies';
import currentUserContext from '../../../contexts/current-user/current-user.context';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Material UI core*/
import DateFnsUtils from '@date-io/date-fns';
import {
	Avatar,
	Button,
	TextField,
	makeStyles,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

// Necessary imports for date pickers
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/* Material UI Icons */
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Styles
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
	const {currentUser} = useContext(currentUserContext)

  const [fromDate, setFromDate] = React.useState(new Date(Date.now()));
	const [toDate, setToDate] = React.useState(new Date(Date.now()));
	const [countries, setCountries] = React.useState()
	const [baseCurrency, setBaseCurrency] = React.useState()
	const [budget, setBudget] = React.useState()
	const classes = useStyles();
	
	const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			// TODO: Add user here from the state here
			title: '',
			countries: [],
			from: '',
			to: '',
			baseCurrency: '',
			budget: '',
		},
	});
  
  const handleFromDateChange = (date) => {
		setFromDate(date);
  };
  
  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleCountryChange = (event, newValue) => {
		setCountries(newValue);
	};

	const handleCurrencyChange = (event, newValue) => {
		setBaseCurrency(newValue);
	};

	const handleBudgetChange = (event, newValue) => {
		setBudget(event.target.value);
	};
    
	const onSubmit = async (data) => {
		// Data to be sent to the server
    data.user = currentUser._id
    data.from = fromDate
    data.to = toDate
		data.countries = countries
		data.baseCurrency = baseCurrency
		data.budget = budget
    console.log(data)

		try {
			const res = await axios.post('/trips', data);
			if (res) {
				const tripID = res.data.trip._id
        // TODO: Think where the user should go after form submission
        // TODO: Save trip data to the state
        // TODO: Update user data with the new trip id to the userState
				props.history.push({
					pathname: `/trips/${tripID}`,
					state: { trip: res.data.trip },
				});
				
			}
		} catch (error) {
			console.log(error);
		}
	};
  return (
		<Container component='main' maxWidth='xs'>
			<DevTool control={control} />

			<div className={classes.paper}>
				{/* Icon and title*/}
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<FlightTakeoffIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='New Trip' />
					</ListItem>
				</List>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Trip title */}
					<TextField
						variant='outlined'
						margin='normal'
						inputRef={register({
							required: 'Required',
						})}
						fullWidth
						id='title'
						label='Trip Title'
						type='text'
						name='title'
						error={!!errors.title}
					/>
					{errors.title && (
						<Alert severity='error'>{errors.title.message}</Alert>
					)}

					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Fragment>
							{/* Date picker from */}
							<KeyboardDatePicker
								margin='normal'
								id='date-picker-from'
								label='Departure: dd/mm/yyyy'
								name='from'
								format='dd/MM/yyyy'
								inputRef={register({
									required: 'Required',
								})}
								value={fromDate}
								onChange={handleFromDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								error={!!errors.from}
							/>
							{errors.from && (
								<Alert severity='error'>Departure date is required</Alert>
							)}
							{/* Date picker to */}
							<KeyboardDatePicker
								margin='normal'
								id='date-picker-to'
								label='Arrival: dd/mm/yyyy'
								name='to'
								format='dd/MM/yyyy'
								inputRef={register({
									required: 'Required',
								})}
								value={toDate}
								onChange={handleToDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								error={!!errors.to}
							/>
							{errors.to && (
								<Alert severity='error'>Arrival date is is required</Alert>
							)}
						</Fragment>
					</MuiPickersUtilsProvider>
					{/* Countries autocomplete */}
					<Autocomplete
						multiple
						limitTags={3}
						id='country-picker'
						onChange={handleCountryChange}
						options={countriesWithID.map((country) => country.name)}
						renderInput={(params) => (
							<TextField
								className='autocomplete-input'
								{...params}
								variant='outlined'
								label='Countries'
							/>
						)}
					/>
					{/* Base currency picker */}
					<Autocomplete
						id='base-currency-picker'
						onChange={handleCurrencyChange}
						options={currencies}
						renderInput={(params) => (
							<TextField
								className='autocomplete-input'
								{...params}
								variant='outlined'
								label='Base Currency'
							/>
						)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						inputRef={register({
							required: 'Trip budget is required',
							pattern: {
								value: /^[0-9._%+-]{2,}$/i,
								message: 'Trip Budget must be a number and minimum 2 digits',
							},
						})}
						fullWidth
						id='budget'
						label='Trip Budget'
						type='number'
						name='budget'
						onChange={handleBudgetChange}
						error={!!errors.budget}
					/>
					{errors.budget && (
						<Alert severity='error'>{errors.budget.message}</Alert>
					)}
					{/* Submit button */}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!!errors.title || !!errors.budget}
					>
						New trip
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default NewTrip
