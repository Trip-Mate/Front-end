import React from 'react';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Material UI core*/
import {
	makeStyles,
  Button,
  Modal,
  TextField,
  InputAdornment,
  Typography
} from '@material-ui/core';

/* Material UI icons*/
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

function getModalStyle() {

	return {
		bottom: `20%`,
		left: `5%`,
		transform: `translateY( -10%)`,
    // backgroundColor: '#f50057',
    // color: '#fff'
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '90%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #f50057',
		borderRadius: '10px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	alert: {
		border: '1px solid green',
		borderRadius: '5px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
	},
}));

export default function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  
  const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
		},
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
  };
  
  	const onSubmit = async (user) => {
			// try {
        // const res = await axios.post('/auth', user);
        console.log(user)
			// 	if (res) {
			// 		setIsSuccess(true);
			// 		setTimeout(() => {
			// 			props.history.push(OverviewRoute);
			// 		}, 2000);
			// 		setCurrentUser(res.data.user);
			// 		localStorage.setItem('user', JSON.stringify(res.data));
			// 	}
			// } catch (error) {
			// 	console.log(error);
			// }
		};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Typography component='h1' variant='h5'>
				Delete Account
			</Typography>
			<p id='simple-modal-description'>
				You are about to permanently{' '}
				<span style={{ color: '#f50057' }}>DELETE</span> your account, if you
				wish to proceed, please enter your password and click on delete.
			</p>
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
				<Button
					type='submit'
					variant='contained'
					color='secondary'
					style={{ margin: '0.2rem' }}
				>
					Delete My Account
				</Button>
				{errors.password && (
					<Alert severity='error'>{errors.password.message}</Alert>
				)}
			</form>
		</div>
	);

	return (
		<div>
			<Button
				onClick={handleOpen}
				variant='contained'
				color='secondary'
				style={{ margin: '0.2rem' }}
			>
				Delete Account
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				{modalBody}
			</Modal>
		</div>
	);
}
