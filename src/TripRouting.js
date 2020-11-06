import React, { lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

// Components
import SingleTrip from './Pages/App/Trip/SingleTrip';
const TripPlan = lazy(() => import('../src/Pages/App/Trip/trip-plan'));
const QuickNotes = lazy(() => import('./Pages/App/Trip/QuickNotes'));

// Trip routes
export const SingleTripRoute = `/trips/:id`;
export const TripPlanRoute = `/trips/:id/trip-plan`
export const QuickNotesRoute = `/trips/:id/notes`

function TripRouting () {

    return(
        <Switch>
            <Route path={TripPlanRoute} exact component={TripPlan} />
            <Route path={SingleTripRoute} exact component={SingleTrip} />
            <Route path={QuickNotesRoute} exact component={QuickNotes} />
        </Switch>
    )
};

export default withRouter(TripRouting);