const conn = require('./conn');
const { Sequelize } = conn;

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
});

module.exports = Category;
