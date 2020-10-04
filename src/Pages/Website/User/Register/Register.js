import React, { useState, Fragment } from 'react';

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
import { blue } from '@material-ui/core/colors';
// import { LoginRoute } from '../../../../Routing'

// Styles 
const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: '20px',
		width: '80%',
		display: 'grid',
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

const RegisterForm = ( ) => { 
	
	const [newUser, SetNewUser] = useState({  
		email: '',
		username: '',
		password: ''
	
	})

	const user = {
		email: newUser.email,
		username: newUser.username,
		password: newUser.password
	}
	const onSubmit = async (values) => {
		console.log(values);
		const {data} = await axios.post('/auth', { ...values});
		console.log(data);
	  };
	

	
	const classes = useStyles();
	
	return ( 
	<Fragment  >
		
		<Avatar className={classes.Avater}>
								<AssignmentIndIcon  />
						</Avatar>

			<h1 className={classes.h1}>Please Register Below</h1>	
				 {/* form  */}
				<form className={classes.form} >
				{/* Email */}
						<TextField 
							error
							variant='outlined' 
							margin='normal'
							label='Email Address'
							value={newUser.email}
							onChange={(e) => SetNewUser(e.target.value)} 
							
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<EmailIcon color='secondary'/>
								</InputAdornment>
								),
        					}}/>
				{/*username  */}
				<TextField 
							margin='normal'
							variant='outlined' 
							label='Username'
							name='username' 
							value={newUser.username}
							onChange={(e) => SetNewUser(e.target.value)} 
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<AccountCircleIcon color='secondary' />
								</InputAdornment>
								),
        					}}/>
				{/* Password */}
				<TextField
							error
							margin='normal'
							variant='outlined' 
							label='Password' 
							name="password"
							value={newUser.password}
							onChange={(e) => SetNewUser(e.target.value)} 
							
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<LockIcon color='secondary' />
								</InputAdornment>
          						),
    			   		 }}/>
					<Button	 	
						// component={Link} to={}
						onClick={onSubmit}
						
						variant='contained'
						color='secondary'
						className={classes.Avater}
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
			
	
	</Fragment>
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