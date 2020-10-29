import React, { useContext, useState } from 'react';
import {Link, useHistory } from "react-router-dom";

// Material Imports
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EmailIcon from '@material-ui/icons/Email';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import { LoginRoute, ProfileRoute, RegisterRoute } from '../../Routing';
import { AccountCircle } from '@material-ui/icons';
import { Avatar, Menu, MenuItem } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
  },
}));

const NavBar = (props) => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [rightAnchorEl, setRightAnchorEl] = useState(null);
	const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
	const history = useHistory();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleRightMenuClick = (e) => {
		setRightAnchorEl(e.currentTarget);
	};

	const handleRightMenuClose = () => {
		setRightAnchorEl(null);
	}

	const handleLogout = () => {
		window.localStorage.clear();
		setCurrentUser(null);
		handleRightMenuClose()
		history.push(LoginRoute);
	};

	const drawer = (
		<div onClick={handleDrawerToggle}>
			<div className={classes.toolbar} />
			<ListItem button component={Link} to="">
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary={'Home'} />
			</ListItem>
			<ListItem button component={Link} to="features">
				<ListItemIcon>
					<FormatListBulletedIcon />
				</ListItemIcon>
				<ListItemText primary={'Features'} />
			</ListItem>
			<ListItem button component={Link} to="docs">
				<ListItemIcon>
					<LibraryBooksIcon />
				</ListItemIcon>
				<ListItemText primary={'Docs'} />
			</ListItem>
			<ListItem button component={Link} to="contact">
				<ListItemIcon>
					<EmailIcon />
				</ListItemIcon>
				<ListItemText primary={'Contact'} />
			</ListItem>
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title} noWrap>
						Travel Mate
					</Typography>
					<div>
						{currentUser ? (
							<>
								<IconButton
									aria-label='account of current user'
									aria-controls='simple-menu'
									aria-haspopup='true'
									color='inherit'
									onClick={handleRightMenuClick}
								>
									<Avatar
										alt={currentUser.name}
										src={`https:${currentUser.avatar}`}
										className={classes.small}
									/>
								</IconButton>
								<Menu
									id='simple-menu'
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									anchorEl={rightAnchorEl}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(rightAnchorEl)}
									onClose={handleRightMenuClose}
								>
									<MenuItem
										component={Link}
										to={ProfileRoute}
										onClick={handleRightMenuClose}
									>
										Profile
									</MenuItem>
									<MenuItem
										onClick={handleLogout}
									>
										Logout
									</MenuItem>
								</Menu>
							</>
						) : (
							<>
								<IconButton
									aria-label='account of current user'
									aria-controls='simple-menu'
									aria-haspopup='true'
									color='inherit'
									onClick={handleRightMenuClick}
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id='simple-menu'
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									anchorEl={rightAnchorEl}
									open={Boolean(rightAnchorEl)}
									onClose={handleRightMenuClose}
								>
									<MenuItem
										component={Link}
										to={LoginRoute}
										onClick={handleRightMenuClose}
									>
										Login
									</MenuItem>
									<MenuItem
										component={Link}
										to={RegisterRoute}
										onClick={handleRightMenuClose}
									>
										Register
									</MenuItem>
								</Menu>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{drawer}
			</Drawer>
		</div>
	);
}

export default NavBar;