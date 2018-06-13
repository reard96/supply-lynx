import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Request extends Component {
  constructor() {
    super();
    this.state = {
      productId: '',
      quantity: '',
      price: '',
      unit: ''
    };
    this.changeForm = this.changeForm.bind(this);
    this.createBid = this.createBid.bind(this);
    this.createQuote = this.createQuote.bind(this);
  }

  changeForm = name => (event) => {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  createBid() {
    const { productId, quantity, price, unit } = this.state;
    const total = quantity * price;
    this.props.contract.createBid(productId, quantity, price, unit, {
      from: web3.eth.accounts[0],
      value: total
    });
    this.props.closeRequest();
  }

  createQuote() {
    const { productId, quantity, price, unit } = this.state;
    this.props.contract.createQuote(productId, quantity, price, unit, {
      from: web3.eth.accounts[0]
    });
    this.props.closeRequest();
  }

  render() {
    const { requestOpen, closeRequest } = this.props;
    const { changeForm, createBid, createQuote } = this;
    const { productId, quantity, price, unit } = this.state;
    const inputEmpty = Object.keys(this.state).some(field => !this.state[field].length);
    return (
      <Dialog
        open={requestOpen}
        onClose={closeRequest}
      >
        <DialogContent>
          <DialogContentText>
            Please enter the details of your bid or quote. Once submitted, it will be sent to the blockchain.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='productId'
            label='Product ID'
            type='text'
            onChange={changeForm('productId')}
            value={productId}
            fullWidth
          />
          <TextField
            margin='dense'
            id='quantity'
            label='Quantity'
            type='text'
            onChange={changeForm('quantity')}
            value={quantity}
            fullWidth
          />
          <TextField
            margin='dense'
            id='price'
            label='Unit Price'
            type='text'
            onChange={changeForm('price')}
            value={price}
            fullWidth
          />
          <TextField
            margin='dense'
            id='unit'
            label='Unit'
            type='text'
            onChange={changeForm('unit')}
            value={unit}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={inputEmpty} onClick={createBid} color='primary'>Submit Bid</Button>
          <Button disabled={inputEmpty} onClick={createQuote} color='primary'>Submit Quote</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ web3, contract }) => ({
  web3, contract
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: function (orders) {
      return dispatch(fetchOrders(orders));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
