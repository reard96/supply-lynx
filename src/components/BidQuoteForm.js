import React, { Component } from 'react';
import { connect } from 'react-redux';

class BidQuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: '',
      productId: '',
      quantity: '',
      price: '',
      unit: '',
      class: '',
      status: '',
      buyer: '',
      seller: ''
    }
  }

  onChange(ev) {
    
  }

  onUpdate(ev) {
    ev.preventDefault();
  }

  render() {
    return (

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