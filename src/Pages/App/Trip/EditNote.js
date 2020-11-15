import React from 'react';
import axios from 'axios';

/* React Hook Form */
import { useForm } from 'react-hook-form';

/* Material UI core*/
import {
	Avatar,
	Button,
	TextField,
	makeStyles,
	Container,
	Typography,
	Paper,
} from '@material-ui/core';

import NoteIcon from '@material-ui/icons/Note';

/* Error Messages */
import Alert from '@material-ui/lab/Alert';

// Styles
const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '55px',
	},
	paper: {
		margin: theme.spacing(1, 0),
		padding: theme.spacing(2, 2),
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: theme.spacing(0),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 1),
	},
	error: {
		padding: theme.spacing(0, 2),
	},
	inputFields: {
		margin: theme.spacing(0.5, 0),
	},
	multiline: {
		marginTop: theme.spacing(2),
	},
}));

function NewNote( props ) {
	const [isSuccess, setIsSuccess] = React.useState(false);
  const classes = useStyles();
  const note = props.location.state.note

	const { register, errors, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'all',
		defaultValues: {
			title: `${note.title}`,
			note: `${note.note}`,
		},
	});

	const onSubmit = async (data) => {
		const user = JSON.parse(localStorage.getItem('user'));
		const token = user.token;
		const tripID = props.match.params.id;
		// Data to be sent to the server
		const updatedNote = {
			title: data.title,
			note: data.note,
		};

		try {
			const res = await axios.patch(`/trips/${tripID}/notes/${note._id}`, updatedNote, {
				headers: {
					'x-auth-token': token,
				},
      });

			if (res.status === 200) {
				setIsSuccess(true);

				props.history.push({
					pathname: `/trips/${tripID}/notes`,
				});
      }
    
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<Paper elevation={3} className={classes.paper}>
				{isSuccess ? (
					<Alert severity='success' className={classes.submit}>
						Note created!
					</Alert>
				) : null}
				<div className={classes.titleContainer}>
					<Avatar className={classes.avatar}>
						<NoteIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						New Note
					</Typography>
				</div>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Note title */}
					<TextField
						variant='outlined'
						inputRef={register({
							required: 'Note title is required',
						})}
						fullWidth
						id='title'
						label='Note Title'
						type='text'
						name='title'
						error={false}
					/>
					{errors.title && (
						<Alert severity='error' className={classes.error}>
							{errors.title.message}
						</Alert>
					)}
					{/* Note description */}
					<TextField
						className={classes.multiline}
						multiline
						rows={8}
						variant='outlined'
						inputRef={register({
							required: 'Note description is required',
						})}
						fullWidth
						id='note'
						label='Description'
						type='text'
						name='note'
						error={false}
					/>
					{errors.note && (
						<Alert severity='error' className={classes.error}>
							{errors.note.message}
						</Alert>
					)}
					{/* Submit button */}
					{!isSuccess ? (
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Edit Note
						</Button>
					) : null}
				</form>
			</Paper>
		</Container>
	);
}

export default NewNote;
