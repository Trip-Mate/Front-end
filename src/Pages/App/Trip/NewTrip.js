import React from 'react'
import axios from 'axios';
// Countries for the Autocomplete field
import countriesWithID from '../../../countries';

// Router
// TODO: Import route from Routing.js when we know where the user should go after successful submission
import { OverviewRoute } from '../../../Routing';

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

// TODO: Remove user object when we have context API complete and pull in the user info
const user = {
	resetPasswordToken: '07b491a963e65ddfb972f5327c4cf51ea88a8d10',
	resetPasswordExpires: '2020-10-05T12:17:29.165Z',
	_id: '5f78c676fb802202b6916535',
	name: 'Gabor',
	email: 'csecsi85@gmail.com',
	avatar:
		'//www.gravatar.com/avatar/8cbeea5b6b8b0188f6743a5d37f773f2?s=200&r=pg&d=mm',
	createdAt: '2020-10-03T18:44:06.011Z',
};

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

  const [fromDate, setFromDate] = React.useState(new Date(Date.now()));
	const [toDate, setToDate] = React.useState(new Date(Date.now()));
	const [countries, setCountries] = React.useState()
	const classes = useStyles();
	
	const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			// TODO: Add user here from the state here
			title: '',
			countries: [],
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
    console.log(newValue)
		setCountries(newValue);
	};
    
	const onSubmit = async (data) => {
		// Data to be sent to the server
    data.user = user
    data.from = fromDate
    data.to = toDate
    data.countries = countries
    console.log(data)

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
						type='title'
						name='title'
						error={!!errors.title}
					/>
					{errors.title && (
						<Alert severity='error'>{errors.title.message}</Alert>
					)}
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						{/* Date picker from */}
						<KeyboardDatePicker
							margin='normal'
							id='date-picker-from'
							label='Departure'
							name='from'
							format='dd/MM/yyyy'
							value={fromDate}
							onChange={handleFromDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						{/* Date picker to */}
						<KeyboardDatePicker
							margin='normal'
							id='date-picker-to'
							label='Arrival'
							name='to'
							format='dd/MM/yyyy'
							value={toDate}
							onChange={handleToDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
					{/* Countries autocomplete */}
					<Autocomplete
						multiple
						limitTags={3}
						id='multiple-limit-tags'
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
					{/* Submit button */}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!!errors.title || !!errors.password}
					>
						New trip
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default NewTrip
