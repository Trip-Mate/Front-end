import React from 'react';

// Router
import { RegisterRoute, ForgotRoute } from '../../../../Routing';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Material UI core*/
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Typography,
	makeStyles,
	Container,
} from '@material-ui/core';

/* Material UI icons */
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

function LogIn() {
	const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const classes = useStyles();

	const onSubmit = (values) => console.log(values);

	return (
		<Container component='main' maxWidth='xs'>
			<DevTool control={control} />

			<div className={classes.paper}>
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
					{errors.email && errors.email.message}

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
					{errors.password && errors.password.message}

					{/* Remember me */}

					{/* <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false}/>}
            label="Remember me"
          /> */}

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
