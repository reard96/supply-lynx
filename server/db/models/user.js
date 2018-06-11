const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  // username: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false
  // },
  // password: {
  //   type: Sequelize.STRING
  // },
  address: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM('admin', 'buyer', 'seller')
  },
})

module.exports = User
