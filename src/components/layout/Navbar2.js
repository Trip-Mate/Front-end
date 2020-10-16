import React, { Fragment, useContext } from 'react';

// React Router + utils
import { HomeRoute, FeaturesRoute, DocsRoute, ContactRoute, LoginRoute, RegisterRoute, ProfileRoute } from '../../Routing';
import { Link, withRouter } from 'react-router-dom';

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
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
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

function Logout(props) {

	/* get User Context */
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);



const handleLogout = () => {
 window.localStorage.clear();
 setCurrentUser(null);
 handlePopupClose();
 props.history.push(HomeRoute);
}
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};
const handlePopupClose = () => {
setOpen(false);
};
const classes = useStyles();

return (
 <div> 
   <Button  onClick={handleClickOpen}> Logout   </Button>
   <Dialog
   TransitionComponent={Transition}
   
   open={open}
   onClose={handlePopupClose}
   aria-labelledby="alert-dialog-slide-title"
   aria-describedby="alert-dialog-slide-description"
	 >
   <DialogTitle id="alert-dialog-slide-title">{" Are you sure you want to leave?"}</DialogTitle>
   <DialogActions>
	 <Button onClick={handlePopupClose} color="primary">
	   Stay
	 </Button>
	 <Button onClick={handleLogout} color="primary" autoFocus>
	   Logout
	 </Button>
   </DialogActions>
 </Dialog>

</div>
);
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });


function MenuAppBar(props) {

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorEl2, setAnchorEl2] = React.useState(null);

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

					<Typography variant='h6' className={classes.title}>
						Trip Mate
					</Typography>
					<div>
						{currentUser ? (
							<Fragment>
								<IconButton
									aria-label='account of current user'
									aria-controls='simple-menu'
									aria-haspopup='true'
									onClick={(e) => setAnchorEl2(e.currentTarget)}
									color='inherit'
								>
									<Avatar
										alt={currentUser.name}
										src={`https:${currentUser.avatar}`}
										className={classes.small}
									/>
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
									<MenuItem
										onClick={handleClose}
										component={Link}
										to={ProfileRoute}
									>
										Profile
									</MenuItem>
									{/* <MenuItem
										onClick={handleClose}
										component={Link}
										to={RegisterRoute}
									>
										Settings
									</MenuItem> */}
									<MenuItem>
										<Logout />
									</MenuItem>
								</Menu>
							</Fragment>
						) : (
							<Fragment>
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



export default withRouter(MenuAppBar)
