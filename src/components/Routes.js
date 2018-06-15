import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import About from './About';
import Dashboard from './Dashboard';

const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/about' component={About} />
      </Switch>
    </div>
  );
};

export default Routes;

