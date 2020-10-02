import React, { useState, Fragment, useRef, useEffect } from 'react';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	FormControl,
	TextField,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React Router + utils
import { ForgotRoute } from '../../../../Routing'
import { Link } from 'react-router-dom';
import { blue } from '@material-ui/core/colors';
// import { LoginRoute} from '../../../../Routing'

const register = {
	name: '',
	email: '',
	password: ''
};
const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: '20px',
		width: '100%',
		direction: 'column',
		justify: 'center',
		alignItems: 'center',
	},
	label: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: 'black',
		maxWidth: '60%',
		background: 'transparent',
	},
	margin: {
		margin: '5px'
	}, 
	
}));

const Register = (props) => {

	const [newUser, setNewUser] = useState();
	const [email, setEmail] = useState(newUser);
	const firstRender = useRef(true);
	const [disable, setDisabled] = useState(true);
	const [nameError, setNameError] = useState(null);
	const classes = useStyles();
	
	// const SubmitForm = () => {
	// 	setNewUser(newUser);
	// }
	
  const handleInputChange = e => {
		const {email, value } = e.target	
}
	
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}setNewUser({
			...newUser,
			 [email]: value,
	})
		console.log(newUser)
	})

	  const handleSave = () => {
		console.log(newUser) 
	  }
	   
	const RegisterForm = ( ) => (
		<Fragment  >
			<FormControl 
		
			className={classes.form}
			autoComplete="off">
				<TextField 
					    className={classes.margin}
						variant='outlined' 
						label='Email'
						onChange  = { e => setEmail(setNewUser) }
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<EmailIcon />
								</InputAdornment>
								),
        					}} /> 		
				<TextField 
						className={classes.margin}
						variant='outlined' 
						label='Full Name'
						name='name' 
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<AccountCircleIcon />
								</InputAdornment>
								),
        					}}/>
				<TextField
						className={classes.margin}
						variant='outlined' 
						label='Password' 
						InputProps={{
						startAdornment: (
							<InputAdornment position="start">
							<LockIcon />
							</InputAdornment>
          				),
    			    }}
					/>
			</FormControl>
			{ nameError && <p>{nameError}</p> }
				<Button	
					 type="submit" 
					
					variant="contained"
					color='secondary'
					onClick={handleSave }
				>
						Register
     		 		</Button>
			{/* <div>
			{/* This is for the Login */}
				{/* <Typography
					variant='body2'
					color='initial'
					component={Link}
					to={ForgotRoute}
				>
					Forgot Password
				</Typography> 
				</div> */}
				
		
		</Fragment>
	);	
	
		return (
			<div>
				<RegisterForm />
			</div>
		);
	};

export default Register;
