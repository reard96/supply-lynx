import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
      value: web3.toWei(total, 'ether')
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
    const { order, user, orderOpen, closeOrder, product, buyer, seller } = this.props;
    const { id, quantity, price, unit, status } = order;
    const total = quantity * price;
    const { acceptBid, acceptQuote, completeOrder, cancelOrder } = this;
    const requested = status === 'requested';
    const accepted = status === 'accepted';
    const bid = !seller;
    const quote = !buyer;
    const admin = user.category === 'admin';
    const involved = order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
    return (
      <Dialog
        open={orderOpen}
        onClose={closeOrder}
      >
        <DialogContent>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Order ID</InputLabel>
            <Input value={id} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Buyer</InputLabel>
            <Input value={buyer && buyer.name || '(none)'} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Seller</InputLabel>
            <Input value={seller && seller.name || '(none)'} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Product</InputLabel>
            <Input value={product && product.name || '(none)'} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Quantity</InputLabel>
            <Input value={quantity} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Unit</InputLabel>
            <Input value={unit} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Unit Price</InputLabel>
            <Input value={price} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Total Price</InputLabel>
            <Input value={total} />
          </FormControl>
          <FormControl disabled style={{ marginRight: 15 }} margin='normal'>
            <InputLabel>Status</InputLabel>
            <Input value={status} />
          </FormControl>
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

const mapStateToProps = ({ web3, contract, user }) => {
  return {
    web3, contract, user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: function (orders) {
      return dispatch(fetchOrders(orders));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
