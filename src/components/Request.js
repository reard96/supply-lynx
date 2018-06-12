import React, { Component } from 'react';
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
      price: '',
      quantity: '',
      unit: ''
    };
    this.changeForm = this.changeForm.bind(this);
    this.submitBid = this.submitBid.bind(this);
    this.submitQuote = this.submitQuote.bind(this);
  }

  changeForm() {

  }

  submitBid() {
    this.props.contract.createBid(1, 2, 5, 'kg', {
      from: web3.eth.accounts[0],
      value: '10'
    });
    this.props.closeForm();
  }

  submitQuote() {
    this.props.contract.createQuote(8, 5, 13, 'kg', {
      from: web3.eth.accounts[0]
    });
    this.props.closeForm();
  }

  render() {
    const { formOpen, closeForm } = this.props;
    const { changeForm, submitBid, submitQuote } = this;
    return (
      <Dialog
        open={formOpen}
        onClose={closeForm}
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
            onChange={changeForm}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='price'
            label='Unit Price'
            type='text'
            onChange={changeForm}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='quantity'
            label='Quantity'
            type='text'
            onChange={changeForm}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='unit'
            label='Unit'
            type='text'
            onChange={changeForm}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color='secondary'>Cancel</Button>
          <Button onClick={submitBid} color='primary'>Submit Bid</Button>
          <Button onClick={submitQuote} color='primary'>Submit Quote</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Request;
