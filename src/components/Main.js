import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../store/users';
import { Container } from 'reactstrap';

import Vote from './Vote';

class Main extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Route
            render={({ history, location }) => (
              <Navigation history={history} path={location.pathname} />
            )}
          /> */}
          <Container>
            <Switch>
              <Route path='/' exact render={() => <Vote />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
