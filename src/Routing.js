<<<<<<< HEAD
import React, { lazy } from 'react';
=======
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './Pages/Website/Home/Home';
import Features from './Pages/Website/Features/Features';
import Docs from './Pages/Website/Docs/Docs';
import Contact from './Pages/Website/Contact/Contact';
import Register from './Pages/Website/User/Register/Register';
import Login from './Pages/Website/User/Login/Login';
import Forgot from './Pages/Website/User/Forgot/Forgot';
import Reset from './Pages/Website/User/Reset/Reset';
import Overview from './Pages/App/Overview/Overview';
>>>>>>> c89697a3c4a3eafc4857d450d695296b5299a5e6

import { Route, withRouter, Switch } from 'react-router-dom';

import Home from './Pages/Website/Home/Home';

const Features = lazy(() => import('./Pages/Website/Features/Features'));
const Docs = lazy(() => import('./Pages/Website/Docs/Docs'));
const Contact = lazy(() => import('./Pages/Website/Contact/Contact'));
const Register = lazy(() => import('./Pages/Website/User/Register/Register'));
const Login = lazy(() => import('./Pages/Website/User/Login/Login'));
const Forgot = lazy(() => import('./Pages/Website/User/Forgot/Forgot'));
const Reset = lazy(() => import('./Pages/Website/User/Reset/Reset'));
const Overview = lazy(() => import('./Pages/App/Overview/Overview'));

export const HomeRoute = '/';
export const FeaturesRoute = '/features';
export const DocsRoute = '/docs';
export const ContactRoute = '/contact';
export const RegisterRoute = '/register';
export const LoginRoute = '/login';
export const ForgotRoute = '/forgot';
export const ResetRoute = '/reset';
export const OverviewRoute = '/overview';

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
