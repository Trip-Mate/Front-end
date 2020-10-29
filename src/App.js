import React, { useState, Suspense, useEffect } from 'react';

import Spinner from './components/Spinner/Spinner';

import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing.js';
import Navbar from './components/layout/Navbar';

/* User Context */
import CurrentUserContext from './contexts/current-user/current-user.context';
import BottomNavigation from './components/layout/BottomNavigation';

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/700.css';

const App = () => {

	const [ currentUser, setCurrentUser ] = useState(null);
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const data = JSON.parse(loggedInUser);
			setCurrentUser(data.user);
		}
	}, []);
	return (
			<Router>
				<CssBaseline />
				<CurrentUserContext.Provider
					value={{
						currentUser,
						setCurrentUser,
					}}
				>
					<Navbar />
					<Suspense fallback={<Spinner />}>
						<Routing />
						<BottomNavigation />
					</Suspense>
				</CurrentUserContext.Provider>
			</Router>
	);
};

export default App;