import React, { useContext } from 'react';
import axios from 'axios';
import {HomeRoute} from '../../Routing';
import CurrentUserContext from '../../contexts/current-user/current-user.context';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Material UI core*/
import {
	makeStyles,
	Button,
	TextField,
	InputAdornment
} from '@material-ui/core';

/* Material UI icons*/
import VpnKeyIcon from '@material-ui/icons/VpnKey';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';
import CustomModal from '../CustomModal/CustomModal';


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

const DeleteAccount = (props) => {
	const classes = useStyles();
  	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  	const [isSuccess, setIsSuccess] = React.useState(false)

  	const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
		},
	});

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
				if (res.status === 200) {
					// console.log(res)
					setIsSuccess(true);
					console.log('success')
					props.history.push(HomeRoute);
					setCurrentUser(null);
					window.localStorage.clear();
				}
			} catch (error) {
				console.log(error);
			}
		};

  	const modalBody = (
			<>
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
			</>
	);

	const description = (
		<>
			You are about to permanently <span style={{ color: '#f50057' }}>DELETE</span> your account, 
			if you wish to proceed, please enter your password and click on delete.
		</>
	);
	return (
		<CustomModal
			buttonColor="secondary"
			buttonTitle="Delete Account"
			modalBody={modalBody}
			header="Delete Account"
			description={description}
			closeIcon
		/>
	);
}

export default DeleteAccount;
