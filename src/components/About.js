import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
  constructor() {
    super();
    this.submitQuote = this.submitQuote.bind(this);
    this.submitBid = this.submitBid.bind(this);
  }

  submitQuote() {
    this.props.contract.createQuote(3, 1, 7, 'lb', {
      from: this.props.web3.eth.accounts[0]
    });
  }

  submitBid() {
    this.props.contract.createBid(1, 2, 5, 'kg', {
      from: this.props.web3.eth.accounts[0],
      value: '10'
    });
  }

  render() {
    // NODE_ENV BABEL_ENV
    const { orders } = this.props;
    return (
      <div>
        <div className='home' id='background'>
          <div id='homeText'>
            {orders && orders.map((order, id) => {
              return (<div key={id}>
                <p>
                  order -
                  productId: {order.productId}
                  / price: {order.price}
                  / quantity: {order.quantity}
                  / unit: {order.unit}
                  / class: {order.class}
                  / status: {order.status}
                  / buyer: {order.buyer}
                  / seller: {order.seller}
                </p>
              </div>);
            })}
            <button onClick={this.submitQuote}>Create Quote</button>
            <button onClick={this.submitBid}>Create Bid</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ web3, contract, orders, user }) => ({
  web3, contract, orders, user
});

export default connect(mapStateToProps)(About);
