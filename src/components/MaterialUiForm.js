import React, { Component, Fragment } from 'react';
import { Dialog, Button, TextField } from '@material-ui';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

export default class extends Component {
  state = {
    open: false
  }
  render() {
    const { open } = this.state
    return (
      <Fragment>
    <Button>

    </Button>
    <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          Create a New Exercise
        <DialogContent>
          <DialogContentText>
            Please fill out the form
          </DialogContentText>
          <form>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Create Bid/Quote
          </Button>
        </DialogActions>
    </Dialog>

  </Fragment>
    )
  }
}
        
    