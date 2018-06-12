import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserById, fetchServices } from '../store';

class Profile extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    this.props.handleFetchUserById(this.props.currentUser.id);
    this.props.fetchServices();
  }

  render() {
    <div />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.singleUser,
    currentUser: state.currentUser
  };
};

const mapStateToDispatch = dispatch => {
  return {
    handleFetchUserById: function (id) {
      dispatch(fetchUserById(id));
    },
    fetchServices
  };
};

export default withRouter(
  connect(mapStateToProps, mapStateToDispatch)(Profile)
);
