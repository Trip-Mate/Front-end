import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Register from './components/Register/register'
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/700.css';


const links = (
	<Router>
      {/* <Route path="/" exact component={Home }/> */}
      <Route path="/register"  component={Register} /> 
      {/* <Route path="/contact-us"  component={ContactUs} />
      <Route path="/about-us"  component={AboutUs} />
      <Route path="/post/:postId"  component={Post} />  */}
    </Router>
)

const App = () => (
	<Fragment>
		<CssBaseline />
		<Navbar />
	</Fragment>
);

export default App;
