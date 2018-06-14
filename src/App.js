import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchWeb3,
  fetchContract,
  fetchOrders,
  fetchServices,
  fetchUsers,
  fetchUser
} from './store';
import Routes from './components/Routes';
import { withRouter } from 'react-router-dom';
import './App.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchBlockchainInfo = this.fetchBlockchainInfo.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillMount() {
    this.fetchBlockchainInfo();
    this.props.fetchServices();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract.address) {
      this.props.fetchOrders(nextProps.contract);
    }
  }

  async fetchBlockchainInfo() {
    try {
      await this.props.fetchWeb3();
      await this.props.fetchUsers();
      this.props.fetchContract(web3);
      this.props.fetchUser(web3.eth.accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className='App'>
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = ({ web3, contract, users }) => {
  return { web3, contract, users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeb3: function () {
      return dispatch(fetchWeb3());
    },
    fetchContract: function (web3) {
      return dispatch(fetchContract(web3));
    },
    fetchOrders: function (contract) {
      return dispatch(fetchOrders(contract));
    },
    fetchServices: function (orders) {
      return dispatch(fetchServices(orders));
    },
    fetchUsers: function () {
      return dispatch(fetchUsers());
    },
    fetchUser: function (address) {
      return dispatch(fetchUser(address));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
