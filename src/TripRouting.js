import React, { lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

import SingleTrip from './Pages/App/Trip/SingleTrip';

const TripPlan = lazy(() => import('../src/Pages/App/Trip/trip-plan'));

export const SingleTripRoute = `/trips/:id`;

function TripRouting () {

    return(
        <Switch>
            <Route path={`${SingleTripRoute}/trip-plan`} exact component={TripPlan} />
            <Route path={SingleTripRoute} exact component={SingleTrip} />
        </Switch>
    )
};

export default withRouter(TripRouting);