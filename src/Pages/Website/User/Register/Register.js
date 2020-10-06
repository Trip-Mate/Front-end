import React, { useRef } from 'react';
import axios from 'axios';

// React Router + utils
import { ForgotRoute, OverviewRoute, LoginRoute } from '../../../../Routing';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

// Material-UI
import {
	Button,
	TextField,
	Avatar,
	Container,
	Grid,
	Link,
	makeStyles,
	InputAdornment,
} from '@material-ui/core';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

// Icons
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

// Styles
const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: '20px',
		display: 'grid',
		width: '100%',
		direction: 'column',
		justify: 'center',
		alignItems: 'center',
		margin: 'auto',
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
	avater: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		display: 'grid',
		left: '50%',
		justify: 'center',
		fontSize: 'large',
		transform: 'translateX(-50%)'
	},
}));

const Register = (props) => {

	const { register, errors, handleSubmit, control, watch } = useForm({
		mode: 'onChange',
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

	const onSubmit = async (user) => {
		try {
			const res = await axios.post('/users', user);
			if (res) {
					props.history.push(OverviewRoute);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const classes = useStyles();

	return (
		<Container maxWidth='xs' component='main'>
			<DevTool control={control} />
			<Avatar className={classes.avater}>
				<AssignmentIndIcon />
			</Avatar>
			<h1 className={classes.h1}>Please Register Below</h1>
			{/* form  */}
			<form
				className={classes.form}
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
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
				{errors.email && <Alert severity="error">{errors.email.message}</Alert>}

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
				{errors.name && <Alert severity="error">{errors.name.message}</Alert>}

				{/* Password */}
				<TextField
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
				{errors.password && <Alert severity="error">{errors.password.message}</Alert>}

				{/* Re-enter password */}
				<TextField
					margin='normal'
					variant='outlined'
					type='password'
					label='Re-enter password'
					name='reEnterPassword'
					inputRef={register({
						validate: value =>
							  value === password.current || "The passwords do not match"
						},
					)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LockIcon color='secondary' />
							</InputAdornment>
						),
					}}
					error={!!errors.reEnterPassword}
				/>
				{errors.reEnterPassword && <Alert severity="error">{errors.reEnterPassword.message}</Alert>}

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
				<Grid container >
					{/* Password Recovery */}
					<Grid item xs>
						<Link href={ForgotRoute} variant='body2'>
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
		</Container>
	);
};

export default Register;
