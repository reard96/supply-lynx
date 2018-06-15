import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

class Order extends Component {
  constructor() {
    super();
    this.acceptBid = this.acceptBid.bind(this);
    this.acceptQuote = this.acceptQuote.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  async acceptBid() {
    const { order } = this.props;
    const { id } = order;
    order.status = 'accepted';
    order.seller = web3.eth.accounts[0];
    await this.props.contract.acceptBid(id, {
      from: web3.eth.accounts[0]
    });
    this.props.updateOrder(order);
    this.props.closeOrder();
  }

  async acceptQuote() {
    const { order } = this.props;
    const { id, quantity, price } = order;
    const total = quantity * price;
    order.status = 'accepted';
    order.buyer = web3.eth.accounts[0];
    await this.props.contract.acceptQuote(id, {
      from: web3.eth.accounts[0],
      value: web3.toWei(total, 'ether')
    });
    this.props.updateOrder(order);
    this.props.closeOrder();
  }

  async completeOrder() {
    const { order } = this.props;
    const { id } = order;
    order.status = 'completed';
    await this.props.contract.completeOrder(id, {
      from: web3.eth.accounts[0]
    });
    this.props.updateOrder(order);
    this.props.closeOrder();
  }

  async cancelOrder() {
    const { order } = this.props;
    const { id } = order;
    order.status = 'cancelled';
    await this.props.contract.cancelOrder(id, {
      from: web3.eth.accounts[0]
    });
    this.props.updateOrder(order);
    this.props.closeOrder();
  }

  render() {
    const { acceptBid, acceptQuote, completeOrder, cancelOrder } = this;
    const { order, user, orderOpen, closeOrder, product, buyer, seller } = this.props;
    const { id, quantity, price, unit, status } = order;
    const total = quantity * price;
    const bid = !seller;
    const quote = !buyer;
    const requested = status === 'requested';
    const accepted = status === 'accepted';
    const cancelled = status === 'cancelled';
    const admin = user.category === 'admin';
    const involved = order.buyer === web3.eth.accounts[0] || order.seller === web3.eth.accounts[0];
    const steps = ['requested', 'accepted', 'completed'];
    return (
      <Dialog
        open={orderOpen}
        onClose={closeOrder}
      >
        <DialogContent>
          <Stepper alternativeLabel nonLinear activeStep={steps.findIndex(step => step === status)}>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>
                    {label.toUpperCase()}
                  </StepLabel>
                </Step>
              );
            })}
            {cancelled &&
              <Step>
                <StepLabel error>CANCELLED</StepLabel>
              </Step>}
          </Stepper>
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
        </DialogContent>
        <DialogActions>
          {
            !!user.id && requested && involved &&
            <Button onClick={cancelOrder} color='secondary'>Cancel Request</Button>
          }
          {
            !!user.id && accepted && admin &&
            <Button onClick={cancelOrder} color='secondary'>Cancel Order</Button>
          }
          {
            !!user.id && accepted && (involved || admin) &&
            <Button onClick={completeOrder} color='primary'>Complete Order</Button>
          }
          {
            !!user.id && bid && !involved &&
            <Button onClick={acceptBid} color='primary'>Accept Bid</Button>
          }
          {
            !!user.id && quote && !involved &&
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
    updateOrder: function (order) {
      return dispatch(updateOrder(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
