import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';

// React Router + utils
import { ForgotRoute, LoginRoute, NewTripRoute } from '../../../../Routing';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* User Context */
import CurrentUserContext from '../../../../contexts/current-user/current-user.context';

// Material-UI
import {
	Button,
	TextField,
	Avatar,
	Container,
	Grid,
	Link,
	Typography,
	makeStyles,
	InputAdornment,
	DialogTitle,
	Dialog,
	DialogContentText,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

// Icons
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: '65px',
	},
	alert: {
		border: '1px solid green',
		borderRadius: '5px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
	},
	label: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: 'black',
		maxWidth: '60%',
		background: 'transparent',
	},
	h1: {
		justify: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const Register = (props) => {

	const { register, errors, handleSubmit, watch } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			username: '',
			password: '',
			reEnterPassword: '',
		},
	});

	/* Keeps track of the password value */
	const password = useRef({});
	password.current = watch("password", "");

	/* get User Context */
	const { setCurrentUser} = useContext(CurrentUserContext);
	const [isSuccess, setIsSuccess] = useState(false);
	const [validationErrors, setValidationErrors] = useState('');

	const onSubmit = async (user) => {
		try {
			const res = await axios.post('/users', user);
			if (res) {
				setValidationErrors('');
				setIsSuccess(true);
				setTimeout(() => {
					props.history.push(NewTripRoute);
				}, 2000);
				setCurrentUser(res.data.user);
				localStorage.setItem('user', JSON.stringify(res.data));
			}
		} catch (error) {
			error.response.data.errors.map((error) => {
				setValidationErrors(error.msg);
			});
		}
	};

	const classes = useStyles();

	return (
		<Container maxWidth='xs' component='main'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
				</Avatar>
				<Typography component='h1' variant='h5'>
					Please Register Below
				</Typography>
				{/* form  */}
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{isSuccess && (
						<Dialog
							value='sm'
							open={isSuccess}
							aria-labelledby='alert-dialog-title'
							aria-describedby='alert-dialog-description'
						>
							<div value='sm' className={classes.alert}>
								<CheckCircleIcon style={{ color: green[500] }} />
								<DialogTitle
									id='alert-dialog-title'
									style={{ color: green[500] }}
								>
									{'Congratulations'}
								</DialogTitle>
								<DialogContentText id='alert-dialog-description'>
									It's the start of your journey.
								</DialogContentText>
							</div>
						</Dialog>
					)}
					{/* Email */}
					<TextField
						id='email'
						label='Email Address'
						type='email'
						name='email'
						variant='outlined'
						margin='normal'
						fullWidth
						inputRef={register({
							required: 'Required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<EmailIcon color='secondary' />
								</InputAdornment>
							),
						}}
						error={!!errors.email}
					/>
					{errors.email && (
						<Alert severity='error'>{errors.email.message}</Alert>
					)}

					{/*username  */}
					<TextField
						fullWidth
						margin='normal'
						variant='outlined'
						label='Username'
						name='name'
						inputRef={register({
							required: 'Required',
						})}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<AccountCircleIcon color='secondary' />
								</InputAdornment>
							),
						}}
						error={!!errors.name}
					/>
					{errors.name && <Alert severity='error'>{errors.name.message}</Alert>}

					{/* Password */}
					<TextField
						fullWidth
						margin='normal'
						variant='outlined'
						type='password'
						label='Password'
						name='password'
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
									<LockIcon color='secondary' />
								</InputAdornment>
							),
						}}
						error={!!errors.password}
					/>
					{errors.password && (
						<Alert severity='error'>{errors.password.message}</Alert>
					)}

					{/* Re-enter password */}
					<TextField
						fullWidth
						margin='normal'
						variant='outlined'
						type='password'
						label='Re-enter password'
						name='reEnterPassword'
						inputRef={register({
							validate: (value) =>
								value === password.current || 'The passwords do not match',
						})}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<LockIcon color='secondary' />
								</InputAdornment>
							),
						}}
						error={!!errors.reEnterPassword}
					/>
					{errors.reEnterPassword && (
						<Alert severity='error'>{errors.reEnterPassword.message}</Alert>
					)}
					{!isSuccess ? (
						<Button
							type='submit'
							margin='normal'
							fullWidth
							variant='contained'
							color='primary'
							disabled={
								!!errors.email ||
								!!errors.name ||
								!!errors.password ||
								!!errors.reEnterPassword
							}
						>
							{' '}
							Register
						</Button>
					) : (
						isSuccess
					)}
					{validationErrors && (
						<Alert severity='error'>{validationErrors}</Alert>
					)}
					<Grid container margin='20px'>
						{/* Password Recovery */}
						<Grid item xs margin='normal'>
							<Link href={ForgotRoute} margin='normal' variant='body2'>
								Forgot password?
							</Link>
						</Grid>

						{/* Redirect to Register */}
						<Grid item>
							<Link href={LoginRoute} variant='body2'>
								{'Already a member? Sign In'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Register;
