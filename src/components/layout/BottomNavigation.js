import React, { useContext } from 'react';

// React Router + utils
import { withRouter } from 'react-router-dom';
import { OverviewRoute } from '../../Routing';

// User Context
import CurrentUserContext from '../../contexts/current-user/current-user.context'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Button } from '@material-ui/core/';

// Material-UI Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
// import EditIcon from '@material-ui/icons/Edit';

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
	const [value, setValue] = React.useState(0);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const classes = useStyles();
	
	return currentUser ? (
		// Bottom navigation bar
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			{/* Nav buttons */}
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
			{/* Extra button in case we need one more */}
			{/* <BottomNavigationAction
				label='Edit'
				icon={<EditIcon />}
				component={Button}
				// TODO: Has to be changed edit function is implemented
        link={HomeRoute}
        className={classes.button}
			/> */}
		</BottomNavigation>
	) : null;
};

export default withRouter(BottomNavigationTrips);
