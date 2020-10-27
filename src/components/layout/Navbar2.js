import React, { Fragment, useContext } from 'react';

// React Router + Routes
import { Link, withRouter } from 'react-router-dom';
import {
	HomeRoute,
	FeaturesRoute,
	DocsRoute,
	ContactRoute,
	LoginRoute,
	RegisterRoute,
	ProfileRoute,
} from '../../Routing';

/* User Context */
import CurrentUserContext from '../../contexts/current-user/current-user.context';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
	Avatar,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
	Button,
	Dialog,
	DialogTitle,
	Slide,
	DialogActions,
} from '@material-ui/core';

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
	small: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
}));

// Logout Modal
const Logout = withRouter((props) => {
	/* get User Context */
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	// Handle popup state
	const [open, setOpen] = React.useState(false);

	// Handling logout function
	const handleLogout = () => {
		// Clear local storage
		window.localStorage.clear();
		// Empty userContext
		setCurrentUser(null);
		// Close popup
		handlePopupClose();
		// Closes user navigation menu
		props.handleClose()
		// Redirect to Home
		props.history.push(HomeRoute);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handlePopupClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{/* Menuitem in profile menu */}
			<MenuItem onClick={handleClickOpen} style={{ textAlign: 'left', paddingLeft: 0 }}>Logout</MenuItem>
			{/* The popup element */}
			<Dialog
				TransitionComponent={Transition}
				open={open}
				onClose={handlePopupClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>
					{' Are you sure you want to leave?'}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handlePopupClose} color='primary'>
						Stay
					</Button>
					<Button onClick={handleLogout} color='primary' autoFocus>
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
})

// Modal move up transition
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

// Top app bar component
function MenuAppBar(props) {
	const classes = useStyles();
	// These keep track of opened/closed states of dropdowns
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorEl2, setAnchorEl2] = React.useState(null);

	// Close both dropdowns
	const handleClose = () => {
		setAnchorEl(null);
		setAnchorEl2(null);
	};

	/* get User Context */
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					{/* Left side icon in app bar */}
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
					{/* Left side drop down menu */}
					<Menu
						id='simple-menu'
						name='el1'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={() => setAnchorEl(null)}
					>
						<MenuItem onClick={handleClose} component={Link} to={HomeRoute}>
							Home
						</MenuItem>
						<MenuItem onClick={handleClose} component={Link} to={FeaturesRoute}>
							Features
						</MenuItem>
						<MenuItem onClick={handleClose} component={Link} to={DocsRoute}>
							Docs
						</MenuItem>
						<MenuItem onClick={handleClose} component={Link} to={ContactRoute}>
							Contact
						</MenuItem>
					</Menu>
					{/* Will be the logo here one day :D */}
					<Typography variant='h6' className={classes.title}>
						Trip Mate
					</Typography>
					<div>
						{/* Right side icon on app bar */}
						{/* If logged in */}
						{currentUser ? (
							<Fragment>
								{/* The avatar icon component wrapper */}
								<IconButton
									aria-label='account of current user'
									aria-controls='simple-menu'
									aria-haspopup='true'
									onClick={(e) => setAnchorEl2(e.currentTarget)}
									color='inherit'
								>
									{/* The avatar itself */}
									<Avatar
										alt={currentUser.name}
										src={`https:${currentUser.avatar}`}
										className={classes.small}
									/>
								</IconButton>
								{/* Right side dropdown menu and menu items */}
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
									<MenuItem
										onClick={handleClose}
										component={Link}
										to={ProfileRoute}
									>
										Profile
									</MenuItem>
									<MenuItem>
										<Logout handleClose={ handleClose } />
									</MenuItem>
								</Menu>
							</Fragment>
						) : (
								// If logged out
								<Fragment>
									{/* Right side icon wrapper */}
								<IconButton
									aria-label='account of current user'
									aria-controls='simple-menu'
									aria-haspopup='true'
									onClick={(e) => setAnchorEl2(e.currentTarget)}
									color='inherit'
									>
										{/* The icon itself */}
									<AccountCircle />
									</IconButton>
									{/* Right side drop down menu and menu items */}
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
									<MenuItem
										onClick={handleClose}
										component={Link}
										to={LoginRoute}
									>
										Login
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										component={Link}
										to={RegisterRoute}
									>
										Register
									</MenuItem>
								</Menu>
							</Fragment>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(MenuAppBar);
