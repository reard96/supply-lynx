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
    this.collectBlockchainInfo = this.collectBlockchainInfo.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillMount() {
    this.collectBlockchainInfo();
    this.props.fetchServices();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract.address) {
      nextProps.contract.getOrdersCount().then(async (data) => {
        const orders = await Promise.all(Array(parseInt(data.toNumber()))
          .fill()
          .map(async (element, index) => {
            const order = await this.props.contract.orders(index);
            return {
              productId: order[1].toNumber(),
              quantity: order[2].toNumber(),
              price: order[3].toNumber(),
              unit: order[4],
              class: order[5],
              status: order[6],
              buyer: order[7],
              seller: order[8],
            };
          }));
        await this.props.fetchOrders(orders);
      });
    }
  }

  async collectBlockchainInfo() {
    try {
      await this.props.fetchWeb3();
      await this.props.fetchUsers();
      const web3 = this.props.web3;
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

function mapStateToProps({ web3, contract, users }) {
  return { web3, contract, users };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeb3: function () {
      return dispatch(fetchWeb3());
    },
    fetchContract: function (web3) {
      return dispatch(fetchContract(web3));
    },
    fetchOrders: function (orders) {
      return dispatch(fetchOrders(orders));
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
