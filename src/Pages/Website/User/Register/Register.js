import React, { useState, Fragment } from 'react';
import axios from 'axios';

/* React Hook Form */
import { useForm } from 'react-hook-form';


// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	FormControl,
	Typography,
	TextField,
	Avatar,
	Container,
} from '@material-ui/core';


// Icons
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

// React Router + utils
import { ForgotRoute } from '../../../../Routing'
import { Link } from 'react-router-dom';
import { OverviewRoute } from '../../../../Routing'

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
	Avater: {
		margin: theme.spacing(1),
		 backgroundColor: theme.palette.secondary.main,
		 justify: 'center',
		alignItems: 'center',
		margin: ' 20px auto auto auto',
		fontSize: 'large',
	},
}));

const RegisterForm = ( props) => { 
	
	const { register, errors, handleSubmit, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
		  email: '',
		  username: '',
		  password: '',
		},
	  });


	const onSubmit = async (email, password, username) => {
	    try {
			const res = await axios.post('/users/register', { user: email, password, username });
			if (res) {
			  setTimeout(() => {
				props.history.push(OverviewRoute);
			  }, 2000);
			}
		  } catch (error) {
			console.log(error);
		  }
		};
		
		
	
	const classes = useStyles();
	
	return ( 
	<Container maxWidth='xs' component='main' >

	
	
		<Avatar className={classes.Avater}>
								<AssignmentIndIcon  />
						</Avatar>

			<h1 className={classes.h1}>Please Register Below</h1>	
				 {/* form  */}
			
				<form className={classes.form} 
				   onSubmit={handleSubmit(onSubmit)} >
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
								<InputAdornment position="start">
								<EmailIcon color='secondary'/>
								</InputAdornment>
								),
        					}}
							error={!!errors.email}
							/>
							  {errors.email && errors.email.message}
				{/*username  */}
				<TextField 
							fullWidth	
							margin='normal'
							variant='outlined' 
							label='Username'
							name='username' 
							required={true}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<AccountCircleIcon color='secondary' />
								</InputAdornment>
								),
        					}}
							error={!!errors.username}
							/>
							{errors.username && errors.username.message}

				{/* Password */}
				<TextField
							
							margin='normal'
							variant='outlined' 
							label='Password' 
							name="password"
							inputRef={register({
								required: 'Required',
								pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message: 'Please include at least 1 character and 1 number',
								},
								})}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<LockIcon color='secondary' />
								</InputAdornment>
          						),
    			   		 }}
							error={!!errors.password}
							/>
							      {errors.password && errors.password.message}
					<Button	 	
						component={Link} to={OverviewRoute}
						margin='normal'
						fullWidth
						variant='contained'
						color='primary'
						disabled={!!errors.email || !!errors.password}

					>	Register</Button>
		</form>
	
		<div>
			 <Typography
				variant='body2'
				color='initial'
				component={Link}
				to={ForgotRoute}
			>
				Forgot Password
			</Typography> 
			</div>
	</Container>
);	
						}

const Register = (props) => {
	    
		return (
			<div>
				<RegisterForm />
			</div>
		);
	};

export default Register;