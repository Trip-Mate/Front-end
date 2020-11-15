import React, { lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

// Components
import SingleTrip from './Pages/App/Trip/SingleTrip';
const TripPlan = lazy(() => import('./Pages/App/Trip/trip-plan'));
const QuickNotes = lazy(() => import('./Pages/App/Trip/QuickNotes'));
const NewNote = lazy(() => import('./Pages/App/Trip/NewNote'));
const EditNote = lazy(() => import('./Pages/App/Trip/EditNote'));


// Trip routes
export const SingleTripRoute = `/trips/:id`;
export const TripPlanRoute = `/trips/:id/trip-plan`
export const QuickNotesRoute = `/trips/:id/notes`
export const NewNoteRoute = `/trips/:id/notes/new`
export const EditNoteRoute = `/trips/:id/notes/edit`;

function TripRouting () {

    return (
			<Switch>
				<Route path={TripPlanRoute} exact component={TripPlan} />
				<Route path={SingleTripRoute} exact component={SingleTrip} />
				<Route path={QuickNotesRoute} exact component={QuickNotes} />
				<Route path={NewNoteRoute} exact component={NewNote} />
				<Route path={EditNoteRoute} exact component={EditNote} />
			</Switch>
		);
};

export default withRouter(TripRouting);