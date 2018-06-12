import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllServices from './AllServices';
import SingleService from './SingleService';
import AddService from './AddService';
import SingleUserPublic from './SingleUserPublic';
import Homepage from './Homepage';
import { Login, Signup } from './SignUp';
import NavBar from './NavBar';
import FAQ from './FAQ';
import About from './About';
import MyProfile from './MyProfile';

import Dashboard from './Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
// injectTapEventPlugin();

class Routes extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log('logged in:', isLoggedIn);
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/faq' component={FAQ} />
          <Route exact path='/about' component={About} />
          <MuiThemeProvider><Route exact path='/dashboard' component={Dashboard} /></MuiThemeProvider>
          <Route path='/users/:id' component={SingleUserPublic} />
          <Route exact path='/services' component={AllServices} />
          <Route exact path='/services/new' component={AddService} />
          <Route exact path='/services/:id' component={SingleService} />
          <Route exact path='/profile' component={MyProfile} />
          <Route component={Login} />
        </Switch>
      </div>
    );
  }
}

const mapState = ({ user }) => {
  return {
    isLoggedIn: !!user.id
  };
};

export default withRouter(connect(mapState)(Routes));

