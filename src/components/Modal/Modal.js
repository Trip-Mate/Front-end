import React, { useContext } from 'react';
import axios from 'axios';
import {HomeRoute} from '../../Routing';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import { withRouter } from 'react-router-dom';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Material UI core*/
import {
	makeStyles,
	Button,
	Modal,
	TextField,
	InputAdornment,
	Typography,
	IconButton,
  Fade,
  Backdrop
} from '@material-ui/core';

/* Material UI icons*/
import CancelIcon from '@material-ui/icons/Cancel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';


function getModalStyle() {

	return {
		bottom: `20%`,
		left: `5%`,
		transform: `translateY( -10%)`,
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
	error: {
    padding: theme.spacing(0, 2),
	},
	cancelWrapper: {
		position: 'absolute',
		top: '0',
		right: '0',
		color: '#f50057',
	},
	cancelButton: {
		width: '32px',
		height: '32px',
	},
	description: {
		textAlign: 'justify',
	},
	submit: {
		width: '100%',
		marginTop: '8px',
	},
}));

function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = React.useState(false)
  
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
  
  	const onSubmit = async (data) => {
			try {
				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
				const password = data.password;
				const options = {
					headers: { 'x-auth-token': token },
				};
        
				const res = await axios.post(
					'/users/delete',
					{
						user: { password },
					},
					options
				);
				if (res) {
					// setIsSuccess(true);
					// 	props.history.push(HomeRoute);
console.log('success')
					// setCurrentUser(null);
					// localStorage.setItem('user', JSON.stringify(currentUser));
				}
			} catch (error) {
				console.log(error);
			}
		};

  const modalBody = (
		<Fade in={open}>
			<div style={modalStyle} className={classes.paper}>
				<IconButton
					aria-label='cancel'
					className={classes.cancelWrapper}
					onClick={handleClose}
				>
					<CancelIcon className={classes.cancelButton} />
				</IconButton>
				<Typography component='h1' variant='h5'>
					Delete Account
				</Typography>
				<p id='simple-modal-description' className={classes.description}>
					You are about to permanently <span style={{ color: '#f50057' }}>DELETE</span> your account, if you
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
									<VpnKeyIcon color='secondary' />
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
						<Alert severity='error' className={classes.error}>
							{errors.password.message}
						</Alert>
					)}
					<Button
						className={classes.submit}
						type='submit'
						variant='contained'
						color='secondary'
					>
						Delete My Account
					</Button>
				</form>
			</div>
		</Fade>
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
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				{modalBody}
			</Modal>
		</div>
	);
}

export default withRouter(SimpleModal)
