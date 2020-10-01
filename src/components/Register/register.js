import React, { useState } from 'react';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, TextField } from '@material-ui/core';

const registerValues = {
	name: '',
	email: '',
	password: ''
};

const Register = () => {
	const [newUser, setnewUser] = useState(registerValues);

	const useStyles = makeStyles((theme) => ({
		form: {
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
		<div>
			<FormControl className={classes.form}>
				<TextField variant="outlined"
				label="Email"
				value={newUser.email}
				/>
				 <TextField variant="outlined"
				label="Full Name"
				value={newUser.name}
				/>
				 <TextField variant="outlined"
				label="Password"
				value={newUser.password}
				/>
			</FormControl>
		</div>
		)
		return (
			<div>
			<h1>
				Hello world
			</h1>
				<RegisterForm />
			</div>
		);
	};
	Register.propTypes = {
		/**
		 * Injected by the documentation to work in an iframe.
		 * You won't need it on your project.
		 */
		window: Register.func,
	};

export default Register;
