const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;
