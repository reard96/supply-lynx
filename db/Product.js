const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://via.placeholder.com/500x500'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  price: {
    type: Sequelize.FLOAT
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  }
});

module.exports = Product;
