import React, { lazy } from 'react';

import { Route, withRouter, Switch  } from 'react-router-dom';

import Home from './pages/Website/Home/Home';

const Features = lazy(() => import('./pages/Website/Features/Features'));
const Docs = lazy(() => import('./pages/Website/Docs/Docs'));
const Contact = lazy(() => import('./pages/Website/Contact/Contact'));
const Register = lazy(() => import('./pages/Website/User/Register/Register'));
const Login = lazy(() => import('./pages/Website/User/Login/Login'));
const Forgot = lazy(() => import('./pages/Website/User/Forgot/Forgot'));
const Reset = lazy(() => import('./pages/Website/User/Reset/Reset'));
const Overview = lazy(() => import('./pages/App/Overview/Overview'));


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
	<Switch>
		<Route path={HomeRoute} exact component={Home} />
		<Route path={FeaturesRoute} component={Features} />
		<Route path={DocsRoute} component={Docs} />
		<Route path={ContactRoute} component={Contact} />
		<Route path={RegisterRoute} exact component={Register} />
		<Route path={LoginRoute} exact component={Login} />
		<Route path={ForgotRoute} exact component={Forgot} />
		<Route path={ResetRoute} exact component={Reset} />
		<Route path={OverviewRoute} exact component={Overview} />
	</Switch>
	);
}

export default withRouter(Routing);
