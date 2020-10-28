import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
	HomeRoute,
	FeaturesRoute,
	DocsRoute,
	ContactRoute,
	LoginRoute,
	RegisterRoute,
	ProfileRoute,
	OverviewRoute,
} from '../../Routing';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Button } from '@material-ui/core/';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
    bottom: 0,
    marginTop: '60px',
	},
	button: {
		'&$selected': {
			fontSize: '10px',
		}
	}
});



const BottomNavigationTrips = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				label='Back'
				icon={<ArrowBackIcon />}
				component={Button}
				// TODO: Has to be changed when the parent component is completed
				onClick={() => props.history.goBack()}
			/>
			<BottomNavigationAction
				label='App Home'
				icon={<HomeIcon />}
				component={Button}
				onClick={() => props.history.push(OverviewRoute)}
			/>
			{/* <BottomNavigationAction
				label='Edit'
				icon={<EditIcon />}
				component={Button}
				// TODO: Has to be changed edit function is implemented
        link={HomeRoute}
        className={classes.button}
			/> */}
		</BottomNavigation>
	);
};

export default withRouter(BottomNavigationTrips);
