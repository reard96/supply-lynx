const Sequelize = require("sequelize");
const db = require("../db");

const Service = db.define("service", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // description: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // available: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: true
  // },
});

module.exports = Service;
