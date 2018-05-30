const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const User = require('./User');
const Address = require('./Address');

Product.belongsTo(Category);
Product.hasMany(LineItem);

Order.hasMany(LineItem);
Order.belongsTo(Address);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

User.hasMany(Order);
User.hasMany(Address);

Address.belongsTo(User);

Address.hasMany(Order);

module.exports = {
  models: {
    Category,
    Product,
    Order,
    LineItem,
    User,
    Address
  }
};
