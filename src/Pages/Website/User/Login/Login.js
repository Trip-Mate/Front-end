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
} from '@material-ui/core';


/* Error Messages */
import Alert from '@material-ui/lab/Alert';

/* Material UI icons */
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

/* User Context */
import CurrentUserContext from '../../../../contexts/current-user/current-user.context';

/* Styles */

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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
	const classes = useStyles();

	const onSubmit = async (user) => {
		try {
			const res = await axios.post('/auth', user);
			if (res) {
				setIsSuccess(true);
				setTimeout(() => {
				props.history.push(OverviewRoute);
			}, 2000);
				}
					const userData = res.data.user;
			setCurrentUser(userData);
			
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<Container component='main' maxWidth='xs'>

			<div className={classes.paper}>
			
			{isSuccess && <Alert severity='success' className={classes.submit}>
							Success. Go start your Adventure. 
						</Alert>}
					
			
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
					/>
					{errors.email && <Alert severity="error">{errors.email.message}</Alert>}

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
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						error={!!errors.password}
					/>
					{errors.password && <Alert severity="error">{errors.password.message}</Alert>}
				
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
					) : ( 
						null
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