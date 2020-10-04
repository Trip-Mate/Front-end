import React, { useState } from 'react';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* React Hook Form DevTools to help debug forms with validation. */
import { DevTool } from '@hookform/devtools';

/* Axios */
import API from '../../../../api';

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
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/* Material UI icons */
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

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

	const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
			password2: '',
		},
	});

	const classes = useStyles();

	const onSubmit = async (passwords) => {
		try {
			const res = await API.post('/users/reset', { resetPasswordToken: props.match.params.resetPasswordToken, password: passwords.password  });
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
			<DevTool control={control} />

			<div className={classes.paper}>
				{/* Icon */}
				{isSuccess ? (
						<Alert severity='success'>
							Password has been reset!
						</Alert>
				) : null}
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
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						error={!!errors.password}
					/>
					{errors.password && errors.password.message}
					{/* Password 2*/}
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
						name='password2'
						label='Password Confirm'
						type='password'
						id='password2'
						error={!!errors.password2}
					/>
					{errors.password2 && errors.password2.message}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!!errors.password && !!errors.password2}
					>
						Reset Password
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default Reset;
