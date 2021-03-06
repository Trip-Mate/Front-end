import React, { useState, useRef } from 'react';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Axios */
import axios from 'axios';

// Router
import { OverviewRoute } from '../../../../Routing';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	Typography,
	makeStyles,
	Container,
	InputAdornment,
	DialogTitle,
	Dialog,
	DialogContentText,
} from '@material-ui/core';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';
import { green } from '@material-ui/core/colors';

/* Material UI icons */
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



/* Styles */
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	lineBreak: {
		width: '15%',
		margin: theme.spacing(2),
		color: theme.palette.secondary.main,
	},
}));

function Reset(props) {
  // console.log(props.match)
	const [isSuccess, setIsSuccess] = useState(false);

	const { register, errors, handleSubmit, watch } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
			password2: '',
		},
	});

	/* Keeps track of the password value */
	const password = useRef({});
	password.current = watch("password", "");

	const classes = useStyles();

	const onSubmit = async (passwords) => {
		try {
			const res = await axios.post('/users/reset', { resetPasswordToken: props.match.params.resetPasswordToken, password: passwords.password  });
			if (res) {
				setIsSuccess(true);
				setTimeout(() => {
					props.history.push(OverviewRoute);
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>

			<div className={classes.paper}>
				{/* Icon */}
				<Avatar className={classes.avatar}>
					<VpnKeyOutlinedIcon />
				</Avatar>
				{/* Title */}
				<Typography component='h1' variant='h5'>
					Password Reset
				</Typography>
				{/* Linebreak */}
				<hr className={classes.lineBreak} />
				{/* Description */}
				<Typography paragraph>
					Please reset your password by filling out this form.
				</Typography>

				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Password */}
					<TextField
						variant='outlined'
						margin='normal'
						inputRef={register({
							required: 'Required',
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message: 'Please include at least 1 character and 1 number',
							},
						})}
						InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircleIcon color='secondary' />
							</InputAdornment>
						),
						}}
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						error={!!errors.password}
					/>
					{errors.password && (
						<Alert severity='error'>{errors.password.message}</Alert>
					)}

					{/* Password 2*/}
					<TextField
						variant='outlined'
						margin='normal'
						inputRef={register({
							validate: (value) =>
								value === password.current || 'The passwords do not match',
						})}
						InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircleIcon color='secondary' />
							</InputAdornment>
						),
						}}
						fullWidth
						name='password2'
						label='Password Confirm'
						type='password'
						id='password2'
						error={!!errors.password2}
					/>
					{errors.password2 && (
						<Alert severity='error'>{errors.password2.message}</Alert>
					)}
					{/* Success message alert */}
					{isSuccess ? (
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={!!errors.password || !!errors.password2}
						>
							Reset Password
						</Button>
					) : (
						isSuccess && <Dialog value="sm"
						open={isSuccess}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>	
					<div value="sm" className={classes.alert}>
							<CheckCircleIcon style={{ color: green[500] }}  />
						<DialogTitle id="alert-dialog-title"  
						style={{ color: green[500] }}>
						{"Your email has been sent! "}
						</DialogTitle>
						<DialogContentText id="alert-dialog-description">
						Check your email.
						</DialogContentText>
						</div>
					</Dialog> 
					)}
				</form>
			</div>
		</Container>
	);
}

export default Reset;
