import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import FAQ from './FAQ';
import About from './About';
import Dashboard from './Dashboard';

const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/about' component={About} />
      </Switch>
    </div>
  );
};

export default Routes;

