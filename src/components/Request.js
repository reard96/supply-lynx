import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
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
      quantity: 0,
      price: 0,
      unit: ''
    };
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
      value: web3.toWei(total, 'ether')
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
    const { user, services, requestOpen, closeRequest } = this.props;
    const { changeForm, createBid, createQuote } = this;
    const { productId, quantity, price, unit } = this.state;
    const inputEmpty = Object.keys(this.state).some(field => !this.state[field]);
    return (
      <Dialog
        open={requestOpen}
        onClose={closeRequest}
      >
        <DialogContent>
          <DialogContentText>
            Please enter the details of your bid or quote. Once submitted, it will be sent to the blockchain.
          </DialogContentText>
          <FormControl margin='dense' fullWidth>
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
          <FormControl margin='dense' fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              onChange={changeForm('unit')}
              value={unit}
            >
              <MenuItem value='kg'>kg</MenuItem>)
              <MenuItem value='lb'>lb</MenuItem>)
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button disabled={inputEmpty || !user.id} onClick={createBid} color='primary'>Submit Bid</Button>
          <Button disabled={inputEmpty || !user.id} onClick={createQuote} color='primary'>Submit Quote</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ web3, contract, user, services }) => ({
  web3, contract, user, services
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: function (orders) {
      return dispatch(fetchOrders(orders));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
