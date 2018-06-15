import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import FAQ from './FAQ';
import About from './About';
import Dashboard from './Dashboard';

const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/about' component={About} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Routes;

