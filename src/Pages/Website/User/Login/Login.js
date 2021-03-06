import React, { useContext, useState } from 'react';
import axios from 'axios';

// Router
import { RegisterRoute, ForgotRoute, OverviewRoute } from '../../../../Routing';

/* React Hook Form */
import { useForm } from 'react-hook-form';

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
	InputAdornment,
	DialogTitle,
	Dialog,
	DialogContentText,
	IconButton,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

/* Material UI icons */
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

/* User Context */
import CurrentUserContext from '../../../../contexts/current-user/current-user.context';

/* Styles */
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
	alert: {
		border: '1px solid green',
		borderRadius: '5px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
	},
	visibilityIcon: {
		position: 'absolute',
		right: '10px',
		color: 'rgba(0, 0, 0, 0.3)',
	},
}));

function LogIn(props) {

	const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	/* get User Context */
	const { setCurrentUser } = useContext(CurrentUserContext);
	const [isSuccess, setIsSuccess] = useState(false);
	const [validationErrors, setValidationErrors] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const classes = useStyles();

	const onSubmit = async (user) => {
		try {
			const res = await axios.post('/auth', user);
			if (res) {
				setValidationErrors('')
				setIsSuccess(true);
				setPasswordVisible(false)
				setTimeout(() => {
					props.history.push(OverviewRoute);
				}, 2000);
				setCurrentUser(res.data.user);
				localStorage.setItem('user', JSON.stringify(res.data));
			}
		} catch (error) {
			error.response.data.errors.map((error) => {
			 return setValidationErrors(error.msg);
			})
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				{isSuccess && (
					<Dialog
						value='sm'
						open={isSuccess}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
					>
						<div className={classes.alert}>
							<CheckCircleIcon style={{ color: green[500] }} />
							<DialogTitle
								id='alert-dialog-title'
								style={{ color: green[500] }}
							>
								{'Successful login!'}
							</DialogTitle>
							<DialogContentText id='alert-dialog-description'>
								Start your journey.
							</DialogContentText>
						</div>
					</Dialog>
				)}
				{/* Icon */}
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				{/* Title */}
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Email */}
					<TextField
						variant='outlined'
						margin='normal'
						inputRef={register({
							required: 'Required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
						fullWidth
						id='email'
						label='Email Address'
						type='email'
						name='email'
						error={!!errors.email}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<EmailIcon color='secondary' />
								</InputAdornment>
							),
						}}
					/>
					{errors.email && (
						<Alert severity='error'>{errors.email.message}</Alert>
					)}
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
									<IconButton className={classes.visibilityIcon}>
										{!passwordVisible ? (
											<VisibilityIcon
												onClick={() => setPasswordVisible(true)}
											/>
										) : (
											<VisibilityOffIcon
												onClick={() => setPasswordVisible(false)}
											/>
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						fullWidth
						name='password'
						label='Password'
						type={passwordVisible ? 'text' : 'password'}
						id='password'
						error={!!errors.password}
					/>
					{errors.password && (
						<Alert severity='error'>{errors.password.message}</Alert>
					)}
					{/* Remember me */}
					{/* <FormControlLabel
							control={
							<Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false}/>}
							label="Remember me"
						/> */}
					{!isSuccess ? (
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={!!errors.email || !!errors.password}
						>
							Sign In
						</Button>
					) : null}
					{validationErrors && (
						<Alert severity='error'>{validationErrors}</Alert>
					)}
					<Grid container>
						{/* Password Recovery */}
						<Grid item xs>
							<Link href={ForgotRoute} variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						{/* Redirect to Register */}
						<Grid item>
							<Link href={RegisterRoute} variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default LogIn;