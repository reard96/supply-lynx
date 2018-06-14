import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

  render() {
    // NODE_ENV BABEL_ENV
    return (
      <div>
        About
      </div>
    );
  }
}

const mapStateToProps = ({ web3, contract, orders, user }) => ({
  web3, contract, orders, user
});

export default connect(mapStateToProps)(About);
