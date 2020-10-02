import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './pages/Website/Home/Home';
import Features from './pages/Website/Features/Features';
import Docs from './pages/Website/Docs/Docs';
import Contact from './pages/Website/Contact/Contact';
import Register from './pages/Website/User/Register/Register';
import Login from './pages/Website/User/Login/Login';
import Forgot from './pages/Website/User/Forgot/Forgot';
import Reset from './pages/Website/User/Reset/Reset';
import Overview from './pages/App/Overview/Overview';



export const HomeRoute = '/';
export const FeaturesRoute = '/features';
export const DocsRoute = '/docs';
export const ContactRoute = '/contact';
export const RegisterRoute = '/register';
export const LoginRoute = '/login';
export const ForgotRoute = '/forgot';
export const ResetRoute = '/reset';
export const OverviewRoute = '/overview'


function Routing() {
  return (
		<div>
			<Route path={HomeRoute} exact component={Home} />
			<Route path={FeaturesRoute} component={Features} />
			<Route path={DocsRoute} component={Docs} />
			<Route path={ContactRoute} component={Contact} />
			<Route path={RegisterRoute} exact component={Register} />
			<Route path={LoginRoute} exact component={Login} />
			<Route path={ForgotRoute} exact component={Forgot} />
			<Route path={ResetRoute} exact component={Reset} />
			<Route path={OverviewRoute} exact component={Overview} />
		</div>
	);
}

export default withRouter(Routing);
