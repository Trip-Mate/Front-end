import React, { useState } from 'react'

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Axios */
import API from '../../../../api';

// Router
import { LoginRoute } from '../../../../Routing';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	Typography,
	makeStyles,
  Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/* Material UI icons */
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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

function Forgot(props) {

	const [isSuccess, setIsSuccess] = useState(false);

  const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	const classes = useStyles();

	const onSubmit = async (email) => {

		try {
			const res = await API.post('/users/forgot', { user: email });
			if (res) {
				setIsSuccess(true);
				setTimeout(() => {
					props.history.push(LoginRoute);
				}, 2000);
			}
		} catch (error) {
			console.log(error)
		}
	};

  return (
		<Container component='main' maxWidth='xs'>
			<DevTool control={control} />

			<div className={classes.paper}>
				{/* Icon */}
				<Avatar className={classes.avatar}>
					<MailOutlineIcon />
				</Avatar>

				{/* Title */}
				<Typography component='h1' variant='h5'>
					Forgot Password
				</Typography>
				{/* Linebreak */}
				<hr className={classes.lineBreak} />
				{/* Description */}
				<Typography paragraph>
					Please enter your email address in order to send you a password reset
					link.
				</Typography>

				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Email */}
					{!isSuccess ? (
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
					) : (
						<Alert severity='success'>
							Email has been sent!
						</Alert>
					)}
					{errors.email && errors.email.message}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!!errors.email || !!errors.password}
					>
						Send recovery email
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default Forgot
