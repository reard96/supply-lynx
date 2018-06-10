import React, { Component } from "react"
import { connect } from "react-redux"

class Homepage extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.contract.createQuote(2, 3, 6, "kg", {
      from: web3.eth.accounts[0]
    })
    // this.props.contract.createBid(1, 4, 5, "kg", {
    //   from: web3.eth.accounts[0],
    //   value: web3.toWei(20, "ether")
    // })
  }

  render() {
    // NODE_ENV BABEL_ENV
    const { orders } = this.props
    return (
      <div>
        <div className="home" id="background">
          <div id="homeText">
            {orders && orders.map((order, id) => {
              return (<div key={id}>
                <p>
                  order -
                  productId: {order.productId}
                  / price: {order.price}
                  / quantity: {order.quantity}
                  / unit: {order.unit}
                  / class: {order.class}
                  / status: {order.status}
                  / buyer: {order.buyer}
                  / seller: {order.seller}
                </p>
              </div>)
            })}
            <button onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ web3, contract, orders }) => ({
  web3, contract, orders
});

export default connect(mapStateToProps)(Homepage);
