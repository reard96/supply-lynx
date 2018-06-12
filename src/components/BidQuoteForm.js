import React, { Component } from 'react';
import { connect } from 'react-redux';

class BidQuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      productId: '',
      quantity: '',
      price: '',
      unit: '',
      buyer: '',
      seller: '',
      payment: '',
    }
    this.onSend = this.onSend(this);
    this.onCreateBidQuote = this.onCreateBidQuote.bind(this);
  }

  onCreateBidQuote(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

//Tell Marco that 'class' is reserved word in JS!!!  Using 'type' instead.

  onSend(ev) {
    ev.preventDefault();
    const { type, productId, quantity, price, unit, buyer, seller, payment } = this.state;
    type: 'bid' ? (
      this.props.contract.createBid(this.state)
      ) : ( this.props.contract.createQuote(this.state) )
  }

  render() {
    const { onSend, onCreateBidQuote } = this;
    const { productId } = this.state;
    return (
      <div>
        <h4>Create Bid/Quote</h4>
        <form onSubmit={ onSendBidQuote }>
          <label>Product ID</label>
          <input name = 'Product Id' value = { productId } onChange = { onCreateBidQuote } />
        </form>
      </div>
    )
  }
}

const mapState = ({ web3, contract, orders}) => {
  return {
    web3,
    contract,
    orders
  }
}

export default connect(mapState)(BidQuoteForm);