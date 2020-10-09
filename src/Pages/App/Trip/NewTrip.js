import React, { Fragment, useContext } from 'react'
import axios from 'axios';
// Countries for the Autocomplete field
import countriesWithID from '../../../countries';
import currencies from '../../../currencies';
import currentUserContext from '../../../contexts/current-user/current-user.context';

// Moment JS
import moment from 'moment';
import MomentUtils from '@date-io/moment';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	makeStyles,
  Container,
  List,
  ListItem,
  ListItemAvatar,
	ListItemText,
	Badge
} from '@material-ui/core';

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
	datePickerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	datePickers: {
		margin: theme.spacing(3, 0, 2),
	},
	durationIconContainer: {
		padding: '40px',
	},
	durationIcon: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	error: {
		padding: theme.spacing(0, 2)
	}
}));

function NewTrip(props) {
	const {currentUser} = useContext(currentUserContext)

  const [fromDate, setFromDate] = React.useState(moment().startOf('day'));
	const [toDate, setToDate] = React.useState(moment().startOf('day'));
	const [countries, setCountries] = React.useState()
	const [baseCurrency, setBaseCurrency] = React.useState()
	const [budget, setBudget] = React.useState()
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false)
	const classes = useStyles();

	const tripDurationInDays = (from, to) => {
		let duration = moment(to).startOf('day').diff(moment(from).startOf('day'), 'days')
		duration = Math.abs(duration) + 1
		console.log(duration)
		return duration
	}

	console.log(fromDate)
	const duration = tripDurationInDays(fromDate, toDate)
	
	
	const { register, errors, handleSubmit, control, watch } = useForm({
		mode: 'all',
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
		// TODO: Add duratio after back-end has been changed

		try {
			const res = await axios.post('/trips', data);
			if (res) {
				setIsSuccess(true)
				const tripID = res.data.trip._id
        // TODO: Think where the user should go after form submission
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
			<DevTool control={control} />

			<div className={classes.paper}>
				{isSuccess ? (
					<Alert severity='success' className={classes.submit}>
						Enjoy your trip!
					</Alert>
				) : null}
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
										validate: (value) => console.log(value),
										pattern: {
											value: /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}_?))$/,
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
										validate: (value) => console.log(value),
										pattern: {
											value: /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}_?))$/,
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
							<div className={classes.durationIconContainer}>
								<Badge
									badgeContent={
										duration
											? duration === 1
												? `${duration} day`
												: `${duration} days`
											: 0
									}
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
						onChange={handleCountryChange}
						options={countriesWithID.map((country) => country.name)}
						renderInput={(params) => (
							<TextField
								className='autocomplete-input'
								name='countryPicker'
								{...params}
								variant='outlined'
								label='Countries'
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
					{/* {(!!countries && countries.length !== 0) || 'this error down'} */}
					{!!errors.countryPicker && (
						<Alert severity='error' className={classes.error}>
							{errors.countryPicker.message}
						</Alert>
					)}
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
							pattern: {
								value: /^[0-9]*$/,
								message: 'Trip budget must be a number',
							},
							required: 'Trip budget must be a number',
						})}
						fullWidth
						id='budget'
						label='Trip Budget'
						type='number'
						name='budget'
						onChange={handleBudgetChange}
						error={false}
					/>
					{errors.budget && (
						<Alert severity='error' className={classes.error}>
							{errors.budget.message}
						</Alert>
					)}
					{/* Submit button */}
					{!isSuccess ? (
						<Button
							onClick={() => setIsSubmitted(true)}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={
								!!errors.title ||
								!!errors.budget ||
								!!errors.from ||
								!!errors.to
							}
						>
							New trip
						</Button>
					) : null}
				</form>
			</div>
		</Container>
	);
}

export default NewTrip
