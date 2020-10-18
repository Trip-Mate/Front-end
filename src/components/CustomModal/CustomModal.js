import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

/* Material UI core*/
import {
	Button,
	Modal,
  	Backdrop,
	IconButton,
	makeStyles,
	Typography
} from '@material-ui/core';

/* Material UI icons*/
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '80%',
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
	}
}));

const CustomModal = (props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const classes = useStyles();
	let styles = {
		top: '40%',
		left: '10%',
		transform: 'translateY( -10%)'
	}
	styles = Object.assign({}, styles, props.modalStyles);
	return (
		<div>
			<Button
				onClick={handleOpen}
				variant={props.buttonVariant || 'contained'}
				color={props.buttonColor || 'primary'}
				style={{ margin: '0.2rem' }}
			>
				{props.buttonTitle}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<div style={styles} className={classes.paper}>
					{
						props.closeIcon && (
							<IconButton
								aria-label='cancel'
								className={classes.cancelWrapper}
								onClick={handleClose}
							>
								<CancelIcon className={classes.cancelButton} />
							</IconButton>
						)
					}
					<Typography component='h1' variant='h5'>
						{props.header}
					</Typography>
					<p id='modal-description' className={classes.description}>
						{props.description}
					</p>
					{props.modalBody}
				</div>
			</Modal>
		</div>
	)
};
export default withRouter(CustomModal)
