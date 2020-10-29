import React, { useContext } from 'react';
import axios from 'axios';

// Countries and currencies for the Autocomplete field
import countriesWithID from '../../../countries';
import currencies from '../../../currencies';

// User context
import currentUserContext from '../../../contexts/current-user/current-user.context';

// Moment JS
import moment from 'moment';
import MomentUtils from '@date-io/moment';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	makeStyles,
	Container,
	Typography,
	Badge,
	Paper,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Necessary imports for date pickers
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/* Material UI Icons */
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';


// Styles
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 1),
	},
	datePickerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	datePickers: {
		margin: theme.spacing(3, 0, 2),
	},
	durationIconContainer: {
		padding: theme.spacing(5),
	},
	durationIcon: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	error: {
		padding: theme.spacing(0, 2),
	},
	inputFields: {
		margin: theme.spacing(0.5, 0),
	},
}));

// New trip component
function NewTrip(props) {
	const classes = useStyles();

	// Setting the base for the necessary fields for the trip
	const { currentUser } = useContext(currentUserContext);
	const [fromDate, setFromDate] = React.useState(moment().startOf('day'));
	const [toDate, setToDate] = React.useState(moment().startOf('day'));
	const [countries, setCountries] = React.useState();
	const [baseCurrency, setBaseCurrency] = React.useState(
		currentUserContext.baseCurrency || 'EUR'
	);
	const [budget, setBudget] = React.useState();
	const [isSuccess, setIsSuccess] = React.useState(false);

	// Calculates the days display for the badge element
	const tripDurationInDays = (from, to) => {
		let duration = moment(to)
			.startOf('day')
			.diff(moment(from).startOf('day'), 'days');
		duration += 1;
		return duration;
	};

	const duration = tripDurationInDays(fromDate, toDate);

	// Sets validation handler
	const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'all',
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

	/* getting user token */
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user.token;

	// Form change handlers
	const handleCountryChange = (event, newValue) => {
		setCountries(newValue);
	};

	const handleCurrencyChange = (event, newValue) => {
		setBaseCurrency(newValue);
	};

	const handleBudgetChange = (event, newValue) => {
		setBudget(event.target.value);
	};

	// Submit handler
	const onSubmit = async (data) => {
		// Data to be sent to the server
		data.user = currentUser._id;
		data.from = fromDate;
		data.to = toDate;
		data.countries = countries;
		data.baseCurrency = baseCurrency;
		data.budget = budget;
		data.duration = duration;

		try {
			// Setting header for axios
			const options = {
				headers: {
					'x-auth-token': token,
				},
			};
			// Sending data to the back-end
			const res = await axios.post('/trips', data, options);
			console.log('res: ', res);
			if (res.status === 201) {
				setIsSuccess(true);
				const tripID = res.data.trip._id;
				// TODO: Save trip data to the state
				// TODO: Update user data with the new trip id to the userState
				setTimeout(() => {
					props.history.push({
						pathname: `/trips/${tripID}`,
						state: { trip: res.data.trip },
					});
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.container}>
				<Paper elevation={3} className={classes.paper}>
					{/* Success alert component */}
					{isSuccess ? (
						<Alert severity='success' className={classes.submit}>
							Enjoy your trip!
						</Alert>
					) : null}
					{/* Icon and title*/}
					<div className={classes.titleContainer}>
						<Avatar className={classes.avatar}>
							<FlightTakeoffIcon />
						</Avatar>
						{/* Title */}
						<Typography component='h1' variant='h5'>
							New Trip
						</Typography>
					</div>
					{/* The form */}
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* Trip title */}
						<TextField
							variant='outlined'
							inputRef={register({
								required: 'Trip title is required',
							})}
							fullWidth
							id='title'
							label='Trip Title'
							type='text'
							name='title'
							error={false}
						/>
						{errors.title && (
							<Alert severity='error' className={classes.error}>
								{errors.title.message}
							</Alert>
						)}
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<div className={classes.datePickerContainer}>
								<div>
									{/* Date picker from */}
									<KeyboardDatePicker
										margin='normal'
										id='date-picker-from'
										label='Departure: dd/mm/yyyy'
										name='from'
										format='DD/MM/yyyy'
										clearable={true}
										value={fromDate}
										onChange={setFromDate}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
										error={false}
										helperText={null}
										inputRef={register({
											required: 'Departure date is required',
											validate: (value) => null,
											pattern: {
												// value: /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}_?))$/,
												value: /[^\d]+/gi,
												message: 'Invalid date',
											},
										})}
									/>
									{errors.from && (
										<Alert severity='error' className={classes.error}>
											{errors.from.message}
										</Alert>
									)}
									{/* Date picker to */}
									<KeyboardDatePicker
										margin='normal'
										id='date-picker-to'
										label='Arrival: dd/mm/yyyy'
										name='to'
										format='DD/MM/yyyy'
										clearable={true}
										inputRef={register({
											required: 'Arrival date is required',
											validate: (value) =>
												toDate >= fromDate || 'Arrival is before departure',
											pattern: {
												value: /[^\d]+/gi,
												message: 'Invalid date',
											},
										})}
										value={toDate}
										onChange={setToDate}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
										error={false}
										helperText={null}
									/>
									{errors.to && (
										<Alert severity='error' className={classes.error}>
											{errors.to.message}
										</Alert>
									)}
								</div>
								{/* Duration display */}
								<div className={classes.durationIconContainer}>
									<Badge
										badgeContent={
											duration < 0
												? null
												: duration
												? duration === 1
													? `${duration} day`
													: `${duration} days`
												: 0
										}
										inputRef={register({
											required: 'Duration is required',
										})}
										color='primary'
									>
										<WbSunnyIcon
											className={classes.durationIcon}
											color='secondary'
										/>
									</Badge>
								</div>
							</div>
						</MuiPickersUtilsProvider>
						{/* Countries autocomplete */}
						<Autocomplete
							multiple
							limitTags={3}
							id='countryPicker'
							className={classes.inputFields}
							onChange={handleCountryChange}
							options={countriesWithID.map((country) => country.name)}
							renderInput={(params) => (
								<TextField
									className='autocomplete-input'
									name='countryPicker'
									{...params}
									variant='outlined'
									label='Countries'
									// helperText='The countries you want to visit on your trip'
									inputRef={register({
										validate: {
											isUndefined: () =>
												!!countries || 'Please select one or more countries',
											isEmpty: () =>
												(countries && countries.length !== 0) ||
												'Please select one or more countries',
										},
									})}
								/>
							)}
						/>
						{!!errors.countryPicker && (
							<Alert severity='error' className={classes.error}>
								{errors.countryPicker.message}
							</Alert>
						)}
						{/* Budget input */}
						<TextField
							variant='outlined'
							className={classes.inputFields}
							inputRef={register({
								pattern: {
									value: /^[0-9]*$/,
									message: 'Trip budget must be a positive number',
								},
								required: 'Trip budget must be a positive number',
							})}
							fullWidth
							id='budget'
							label='Trip Budget'
							type='number'
							name='budget'
							// helperText='Estimated budget for the trip'
							onChange={handleBudgetChange}
							error={false}
						/>
						{errors.budget && (
							<Alert severity='error' className={classes.error}>
								{errors.budget.message}
							</Alert>
						)}
						{/* Base currency picker */}
						<Autocomplete
							id='base-currency-picker'
							className={classes.inputFields}
							onChange={handleCurrencyChange}
							options={currencies}
							value={baseCurrency}
							defaultValue={baseCurrency}
							renderInput={(params) => (
								<TextField
									className='autocomplete-input'
									{...params}
									variant='outlined'
									name='baseCurrency'
									label='Base Currency'
									// helperText='Your currency that you use'
									inputRef={register({
										validate: {
											isUndefined: () =>
												!!baseCurrency || 'Please select your base currency',
											isEmpty: () =>
												(baseCurrency && baseCurrency.length !== 0) ||
												'Please select your base currency',
										},
									})}
								/>
							)}
						/>
						{!!errors.baseCurrency && (
							<Alert severity='error' className={classes.error}>
								{errors.baseCurrency.message}
							</Alert>
						)}
						{/* Submit button */}
						{!isSuccess ? (
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Create trip
							</Button>
						) : null}
					</form>
				</Paper>
			</div>
		</Container>
	);
}

export default NewTrip;
