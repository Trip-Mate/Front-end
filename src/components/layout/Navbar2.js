import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function MenuAppBar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorEl2, setAnchorEl2] = React.useState(null);

	const preventDefault = (event) => event.preventDefault();

	const handleClose = () => {
		setAnchorEl(null);
		setAnchorEl2(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
						name='el1'
						aria-controls='simple-menu'
						aria-haspopup='true'
						onClick={(e) => setAnchorEl(e.currentTarget)}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id='simple-menu'
						name='el1'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
            <MenuItem onClick={handleClose}>Home</MenuItem>
						<MenuItem onClick={handleClose}>Features</MenuItem>
						<MenuItem onClick={handleClose}>Docs</MenuItem>
						<MenuItem onClick={handleClose}>Contact</MenuItem>
					</Menu>

					<Typography variant='h6' className={classes.title}>
						Trip Mate
					</Typography>
					<div>
						<IconButton
							aria-label='account of current user'
							aria-controls='simple-menu'
							aria-haspopup='true'
							onClick={(e) => setAnchorEl2(e.currentTarget)}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id='simple-menu'
							anchorEl={anchorEl2}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl2)}
							onClose={() => setAnchorEl2(null)}
						>
							<MenuItem onClick={handleClose}>Login</MenuItem>
							<MenuItem onClick={handleClose}>Register</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
