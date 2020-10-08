import React, { Fragment, useContext } from 'react';

// React Router + utils
import { HomeRoute, FeaturesRoute, DocsRoute, ContactRoute, LoginRoute, RegisterRoute, ProfileRoute } from '../../Routing';
import { Link } from 'react-router-dom';

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

export default function MenuAppBar() {

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorEl2, setAnchorEl2] = React.useState(null);

	const handleClose = () => {
		setAnchorEl(null);
		setAnchorEl2(null);
	};

	/* get User Context */
	const { currentUser } = useContext(CurrentUserContext);

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
									<MenuItem
										onClick={handleClose}
										component={Link}
										to={HomeRoute}
									>
										Logout
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
