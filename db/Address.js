const conn = require('./conn');
const { Sequelize } = conn;

const Address = conn.define(
  'address',
  {
    lineOne: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Street cannot be empty'
        }
      }
    },
    lineTwo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'City cannot be empty'
        }
      }
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'State is invalid'
        },
        isLength: {
          args: { min: 2, max: 2 },
          msg: 'State is invalid'
        },
        notEmpty: {
          args: [true],
          msg: 'State cannot be empty'
        }
      }
    },
    zipCode: {
      type: Sequelize.STRING,
      validate: {
        isLength: {
          args: { min: 5, max: 5 },
          msg: 'Zip Code is invalid'
        },
        isInt: {
          args: [true],
          msg: 'Zip Code is invalid'
        }
      }
    },
    lat: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    lng: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  },
  {
    getterMethods: {
      fullAddress() {
        return `${this.lineOne}${this.lineTwo ? ' ' + this.lineTwo : ''}, ${this.city}, ${this.state} ${this.zipCode || ''}`;
      }
    }
  }
);

module.exports = Address;
