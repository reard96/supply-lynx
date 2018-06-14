import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './Homepage';
import NavBar from './NavBar';
import FAQ from './FAQ';
import About from './About';
import Profile from './Profile';
import Dashboard from './Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
          <Route exact path='/' component={Homepage} />
          <Route exact path='/faq' component={FAQ} />
          <Route exact path='/about' component={About} />
          <Route exact path='/profile' component={Profile} />
          <MuiThemeProvider>
            <Route exact path='/dashboard' component={Dashboard} />
          </MuiThemeProvider>
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

