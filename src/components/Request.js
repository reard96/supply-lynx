import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postOrder } from '../store';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class Request extends Component {
  constructor() {
    super();
    this.state = {
      productId: 0,
      quantity: '',
      price: '',
      unit: ''
    };
    this.createBid = this.createBid.bind(this);
    this.createQuote = this.createQuote.bind(this);
  }

  changeForm = name => (event) => {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  async createBid() {
    const { productId, quantity, price, unit } = this.state;
    const total = quantity * price;
    const order = {
      id: this.props.orders.length + 1,
      productId,
      quantity,
      price,
      unit,
      status: 'requested',
      buyer: web3.eth.accounts[0],
      seller: null
    };
    await this.props.contract.createBid(productId, quantity, price, unit, {
      from: web3.eth.accounts[0],
      value: web3.toWei(total, 'ether')
    });
    this.props.postOrder(order);
    this.props.openNotification();
    this.props.closeRequest();
  }

  async createQuote() {
    const { productId, quantity, price, unit } = this.state;
    const order = {
      id: this.props.orders.length + 1,
      productId,
      quantity,
      price,
      unit,
      status: 'requested',
      buyer: null,
      seller: web3.eth.accounts[0]
    };
    await this.props.contract.createQuote(productId, quantity, price, unit, {
      from: web3.eth.accounts[0]
    });
    this.props.postOrder(order);
    this.props.openNotification();
    this.props.closeRequest();
  }

  render() {
    const { user, services, requestOpen, closeRequest } = this.props;
    const { changeForm, createBid, createQuote } = this;
    const { productId, quantity, price, unit } = this.state;
    const empty = Object.keys(this.state).some(field => !this.state[field]);
    return (
      <Dialog
        open={requestOpen}
        onClose={closeRequest}
      >
        <DialogContent>
          <DialogContentText>
            Please enter the details of your bid or quote. Once submitted, it will be sent to the blockchain.
          </DialogContentText>
          <FormControl margin='dense' required fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              autoFocus
              onChange={changeForm('productId')}
              value={productId}
            >
              {services.map(service => <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            id='quantity'
            label='Quantity'
            type='text'
            onChange={changeForm('quantity')}
            value={quantity}
            required
            fullWidth
          />
          <TextField
            margin='dense'
            id='price'
            label='Unit Price'
            type='text'
            onChange={changeForm('price')}
            value={price}
            required
            fullWidth
          />
          <FormControl margin='dense' required fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
              onChange={changeForm('unit')}
              value={unit}
            >
              <MenuItem value='kg'>kg</MenuItem>
              <MenuItem value='lb'>lb</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button disabled={empty || !user.id} onClick={createBid} color='primary'>Submit Bid</Button>
          <Button disabled={empty || !user.id} onClick={createQuote} color='primary'>Submit Quote</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ web3, contract, user, services, orders }) => ({
  web3, contract, user, services, orders
});

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: function (order) {
      return dispatch(postOrder(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
