import React, { useState } from 'react';
import {Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Material Imports
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EmailIcon from '@material-ui/icons/Email';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

function ResponsiveDrawer(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
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

export default ResponsiveDrawer;


