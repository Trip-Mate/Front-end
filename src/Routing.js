import React, { useState, lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

import SingleTripContext from './contexts/single-trip/single-trip.context'
// Website routes
import Home from './Pages/Website/Home/Home';

const Features = lazy(() => import('./Pages/Website/Features/Features'));
const Docs = lazy(() => import('./Pages/Website/Docs/Docs'));
const Contact = lazy(() => import('./Pages/Website/Contact/Contact'));
const Register = lazy(() => import('./Pages/Website/User/Register/Register'));
const Login = lazy(() => import('./Pages/Website/User/Login/Login'));
const Forgot = lazy(() => import('./Pages/Website/User/Forgot/Forgot'));
const Reset = lazy(() => import('./Pages/Website/User/Reset/Reset'));

// App routes
const Profile = lazy(() => import('./Pages/Website/User/Profile/Profile'));
const Overview = lazy(() => import('./Pages/App/Overview/Overview'));
const NewTrip = lazy(() => import('./Pages/App/Trip/NewTrip'));
const SingleTrip = lazy(() => import('./Pages/App/Trip/SingleTrip'))
const MyTrips = lazy(() => import('./Pages/App/Trip/my-trips'))
const TripPlan = lazy(() => import('./Pages/App/Trip/TripPlan/TripPlan'))

// Route variables
// Website variables
export const HomeRoute = '/';
export const FeaturesRoute = '/features';
export const DocsRoute = '/docs';
export const ContactRoute = '/contact';
export const RegisterRoute = '/register';
export const LoginRoute = '/login';
export const ForgotRoute = '/forgot';
export const ResetRoute = '/reset/:resetPasswordToken';


// App variables
export const ProfileRoute = '/user/profile'
export const OverviewRoute = '/overview';
export const NewTripRoute = '/trips/new-trip'
export const SingleTripRoute = `/trips/:tripID`;
export const MyTripsRoute = '/trips/my-trips';
// Only for testing, still have to think about the TripPlan route
export const TripPlanRoute = '/trips/:tripID/trip-plan';

// Router
function Routing() {
	const [ singleTrip, setSingleTrip ] = useState({});
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
			<Route path={MyTripsRoute} exact component={MyTrips} />
			<Route path={NewTripRoute} exact component={NewTrip} />
			<Route path={ProfileRoute} exact component={Profile} />
			<SingleTripContext.Provider
				value={{
					singleTrip,
					setSingleTrip,
				}}
			>
				<Route path={TripPlanRoute} exact component={TripPlan} />
				<Route path={SingleTripRoute} exact component={SingleTrip} />
			</SingleTripContext.Provider>
		</Switch>
	);
}

export default withRouter(Routing);
