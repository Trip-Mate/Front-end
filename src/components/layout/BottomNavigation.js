import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
	root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
	},
});

const BottomNavigationTrips = () => {

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
			<BottomNavigationAction label='Back' icon={<ArrowBackIcon />} />
			<BottomNavigationAction label='Home' icon={<HomeIcon />} />
			<BottomNavigationAction label='Edit' icon={<EditIcon />} />
		</BottomNavigation>
	);
}

export default BottomNavigationTrips
