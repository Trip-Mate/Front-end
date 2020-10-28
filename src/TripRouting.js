import React, { lazy } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';

import SingleTrip from './Pages/App/Trip/SingleTrip';

const TripPlan = lazy(() => import('../src/Pages/App/Trip/trip-plan'));
const SingleDay = lazy(() => import('./Pages/App/Day/Day'));


export const SingleTripRoute = `/trips/:id`;
export const SingleDayRoute = `/days/:dayID`

function TripRouting () {

    return(
        <Switch>
            <Route path={`${SingleTripRoute}/trip-plan`} exact component={TripPlan} />
            <Route path={SingleTripRoute} exact component={SingleTrip} />
            <Route path={`${SingleTripRoute}${SingleDayRoute}`} exact component={SingleDay} />
        </Switch>
    )
};

export default withRouter(TripRouting);