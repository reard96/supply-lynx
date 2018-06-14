import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import FAQ from './FAQ';
import About from './About';
import Dashboard from './Dashboard';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Routes extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/faq' component={FAQ} />
          <Route exact path='/about' component={About} />
          {/*<MuiThemeProvider>*/}
            <Route exact path='/dashboard' component={Dashboard} />
          {/*</MuiThemeProvider>*/} 
        </Switch>
      </div>
    );
  }
}

export default Routes;

