import React, { lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

// Components
import SingleTrip from './Pages/App/Trip/SingleTrip';
const TripPlan = lazy(() => import('./Pages/App/Trip/trip-plan'));
const QuickNotes = lazy(() => import('./Pages/App/Trip/QuickNotes'));
const NewNote = lazy(() => import('./Pages/App/Trip/NewNote'));

// Trip routes
export const SingleTripRoute = `/trips/:id`;
export const TripPlanRoute = `/trips/:id/trip-plan`
export const QuickNotesRoute = `/trips/:id/notes`
export const NewNoteRoute = `/trips/:id/notes/new`

function TripRouting () {

    return(
        <Switch>
            <Route path={TripPlanRoute} exact component={TripPlan} />
            <Route path={SingleTripRoute} exact component={SingleTrip} />
            <Route path={QuickNotesRoute} exact component={QuickNotes} />
            <Route path={NewNoteRoute} exact component={NewNote} />
        </Switch>
    )
};

export default withRouter(TripRouting);