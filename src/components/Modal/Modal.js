import React from 'react';
import {
	makeStyles,
  Button,
  Modal
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function getModalStyle() {

	return {
		bottom: `20%`,
		left: `10%`,
		transform: `translateY( -10%)`,
    backgroundColor: '#f50057',
    color: '#fff'
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '80%',
		backgroundColor: theme.palette.background.paper,
    border: '2px solid #f50057',
    borderRadius: '4px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id='simple-modal-title'><HighlightOffIcon /> Delete Account</h2>
			<p id='simple-modal-description'>
				You are about to DELETE your account, if you want to proceed, please enter your password.
			</p>
			
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
