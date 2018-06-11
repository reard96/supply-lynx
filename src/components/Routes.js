import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AllServices from './AllServices'
import SingleService from './SingleService'
import AddService from './AddService'
import SingleUser from './SingleUser'
import SingleUserPublic from './SingleUserPublic'
import Homepage from './Homepage'
import { Login, Signup } from './SignUp'
import NavBar from './NavBar'
import FAQ from './FAQ'
import About from './About'
import MyProfile from './MyProfile'

import IntegrationReactSelect from './EntityDashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
// injectTapEventPlugin();

class Routes extends Component {
  componentDidMount() {
    window.scroll(0, 0)
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log('isLoggedIn', isLoggedIn)
    return (
      <div>
        <NavBar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/about" component={About} />
          <MuiThemeProvider><Route exact path='/entity' component={IntegrationReactSelect} /></MuiThemeProvider>
          {
            isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path='/home' component={SingleUser} />
              <Route path='/users/:id' component={SingleUserPublic} />
              <Route exact path='/services' component={AllServices} />
              <Route exact path='/services/new' component={AddService} />
              <Route exact path='/services/:id' component={SingleService} />
              <Route exact path='/my-profile' component={MyProfile} />
            </Switch>
          }
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

const mapState = ({ user }) => {
  return {
    isLoggedIn: true,
  }
}

export default withRouter(connect(mapState)(Routes))

