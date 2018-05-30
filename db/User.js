const conn = require('./conn');
const { Sequelize } = conn;
const jwt = require('jwt-simple');
const secret = process.env.SECRET;

const User = conn.define('user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'First Name cannot be empty'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Last Name cannot be empty'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: [true],
        msg: 'E-mail is already taken'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'E-mail is invalid'
        },
        notEmpty: {
          args: [true],
          msg: 'E-mail cannot be empty'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Password cannot be empty'
        }
      }
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    githubId: {
      type: Sequelize.STRING
    }
  },
  {
    getterMethods: {
      name() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    setterMethods: {
      fullName(value) {
        const names = value.split(' ');
        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      }
    }
  }
);

User.findOrCreateCart = function (userId) {
  return conn.models.order.findOrCreate({
    where: { status: 'cart', userId },
    defaults: { status: 'cart', userId },
    include: [{ model: conn.models.lineItem }]
  });
};

User.prototype.generateToken = function () {
  return jwt.encode({ id: this.id }, secret);
};

User.authenticate = function (user) {
  const { email, password } = user;
  return User.find({
    where: { email, password },
    attributes: ['id', 'firstName', 'lastName', 'email']
  }).then(user => {
    if (!user) {
      throw { status: 401 };
    }
    return jwt.encode({ id: user.id }, secret);
  });
};

User.exchangeToken = function (token) {
  try {
    const id = jwt.decode(token, secret).id;
    return User.findById(id, {
      include: [{ model: conn.models.address }]
    }).then(user => {
      if (user) {
        return user;
      }
      throw { status: 401 };
    });
  } catch (err) {
    return Promise.reject({ status: 401 });
  }
};

module.exports = User;
