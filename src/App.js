import React from 'react';

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
		<Routing />
	</Router>
);

export default App;