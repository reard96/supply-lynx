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
    this.completeOrder = this.completeOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
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
      value: total + ''
    });
    this.props.closeOrder();
  }

  completeOrder() {
    const { order } = this.props;
    const { id } = order;
    this.props.contract.completeOrder(id, {
      from: web3.eth.accounts[0]
    });
    this.props.closeOrder();
  }

  cancelOrder() {
    const { order } = this.props;
    const { id } = order;
    this.props.contract.cancelOrder(id, {
      from: web3.eth.accounts[0]
    });
    this.props.closeOrder();
  }

  render() {
    const { order, user, orderOpen, closeOrder } = this.props;
    const { id, productId, quantity, price, unit, status, buyer, seller } = order;
    const { acceptBid, acceptQuote, completeOrder, cancelOrder } = this;
    const requested = status === 'requested';
    const accepted = status === 'accepted';
    const bid = order.class === 'bid';
    const quote = order.class === 'quote';
    const admin = user.category === 'admin';
    const involved = order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
    return (
      <Dialog
        open={orderOpen}
        onClose={closeOrder}
      >
        <DialogContent>
          <DialogTitle>Order: {id}</DialogTitle>
          <DialogContentText>
            order -
            productId: {productId}
            / price: {price}
            / quantity: {quantity}
            / unit: {unit}
            / status: {status}
            / buyer: {buyer}
            / seller: {seller}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            !!user.id && requested && involved &&
            <Button onClick={cancelOrder} color='secondary'>Cancel Request</Button>
          }
          {
            !!user.id && accepted && involved &&
            <Button onClick={cancelOrder} color='secondary'>Cancel Order</Button>
          }
          {
            !!user.id && accepted && (involved || admin) &&
            <Button onClick={completeOrder} color='primary'>Complete Order</Button>
          }
          {
            !!user.id && requested && bid &&
            <Button onClick={acceptBid} color='primary'>Accept Bid</Button>
          }
          {
            !!user.id && requested && quote &&
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
