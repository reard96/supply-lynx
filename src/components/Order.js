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
    const { order } = this.props;
    const { id } = order;
    this.props.contract.acceptBid(id, {
      from: web3.eth.accounts[0]
    });
    this.props.closeOrder();
  }

  acceptQuote() {
    const { order } = this.props;
    const { id, quantity, price } = order;
    const total = quantity * price;
    this.props.contract.acceptQuote(id, {
      from: web3.eth.accounts[0],
      value: total
    });
    this.props.closeOrder();
  }

  render() {
    const { order } = this.props;
    const { id, productId, quantity, price, unit, status } = order;
    const { user, orderOpen, closeOrder } = this.props;
    const { acceptBid, acceptQuote } = this;
    return (
      <Dialog
        open={orderOpen}
        onClose={closeOrder}
      >
        <DialogContent>
          <DialogTitle>Order: {id}</DialogTitle>
          <DialogContentText>
            Please review the details.
            {order.class}
            {status}
            {productId}
            {quantity}
            {price}
            {unit}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOrder} color='secondary'>Cancel</Button>
          {!!user.id && status === 'requested' && order.class === 'bid' &&
            <Button onClick={acceptBid} color='primary'>Accept Bid</Button>
          }
          {!!user.id && status === 'requested' && order.class === 'quote' &&
            <Button onClick={acceptQuote} color='primary'>Accept Quote</Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ web3, contract, user }) => ({
  web3, contract, user
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: function (orders) {
      return dispatch(fetchOrders(orders));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
