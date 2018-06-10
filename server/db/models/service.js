const Sequelize = require("sequelize");
const db = require("../db");

const Service = db.define( "service", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
/*    description: {
      type: Sequelize.STRING,
      allowNull: false
    },*/
    productId: {
      type: Sequelize.INTEGER
    },
    category: {
     type: Sequelize.ENUM('Goods', 'Services')
    },
    /*isAvailable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },*/
    price: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      }
    },
    /*status: {
      type: Sequelize.ENUM("Pending", "Completed"),
      defaultValue: "Pending"
    },*/
    /*contractId: {
      type: Sequelize.INTEGER,
      defaultValue: null
    }*/
});

module.exports = Service;
