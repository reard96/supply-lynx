import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

class Order extends Component {
  constructor() {
    super();
    this.acceptBid = this.acceptBid.bind(this);
    this.acceptQuote = this.acceptQuote.bind(this);
  }

  acceptBid() {
    const { order, id } = this.props;
    const { productId, quantity, price, unit } = order;
    this.props.contract.acceptBid(id, {
      from: web3.eth.accounts[0]
    });
    this.props.closeOrder();
  }

  acceptQuote() {
    const { order, id } = this.props;
    const { productId, quantity, price, unit } = order;
    const total = quantity * price;
    this.props.contract.acceptQuote(id, {
      from: web3.eth.accounts[0],
      value: total
    });
    this.props.closeOrder();
  }

  render() {
    const { orderOpen, closeOrder } = this.props;
    const { acceptBid, acceptQuote } = this;
    return (
      <Dialog
        open={orderOpen}
        onClose={closeOrder}
      >
        <DialogContent>
          <DialogTitle>Order</DialogTitle>
          <DialogContentText>
            Please review the details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOrder} color='secondary'>Cancel</Button>
          <Button onClick={acceptBid} color='primary'>Accept Bid</Button>
          <Button onClick={acceptQuote} color='primary'>Accept Quote</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
