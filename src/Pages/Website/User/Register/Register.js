import React, { useState, Fragment } from 'react';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
	FormControl,
	InputLabel,
	TextField,
	Typography,
} from '@material-ui/core';

// React Router + utils
import { ForgotRoute } from '../../../../Routing'
import { Link } from 'react-router-dom';

const registerValues = {
	name: '',
	email: '',
	password: ''
};

const Register = () => {
	const [newUser, setnewUser] = useState(registerValues);

	const useStyles = makeStyles((theme) => ({
		form: {
			marginTop: '20px',
			width: '80%',
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
	}));
	const classes = useStyles();
	
	const RegisterForm = () => (
		<Fragment>
			<FormControl className={classes.form}>
				<TextField variant='outlined' label='Email' value={newUser.email} />
				<TextField variant='outlined' label='Full Name' value={newUser.name} />
				<TextField
					variant='outlined'
					label='Password'
					value={newUser.password}
				/>
			</FormControl>
			<div>
				<Typography
					variant='body2'
					color='initial'
					component={Link}
					to={ForgotRoute}
				>
					Frogot Password
				</Typography>
			</div>
		</Fragment>
	);
	
		return (
			<div>
				<RegisterForm />
			</div>
		);
	};

export default Register;
