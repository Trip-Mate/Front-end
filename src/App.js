import React, { Suspense } from 'react';

import Spinner from './components/spinner/spinner.component';

import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing.js';
import Navbar from './components/layout/Navbar2';

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/700.css';

const App = () => (
	<Router>
		<CssBaseline />
		<Navbar />
		<Suspense fallback={<Spinner />}>
			<Routing />
		</Suspense>
	</Router>
);

export default App;
