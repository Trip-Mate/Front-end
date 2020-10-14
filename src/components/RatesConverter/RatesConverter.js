import React, { useState, useEffect } from 'react';
import axios from 'axios';
import currencies from '../../currencies';
import currentUserContext from '../../contexts/current-user/current-user.context';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// import { Box } from '@material-ui/core';



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
/* Error Messages */
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	select: {
		width: '15%',
		margin: 'auto',
	},
	inputContainer: {
		display: 'grid',
		gridTemplateColumns: '60% 20%',
		margin: '50px 20px',
	},
}));
const Rates = 'objectId("5f73b5a403d9fe75c3cce753")';
// <Box>Features</Box>;
function Features() {
	const [isSuccess, setIsSuccess] = useState(false);
	const [baseCurrency, setBaseCurrency] = React.useState(
		currentUserContext.baseCurrency || 'EUR'
	);

  const [fromDate, setFromDate] = React.useState(moment().startOf('day'));
	const classes = useStyles();

	const { register, errors, handleSubmit, control, watch } = useForm({
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

	// useEffect(() => {
	// 	axios.default.mongoose('Rate').then(function (res) {
	// 		console.log(res);
	// 		// setBaseCurrency([data.base, ...Object.keys(data.rates)])
	// 	});
	// }, []);

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				{/* First input currency row */}
				<div className={classes.inputContainer}>
					<TextField
						id='outlined-number'
						label='Number'
						type='number'
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
					/>
					<Autocomplete
						id='base-currency-picker'
						className={classes.select}
						//onChange={}
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
				</div>

				{/* Second Currency Row */}
				<div className={classes.inputContainer}>
					<TextField
						id='outlined-number'
						label='Number'
						type='number'
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
					/>
					<Autocomplete
						id='base-currency-picker'
						className={classes.select}
						//onChange={}
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
              </div>
              </div>
                </MuiPickersUtilsProvider>
					{/* <button onClick={convertHandler}>Convert</button>
          {result && <h3>{result}</h3>} */}
				</div>
			</div>
		</Container>
	);
}

export default Features;
