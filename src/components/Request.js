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
    this.createBid = this.createBid.bind(this);
    this.createQuote = this.createQuote.bind(this);
  }

  createBid() {

  }

  createQuote() {

  }

  render() {
    const { formOpen, closeForm } = this.props;
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
            margin="dense"
            id="productId"
            label="Product ID"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Unit Price"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="unit"
            label="Unit"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color="secondary">Cancel</Button>
          <Button onClick={closeForm} color="primary">Submit Bid</Button>
          <Button onClick={closeForm} color="primary">Submit Quote</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Request;
