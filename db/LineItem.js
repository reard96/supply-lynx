const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: 'Quantity must be at least 1'
      }
    }
  }
});

module.exports = LineItem;
