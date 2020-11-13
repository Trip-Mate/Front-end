import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Spinner from '../../../components/Spinner/Spinner';

import {
	Container,
	Grid,
	makeStyles,
	Paper,
	Fab,
	Typography,
	IconButton
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: '65px',
	},
	paper: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(2),
	},
	headerContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	header: {
		fontSize: '1.5rem',
	},
	description: {
		marginTop: theme.spacing(2),
	},
	iconContainer: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'flex-end',
	},
	fab: {
		position: 'fixed',
		top: theme.spacing(10),
		right: theme.spacing(2),
	},
}));

const QuickNotes = ({ match }) => {
	const classes = useStyles();
	const [notes, setNotes] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				/* getting user token */
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;
				const tripID = match.params.id;

				/* getting authorized response */
				const res = await axios.get(`/trips/${tripID}/notes`, {
					headers: {
						'x-auth-token': token,
					},
					params: {
						id: tripID,
					},
				});

				/* getting notes */
				const notes = await res.data.notes;
				console.log('Notes Data', notes);

				/* passing days Ids to Use State Days*/
				setNotes(notes)
				setIsLoaded(true);

			} catch (error) {
				console.log('Error', error.message);
			}
		})();
}, [match.params.id, setNotes]);

	return (
		<Container className={classes.container}>
			<Fab color='secondary' aria-label='add' className={classes.fab}>
				<AddIcon />
			</Fab>
			{isLoaded ? (
				!notes?.length > 0 ? (
					<h2>There are no notes here!</h2>
				) : (
					notes.map((note, idx) => (
						<Grid item xs={12} sm={12} key={note._id}>
							<Paper className={classes.paper}>
								<div className={classes.headerContainer}>
									<div>
										<div className={classes.header}>{note.title}</div>
									</div>
								</div>
								<Typography className={classes.description}>
									{note.note}
								</Typography>
								<div className={classes.iconContainer}>
									<IconButton aria-label='edit' color='primary'>
										<EditIcon fontSize='large' />
									</IconButton>
									<IconButton aria-label='delete' color='secondary'>
										<DeleteIcon fontSize='large' />
									</IconButton>
								</div>
							</Paper>
						</Grid>
					))
				)
			) : (
				<Spinner />
			)}
		</Container>
	);
}

export default QuickNotes
