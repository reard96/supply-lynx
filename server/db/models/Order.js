const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER
  },
  payment: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  },
  unit: {
    type: Sequelize.STRING
  },
  class: {
    type: Sequelize.STRING
  },
  buyer: {
    type: Sequelize.STRING
  },
  seller: {
    type: Sequelize.STRING
  }
})

module.exports = Order;