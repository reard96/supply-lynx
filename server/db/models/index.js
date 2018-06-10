const User = require('./User');
const Service = require('./Service');

/*Order.belongsTo(User, {as: 'Buyer', foreignKey: 'buyer'});
Order.belongsTo(User, {as: 'Seller', foreignKey: 'seller'});

User.hasMany(Order, {as: 'Buyer', foreignKey: 'buyer'});
User.hasMany(Order, {as: 'Seller', foreignKey: 'seller'});*/


module.exports = {
  User,
  Service
}
