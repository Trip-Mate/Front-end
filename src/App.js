import React, { useState, Suspense } from 'react';

import Spinner from './components/Spinner/Spinner';

import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing.js';
import Navbar from './components/layout/Navbar2';

/* User Context */
import CurrentUserContext from './contexts/current-user/current-user.context';

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/700.css';

const App = () => {

	const [ currentUser, setCurrentUser ] = useState(null);
	
	return(
		<Router>
			<CssBaseline />
			<CurrentUserContext.Provider value={{
				currentUser,
				setCurrentUser
			}}>
				<Navbar />
				<Suspense fallback={<Spinner />}>
					<Routing />
				</Suspense>
			</CurrentUserContext.Provider>
		</Router>
	)
};

export default App;